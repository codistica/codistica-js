/** @module browser/classes/loader */

import {log, SEEDS, EventEmitter} from '@codistica/core';
import {LoaderPayload} from './loader-payload.js';
import {LoaderThread} from './loader-thread.js';

// TODO: CHECK THAT ALL EVENT HANDLERS ARE BEING ADDED/REMOVED CORRECTLY AND THAT THERE ARE NO CONFLICTS.
// TODO: CHECK ALL MODEL AND CALCULATIONS.
// TODO: SIMPLIFY/IMPROVE PERFORMANCE ALGORITHMS.

// TODO: IMPROVE/REDUCE LOG DENSITY AND LOG LEVELS.
// TODO: CHECK WHY NaN PERCENT. VARIOUS CASES. DIFFERENT BROWSERS.

// TODO: CHECK TIMESTAMPS.
// TODO: MEASURE OVERALL ETA BY MEASURING TOTAL ACCUMULATED DATA OVER TIME. (SIMILAR TO CURRENT ALGORITHM, BUT NOT USING THROUGHPUT AND LATENCY). MAKE BOTH ALTERNATIVES AVAILABLE WITH PROPER THROTTLING. REUSE EXISTING TIMESTAMPS.
// TODO: MAKE THROTTLING LOWER EMISSION RATES TO 5 OR 10 Hz OR LESS.
// TODO: ADD OPTIONS TO CUSTOMIZE THROTTLING. AND ADDITIONALLY USE requestAnimationFrame?

// TODO: UPDATE JSDOC ACROSS FILES.

/**
 * @description Available events.
 * @event Loader#refresh
 * @event Loader#end
 */

/**
 * @typedef loaderOptionsType
 * @property {number} [maxThreads=4] - Maximum concurrent threads.
 * @property {number} [activeTimeThreshold=100] - Minimum accumulated active time to perform calculations [ms].
 * @property {number} [deltaLoadedThreshold=0] - Minimum accumulated delta loaded to perform calculations [B].
 * @property {boolean} [autoStart=false] - Auto start download process when new items in queue.
 */

/**
 * @classdesc A class for asynchronous assets download management.
 */
class Loader extends EventEmitter {
    /**
     * @description Constructor.
     * @param {loaderOptionsType} [options] - Loader options.
     */
    constructor(options = {}) {
        super();

        if (typeof options === 'object') {
            /** @type {loaderOptionsType} */
            this.options = options;

            this.options.maxThreads =
                typeof options.maxThreads === 'number' ? options.maxThreads : 4;

            this.options.activeTimeThreshold =
                typeof options.activeTimeThreshold === 'number'
                    ? options.activeTimeThreshold
                    : 100;

            this.options.deltaLoadedThreshold =
                typeof options.deltaLoadedThreshold === 'number'
                    ? options.deltaLoadedThreshold
                    : 0;

            this.options.autoStart =
                typeof options.autoStart === 'boolean'
                    ? options.autoStart
                    : false;
        } else {
            /** @type {loaderOptionsType} */
            this.options = {
                maxThreads: 4,
                activeTimeThreshold: 100,
                deltaLoadedThreshold: 0,
                autoStart: false
            };
        }

        this.threads = {};
        this.queue = [];
        this.history = [];

        this.stats = {
            total: 0,
            succeeded: 0,
            failed: 0,
            inProgress: 0,
            stopRequested: false
        };

        this.progress = {
            total: 0, // [B]
            loaded: 0, // [B]
            percent: 0, // [%]
            eta: null // [ms]
        };

        this.performance = {
            rtt: null, // [ms]
            rttAhead: null, // [ms]
            throughput: null // [B/ms]
        };

        // CREATE INITIAL THREADS
        this.setMaxThreads(this.options.maxThreads);

        // BIND METHODS
        this.add = this.add.bind(this);
        this.getRequests = this.getRequests.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.callNextRequests = this.callNextRequests.bind(this);
        this.setMaxThreads = this.setMaxThreads.bind(this);
        this.balanceThreads = this.balanceThreads.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onFailHandler = this.onFailHandler.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
        this.onTotalChangeHandler = this.onTotalChangeHandler.bind(this);
        this.onLoadedChangeHandler = this.onLoadedChangeHandler.bind(this);
        this.onComputableProgressHandler = this.onComputableProgressHandler.bind(
            this
        );
        this.onEndHandler = this.onEndHandler.bind(this);
    }

    /**
     * @typedef loaderLoaderPayloadOptionsType
     * @property {string} url - Request URL.
     * @property {(number|null)} [total=null] - Payload size in bytes.
     * @property {string} [requestMethod='GET'] - HTTP method to be used.
     * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
     * @property {boolean} [noCache=false] - If true, appends unique query to the request URL so fresh responses are forced.
     */

    /**
     * @instance
     * @description Add request to loader queue.
     * @param {loaderLoaderPayloadOptionsType} loaderPayloadOptions - Options for loaderPayload to be added.
     * @param {boolean} [prepend] - Add to the start of the queue.
     * @param {boolean} [force] - Force new LoaderPayload instance creation.
     * @returns {LoaderPayload} LoaderPayload instance.
     */
    add(loaderPayloadOptions, prepend, force) {
        if (!force) {
            // GET LAST ADDED MATCHING LoaderPayload INSTANCE
            const latestLoaderPayload = this.getRequests(
                loaderPayloadOptions.url
            )[0];
            if (latestLoaderPayload) {
                return latestLoaderPayload;
            }
        }

        const newLoaderPayload = new LoaderPayload(loaderPayloadOptions);

        this.stats.total++;

        // ATTACH HANDLERS
        newLoaderPayload.once('success', this.onSuccessHandler);
        newLoaderPayload.once('fail', this.onFailHandler);
        newLoaderPayload.once('headers', this.onHeadersHandler);
        newLoaderPayload.on('totalChange', this.onTotalChangeHandler);
        newLoaderPayload.on('loadedChange', this.onLoadedChangeHandler);
        newLoaderPayload.on(
            'computableProgress',
            this.onComputableProgressHandler
        );
        newLoaderPayload.once('end', this.onEndHandler);

        // SEND NEW LoaderPayload INSTANCE TO QUEUE
        if (prepend) {
            this.queue.unshift(newLoaderPayload);
        } else {
            this.queue.push(newLoaderPayload);
        }
        log.debug('Loader()', `${newLoaderPayload.requestUrl} SENT TO QUEUE`)();

        // UPDATE TOTAL
        this.progress.total += newLoaderPayload.progress.total || 0;

        if (this.options.autoStart && this.stats.inProgress === 0) {
            this.start();
        }

        return newLoaderPayload;
    }

    /**
     * @instance
     * @description Returns an array with all LoaderPayload instances matching indicated url.
     * @param {string} url - Url.
     * @returns {Array<LoaderPayload>} LoaderPayload instances array.
     */
    getRequests(url) {
        const locations = [this.queue, this.threads, this.history];
        let output = [];
        locations.forEach((location) => {
            let request = null;
            if (Array.isArray(location)) {
                location.forEach((elem) => {
                    request =
                        elem instanceof LoaderPayload
                            ? elem
                            : elem.loaderPayload;
                    if (request && request.url === url) {
                        output.push(request);
                    }
                });
            } else {
                for (const i in location) {
                    if (!Object.prototype.hasOwnProperty.call(location, i)) {
                        continue;
                    }
                    request =
                        location[i] instanceof LoaderPayload
                            ? location[i]
                            : location[i].loaderPayload;
                    if (request && request.url === url) {
                        output.push(request);
                    }
                }
            }
        });
        return output;
    }

    /**
     * @instance
     * @description Start loader work.
     * @returns {void} Void.
     */
    start() {
        this.stats.stopRequested = false;
        this.callNextRequests();
    }

    /**
     * @instance
     * @description Stop loader work.
     * @returns {void} Void.
     */
    stop() {
        this.stats.stopRequested = true;
    }

    /**
     * @instance
     * @description Reset loader instance.
     * @returns {void} Void.
     */
    reset() {
        // RESET INSTANCE
        Object.assign(this, new Loader(this.options));
    }

    /**
     * @instance
     * @description Call new requests from queue as needed.
     * @returns {void} Void.
     */
    callNextRequests() {
        let flag = true;
        while (
            this.stats.inProgress < this.options.maxThreads &&
            this.queue.length !== 0 &&
            !this.stats.stopRequested
        ) {
            for (const i in this.threads) {
                if (!Object.prototype.hasOwnProperty.call(this.threads, i)) {
                    continue;
                }

                const thread = this.threads[i];

                if (thread.loaderPayload === null) {
                    flag = false;
                    // START REQUEST
                    thread.run(this.queue.shift());
                    this.stats.inProgress++;
                    break;
                }
            }
            if (flag) {
                log.error('Loader()', 'NO FREE THREAD WAS FOUND')();
                return;
            }
        }
    }

    /**
     * @instance
     * @description Dynamically set a new maximum number of concurrent threads.
     * @param {number} newMax - New maximum.
     * @returns {void} Void.
     */
    setMaxThreads(newMax) {
        this.options.maxThreads = newMax;

        // CHECK THAT MAXIMUM THREADS NUMBER LIMIT IS ALWAYS RESPECTED
        // MAXIMUM POSSIBLE THREADS NUMBER DEPEND ON BROWSER. TO IMPROVE TRACKING, AVOID BROWSER QUEUING THREADS
        // INTERNAL MAXIMUM HAS BEEN SET TO 26
        // MORE SIMULTANEOUS THREADS MAY REQUIRE MORE CPU POWER
        if (this.options.maxThreads > 26) {
            log.warning(
                'Loader()',
                'MORE THAN 26 THREADS ARE NOT ALLOWED. FORCING 26'
            )();
            this.options.maxThreads = 26;
        }

        this.balanceThreads();
    }

    /**
     * @instance
     * @description Automatically add or remove threads as needed.
     * @returns {void} Void.
     */
    balanceThreads() {
        const currentThreads = Object.getOwnPropertyNames(this.threads).length;
        let i = null;
        let j = null;
        let deletedCount = 0;
        let key = null;
        let correctKey = null;

        if (currentThreads > this.options.maxThreads) {
            // CASE: LESS THREADS NEEDED

            log.debug(
                'Loader()',
                'CURRENT THREADS NUMBER HIGHER THAN EXPECTED. DELETING THREADS WHEN POSSIBLE'
            )();

            j = 0;
            for (i = 0; i < currentThreads; i++) {
                key = SEEDS.alphaUp.charAt(i);
                correctKey = SEEDS.alphaUp.charAt(j);
                if (
                    this.threads[key].loaderPayload === null &&
                    deletedCount < currentThreads - this.options.maxThreads
                ) {
                    delete this.threads[key];
                    deletedCount++;
                } else if (key !== correctKey) {
                    // TODO: USE FiberObject.renameProperty()?
                    Object.defineProperty(
                        this.threads,
                        correctKey,
                        Object.getOwnPropertyDescriptor(this.threads, key)
                    );
                    delete this.threads[key];
                    // UPDATE THREAD INDEX
                    this.threads[correctKey].options.threadIndex = correctKey;
                    j++;
                } else {
                    j++;
                }
            }

            log.debug('Loader()', `${deletedCount} THREAD LINES DELETED`)();
        } else if (currentThreads < this.options.maxThreads) {
            // CASE: MORE THREADS NEEDED

            log.debug(
                'Loader()',
                'CURRENT THREADS NUMBER LOWER THAN EXPECTED. CREATING NEW THREADS'
            )();

            for (i = currentThreads; i < this.options.maxThreads; i++) {
                // CREATE NEW THREADS
                key = SEEDS.alphaUp.charAt(i);
                this.threads[key] = new LoaderThread({
                    activeTimeThreshold: this.options.activeTimeThreshold,
                    deltaLoadedThreshold: this.options.deltaLoadedThreshold,
                    threadIndex: key
                });
            }
            log.debug(
                'Loader()',
                `${
                    this.options.maxThreads - currentThreads
                } NEW THREADS CREATED`
            )();

            // CALL NEW THREADS
            log.debug('Loader()', 'CALLING NEW THREADS')();
            this.callNextRequests();
        }
    }

    /**
     * @instance
     * @description Refresh loader calculations.
     * @returns {void} Void.
     */
    refresh() {
        // GET PERCENT
        this.progress.percent =
            (100 * this.progress.loaded) / this.progress.total;

        // GET ETA
        if (
            this.performance.throughput !== null &&
            this.performance.rtt !== null &&
            this.performance.rttAhead !== null
        ) {
            this.progress.eta =
                (this.progress.total - this.progress.loaded) /
                    this.performance.throughput +
                this.performance.rttAhead +
                this.performance.rtt *
                    Math.ceil(this.queue.length / this.options.maxThreads);
        } else {
            this.progress.eta = null;
        }

        this.emit('refresh', this);
    }

    /**
     * @instance
     * @description Callback for success event.
     * @returns {void} Void.
     */
    onSuccessHandler() {
        this.stats.succeeded++;
    }

    /**
     * @instance
     * @description Callback for fail event.
     * @returns {void} Void.
     */
    onFailHandler() {
        this.stats.failed++;
    }

    /**
     * @instance
     * @description Callback for headers event.
     * @returns {void} Void.
     */
    onHeadersHandler() {
        // GET LATENCY
        let x = 0;
        let rtt = null;

        for (const i in this.threads) {
            if (!Object.prototype.hasOwnProperty.call(this.threads, i)) {
                continue;
            }

            const thread = this.threads[i];

            if (
                !thread.loaderPayload ||
                thread.loaderPayload.performance.rtt === null
            ) {
                continue;
            }

            // DYNAMIC MEAN
            x++;
            rtt = rtt === null ? 0 : rtt;
            rtt = (rtt * (x - 1) + thread.loaderPayload.performance.rtt) / x;
        }

        if (rtt !== null) {
            this.performance.rtt = rtt;
        }

        this.refresh();
    }

    /**
     * @instance
     * @description Callback for totalChange event.
     * @param {number} deltaTotal - Event.
     * @returns {void} Void.
     */
    onTotalChangeHandler(deltaTotal) {
        this.progress.total += deltaTotal;
        this.refresh();
    }

    /**
     * @instance
     * @description Callback for loadedChange event.
     * @param {number} deltaLoaded - Event.
     * @returns {void} Void.
     */
    onLoadedChangeHandler(deltaLoaded) {
        this.progress.loaded += deltaLoaded;
        this.refresh();
    }

    /**
     * @instance
     * @description Callback for computableProgress event.
     * @param {Object<string,*>} e - Event.
     * @returns {void} Void.
     */
    onComputableProgressHandler(e) {
        const now = e.timestamp;
        const currentThreads = Object.getOwnPropertyNames(this.threads).length;

        let deltaRtt = null;
        let requestUpdateFlag = false;
        let throughput = 0;
        let rttAheadCount = 0;
        let isActiveCount = 0;
        let throughputCount = 0;
        let isUpdatedCount = 0;

        this.performance.rttAhead = 0;

        for (const i in this.threads) {
            if (!Object.prototype.hasOwnProperty.call(this.threads, i)) {
                continue;
            }

            const thread = this.threads[i];

            // GET LATENCY AHEAD
            if (
                !thread.stats.isActive &&
                thread.loaderPayload !== null &&
                this.performance.rtt !== null
            ) {
                deltaRtt =
                    this.performance.rtt -
                    (now - thread.loaderPayload.stats.sendTimestamp);
                if (deltaRtt > 0) {
                    this.performance.rttAhead += deltaRtt;
                    rttAheadCount++;
                }
            }

            // GET THROUGHPUT
            if (thread.stats.isActive) {
                isActiveCount++;
            } else if (
                this.stats.inProgress < currentThreads &&
                thread.performance.throughput !== null
            ) {
                thread.performance.throughput = null;
                requestUpdateFlag = true; // TO NOT GET THROUGHPUT UNTIL EVERY LINE GETS ITS OWN THROUGHPUT UPDATED
            }
            if (thread.performance.throughput !== null) {
                throughput += thread.performance.throughput;
                throughputCount++;
            }
        }

        for (const i in this.threads) {
            if (!Object.prototype.hasOwnProperty.call(this.threads, i)) {
                continue;
            }

            const thread = this.threads[i];

            if (requestUpdateFlag === true) {
                thread.stats.isUpdated = false;
            } else {
                if (thread.stats.isUpdated) {
                    isUpdatedCount++;
                }
            }
        }

        if (rttAheadCount !== 0) {
            this.performance.rttAhead /= rttAheadCount;
        }

        if (
            throughputCount === isActiveCount &&
            isUpdatedCount === isActiveCount
        ) {
            this.performance.throughput = throughput;
        }

        this.refresh();
    }

    /**
     * @instance
     * @description Callback for end event.
     * @param {Object<string,*>} e - Event.
     * @param {LoaderPayload} loaderPayload - LoaderPayload instance.
     * @returns {void} Void.
     */
    onEndHandler(e, loaderPayload) {
        // DETACH HANDLERS
        loaderPayload.off('totalChange', this.onTotalChangeHandler);
        loaderPayload.off('loadedChange', this.onLoadedChangeHandler);
        loaderPayload.off(
            'computableProgress',
            this.onComputableProgressHandler
        );

        this.history.push(loaderPayload);
        this.stats.inProgress--;

        this.refresh();

        if (this.queue.length === 0 && this.stats.inProgress === 0) {
            // NO ITEMS LEFT IN QUEUE
            this.emit('end', this);
        } else {
            this.balanceThreads();

            // CALL NEXT THREADS
            this.callNextRequests();
        }
    }
}

export {Loader};
