/** @module browser/classes/loader */

import {log, SEEDS, EventEmitter} from '@codistica/core';
import {AJAXRequest} from './ajax-request.js';
import {Thread} from './thread.js';

// TODO: CHECK ALL JSDOC.
// TODO: CHECK ALL BOUND METHODS.
// TODO: DESCRIBE UNITS WHEN POSSIBLE.
// TODO: DEFINE PROMISES BEHAVIOUR.
// TODO: CHECK ALL MODEL AND CALCULATIONS. LOOK FOR IMPROVEMENTS.
// TODO: IMPROVE/REDUCE LOG DENSITY AND LOG LEVELS.

/**
 * @typedef loaderOptionsType
 * @property {number} [maxThreads=4] - Maximum concurrent threads.
 * @property {number} [activeTimeThreshold=100] - Minimum measured time in milliseconds that must be accumulated before using for calculations.
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

            this.options.autoStart =
                typeof options.autoStart === 'boolean'
                    ? options.autoStart
                    : false;
        } else {
            /** @type {loaderOptionsType} */
            this.options = {
                maxThreads: 4,
                activeTimeThreshold: 100,
                autoStart: false
            };
        }

        this.threads = {};
        this.queue = [];
        this.history = [];

        this.stats = {
            succeeded: 0,
            failed: 0
        };

        this.progress = {
            total: 0,
            loaded: 0,
            percent: 0,
            eta: null
        };

        this.performance = {
            rtt: null,
            rttAhead: null,
            throughput: null
        };

        this.status = {
            inProgress: 0,
            stopRequested: false
        };

        // CREATE INITIAL THREADS
        this.setMaxThreads(this.options.maxThreads);

        // BIND METHODS
        this.add = this.add.bind(this);
        // this.remove = this.remove.bind(this);
        this.getRequests = this.getRequests.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.callNextRequests = this.callNextRequests.bind(this);
        // this.sortQueue = this.sortQueue.bind(this);
        this.setMaxThreads = this.setMaxThreads.bind(this);
        this.balanceThreads = this.balanceThreads.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onEndHandler = this.onEndHandler.bind(this);
        this.onComputableProgressHandler = this.onComputableProgressHandler.bind(
            this
        );
        this.onDeltaLoadedHandler = this.onDeltaLoadedHandler.bind(this);
        this.onDeltaTotalHandler = this.onDeltaTotalHandler.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
    }

    /**
     * @typedef loaderAJAXRequestOptionsType
     * @property {string} url - Request URL.
     * @property {(number|null)} [total=null] - Payload size in bytes.
     * @property {string} [requestMethod='GET'] - HTTP method to be used.
     * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
     * @property {boolean} [noCache=false] - If true, appends unique query to the request URL so fresh responses are forced.
     */

    /**
     * @instance
     * @description Add request to loader queue.
     * @param {loaderAJAXRequestOptionsType} AJAXRequestOptions - Options for AJAXRequest to be added.
     * @param {boolean} [prepend] - Add to the start of the queue.
     * @param {boolean} [force] - Force new AJAXRequest instance creation.
     * @returns {AJAXRequest} AJAXRequest.
     */
    add(AJAXRequestOptions, prepend, force) {
        if (!force) {
            // GET LAST ADDED MATCHING AJAXRequest INSTANCE
            const latestRequest = this.getRequests(AJAXRequestOptions.url)[0];
            if (latestRequest) {
                return latestRequest;
            }
        }

        const newRequest = new AJAXRequest(AJAXRequestOptions);

        // ATTACH HANDLERS
        newRequest.once('end', this.onEndHandler);
        newRequest.on('computableProgress', this.onComputableProgressHandler);
        newRequest.on('deltaLoaded', this.onDeltaLoadedHandler);
        newRequest.on('deltaTotal', this.onDeltaTotalHandler);
        newRequest.once('headers', this.onHeadersHandler);

        // SEND NEW AJAXRequest INSTANCE TO QUEUE
        if (prepend) {
            this.queue.unshift(newRequest);
        } else {
            this.queue.push(newRequest);
        }
        log.debug('Loader()', `${newRequest.requestUrl} SENT TO QUEUE`)();

        // UPDATE PROGRESS
        this.progress.total +=
            newRequest.progress.total !== null ? newRequest.progress.total : 0;

        if (this.options.autoStart && this.status.inProgress === 0) {
            this.start();
        }

        return newRequest;
    }

    // TODO
    // remove(item, removeAll) {
    //     (Array.isArray(item) ? item : [item]).forEach((url) => {
    //         const requests = this.getRequests(url);
    //         if (requests.length > 0) {
    //
    //         }
    //     });
    // }

    /**
     * @instance
     * @description Returns an array with all AJAXRequests instances matching indicated url.
     * @param {string} url - Url.
     * @returns {Array<AJAXRequest>} AJAXRequests array.
     */
    getRequests(url) {
        const locations = [this.queue, this.threads, this.history];
        let output = [];
        locations.forEach((location) => {
            let request = null;
            if (Array.isArray(location)) {
                location.forEach((elem) => {
                    request =
                        elem instanceof AJAXRequest ? elem : elem.AJAXRequest;
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
                        location[i] instanceof AJAXRequest
                            ? location[i]
                            : location[i].AJAXRequest;
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
        this.status.stopRequested = false;
        this.callNextRequests();
    }

    /**
     * @instance
     * @description Stop loader work.
     * @returns {void} Void.
     */
    stop() {
        this.status.stopRequested = true;
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
            this.status.inProgress < this.options.maxThreads &&
            this.queue.length !== 0 &&
            !this.status.stopRequested
        ) {
            for (const i in this.threads) {
                if (!Object.prototype.hasOwnProperty.call(this.threads, i)) {
                    continue;
                }
                if (this.threads[i].AJAXRequest === null) {
                    flag = false;
                    // START REQUEST
                    this.threads[i].run(this.queue.shift());
                    this.status.inProgress++;
                    break;
                }
            }
            if (flag) {
                log.error('Loader()', 'NO FREE THREAD WAS FOUND')();
                return;
            }
        }
    }

    // TODO
    // sortQueue() {
    //
    // }

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
                    this.threads[key].AJAXRequest === null &&
                    deletedCount < currentThreads - this.options.maxThreads
                ) {
                    delete this.threads[key];
                    deletedCount++;
                } else if (key !== correctKey) {
                    Object.defineProperty(
                        this.threads,
                        correctKey,
                        Object.getOwnPropertyDescriptor(this.threads, key)
                    ); // TODO: USE FiberObject.renameProperty()
                    delete this.threads[key];
                    // UPDATE THREAD INDEX
                    this.threads[correctKey].options.threadIndex = correctKey;
                    j++;
                } else {
                    j++;
                }
            }

            log.info('Loader()', `${deletedCount} THREAD LINES DELETED`)();
        } else if (currentThreads < this.options.maxThreads) {
            // CASE: MORE THREADS NEEDED

            log.debug(
                'Loader()',
                'CURRENT THREADS NUMBER LOWER THAN EXPECTED. CREATING NEW THREADS'
            )();

            for (i = currentThreads; i < this.options.maxThreads; i++) {
                // CREATE NEW THREADS
                key = SEEDS.alphaUp.charAt(i);
                this.threads[key] = new Thread({
                    activeTimeThreshold: this.options.activeTimeThreshold,
                    threadIndex: key
                });
            }
            log.info(
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
        log.verbose('Loader()', `PERCENT: ${this.progress.percent} %`)();

        // GET ETA
        if (
            this.performance.throughput !== null &&
            this.performance.rtt !== null &&
            this.performance.rttAhead !== null
        ) {
            log.debug('Loader()', `TOTAL: ${this.progress.total}`)();
            log.debug('Loader()', `LOADED: ${this.progress.loaded}`)();
            log.debug('Loader()', `MAX THREADS: ${this.options.maxThreads}`)();
            log.debug('Loader()', `QUEUE LENGTH: ${this.queue.length}`)();
            this.progress.eta =
                (this.progress.total - this.progress.loaded) /
                    this.performance.throughput +
                this.performance.rttAhead +
                this.performance.rtt *
                    Math.ceil(this.queue.length / this.options.maxThreads);
        } else {
            this.progress.eta = null;
        }
        log.verbose(
            'Loader()',
            this.progress.eta === null
                ? 'ETA: -'
                : `ETA: ${this.progress.eta / 1000} s`
        )();

        this.emit('refresh', this);
    }

    /**
     * @instance
     * @description Callback for end event.
     * @param {Object<string,*>} e - Event.
     * @param {AJAXRequest} AJAXRequest - AJAXRequest.
     * @returns {void} Void.
     */
    onEndHandler(e, AJAXRequest) {
        // TODO: REMEMBER .succeeded AND .failed (ON SUCCESS AND ON FAIL)

        // DETACH HANDLERS
        AJAXRequest.off('computableProgress', this.onComputableProgressHandler);
        AJAXRequest.off('deltaLoaded', this.onDeltaLoadedHandler);
        AJAXRequest.off('deltaTotal', this.onDeltaTotalHandler);

        this.history.push(AJAXRequest);
        this.status.inProgress--;

        this.balanceThreads();

        if (this.queue.length !== 0) {
            // CALL NEXT THREADS
            this.callNextRequests();
        } else {
            // NO ITEMS LEFT IN QUEUE
            this.emit('end', this);
        }

        this.refresh();
    }

    /**
     * @instance
     * @description Callback for computableProgress event.
     * @param {Object<string,*>} e - Event.
     * @param {AJAXRequest} AJAXRequest - AJAXRequest.
     * @returns {void} Void.
     */
    onComputableProgressHandler(e, AJAXRequest) {
        const now = AJAXRequest.stats.latestProgressTimestamp;
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
            // GET LATENCY AHEAD
            if (
                !this.threads[i].status.isActive &&
                this.threads[i].AJAXRequest !== null &&
                this.performance.rtt !== null
            ) {
                deltaRtt =
                    this.performance.rtt -
                    (now - this.threads[i].AJAXRequest.stats.sendTimestamp);
                if (deltaRtt > 0) {
                    this.performance.rttAhead += deltaRtt;
                    rttAheadCount++;
                }
            }
            // GET THROUGHPUT
            if (this.threads[i].status.isActive) {
                isActiveCount++;
            } else if (
                this.status.inProgress < currentThreads &&
                this.threads[i].performance.throughput !== null
            ) {
                this.threads[i].performance.throughput = null;
                requestUpdateFlag = true; // TO NOT GET THROUGHPUT UNTIL EVERY LINE GETS ITS OWN THROUGHPUT UPDATED
            }
            if (this.threads[i].performance.throughput !== null) {
                throughput += this.threads[i].performance.throughput;
                throughputCount++;
            }
        }

        for (const i in this.threads) {
            if (!Object.prototype.hasOwnProperty.call(this.threads, i)) {
                continue;
            }
            if (requestUpdateFlag === true) {
                this.threads[i].status.isUpdated = false;
            } else {
                if (this.threads[i].status.isUpdated) {
                    isUpdatedCount++;
                }
            }
        }

        if (rttAheadCount !== 0) {
            this.performance.rttAhead /= rttAheadCount;
        }

        log.verbose(
            'Loader()',
            this.performance.rttAhead === null
                ? 'LATENCY AHEAD: -'
                : `LATENCY AHEAD: ${this.performance.rttAhead} ms`
        )();

        if (
            throughputCount === isActiveCount &&
            isUpdatedCount === isActiveCount
        ) {
            this.performance.throughput = throughput;
        }

        log.verbose(
            'Loader()',
            this.performance.throughput === null
                ? 'THROUGHPUT: -'
                : `THROUGHPUT: ${this.performance.throughput * 7.8125} Kb/s`
        )();

        this.refresh();
    }

    /**
     * @instance
     * @description Callback for deltaLoaded event.
     * @param {{deltaLoaded: number}} e - Event.
     * @returns {void} Void.
     */
    onDeltaLoadedHandler(e) {
        this.progress.loaded += e.deltaLoaded;
        this.refresh();
    }

    /**
     * @instance
     * @description Callback for deltaTotal event.
     * @param {{deltaTotal: number}} e - Event.
     * @returns {void} Void.
     */
    onDeltaTotalHandler(e) {
        this.progress.total += e.deltaTotal;
        this.refresh();
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
            if (
                !Object.prototype.hasOwnProperty.call(this.threads, i) ||
                this.threads[i].performance.rtt === null
            ) {
                continue;
            }
            // DYNAMIC MEAN
            x++;
            rtt = rtt === null ? 0 : rtt;
            rtt = (rtt * (x - 1) + this.threads[i].performance.rtt) / x;
        }

        if (rtt !== null) {
            this.performance.rtt = rtt;
        }

        log.verbose(
            'Loader()',
            this.performance.rtt === null
                ? `LATENCY: -`
                : `LATENCY: ${this.performance.rtt} ms`
        )();

        this.refresh();
    }
}

export {Loader};
