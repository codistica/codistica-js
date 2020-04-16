/** @module browser/classes/loader */

import {log, SEEDS, Randomizer} from '@codistica/core';
import {EventEmitter} from 'eventemitter3';
import {Payload} from './payload.js';
import {Thread} from './thread.js';

/**
 * @typedef loaderPayloadPayloadDataType
 * @property {number|null} [total=null] - Payload size in bytes.
 * @property {boolean} [createObjectUrl=false] - If true, object url will be created from response. Only applies if response is of blob type.
 * @property {boolean} [force=false] - Indicates that payload usage must be forced.
 * @property {string} path - Request URL.
 * @property {string|null} [id] - Request ID.
 * @property {string} [requestMethod='GET'] - HTTP method to be used.
 * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
 * @property {boolean} [noCache=false] - If true, appends unique queries to the request URL so fresh responses are forced.
 */

/**
 * @typedef loaderOptionsType
 * @property {number} [maxThreads=4] - Maximum concurrent threads.
 * @property {number} [activeTimeThreshold=100] - Minimum measured time in milliseconds that must be accumulated before using for calculations.
 * @property {string|null} [threadIndex=null] - Thread index in Loader.
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

        this.threads = {};

        this.queue = [];
        this.history = [];

        this.options = {
            maxThreads: 0,
            activeTimeThreshold:
                typeof options.activeTimeThreshold === 'number'
                    ? options.activeTimeThreshold
                    : 100
        };

        this.status = {
            inProgress: 0,
            stopRequested: false
        };

        this.stats = {
            succeeded: 0,
            failed: 0
        };

        this.progress = {
            // TODO: WHEN/HOW TO SET LAP? (RESTART PROGRESS). AFTER HITTING 100%?
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

        // CREATE INITIAL THREADS
        this.setMaxThreads(
            typeof options.maxThreads === 'number' ? options.maxThreads : 4
        );

        // BIND METHODS
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.getPayloads = this.getPayloads.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.callThreads = this.callThreads.bind(this);
        this.sortQueue = this.sortQueue.bind(this);
        this.setMaxThreads = this.setMaxThreads.bind(this);
        this.balanceThreads = this.balanceThreads.bind(this);
        this.refresh = this.refresh.bind(this);
        this.emit = this.emit.bind(this);
        this.onEndHandler = this.onEndHandler.bind(this);
        this.onComputableProgressHandler = this.onComputableProgressHandler.bind(
            this
        );
        this.onDeltaLoadedHandler = this.onDeltaLoadedHandler.bind(this);
        this.onDeltaTotalHandler = this.onDeltaTotalHandler.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
    }

    /**
     * @description Add new item to loader queue.
     * @param {(loaderPayloadPayloadDataType|Array<loaderPayloadPayloadDataType>)} item - Item to be added.
     * @param {boolean} [addNext=false] - Add to the start of the queue.
     * @returns {string|Array<string>} Added item respective payload instance.
     */
    add(item, addNext) {
        let output = [];

        item = /** @type {Array<loaderPayloadPayloadDataType>} */ (Array.isArray(
            item
        )
            ? item
            : [item]);

        item.forEach((payloadData) => {
            let payload = null;

            if (!payloadData.force) {
                payload = this.getPayloads(payloadData.path)[0]; // GET LAST ADDED PAYLOAD
                if (typeof payload === 'object') {
                    output.push(payload);
                    return;
                }
            }

            payload = new Payload({
                ...payloadData,
                id: Randomizer.getUniqueId()
            });

            // ATTACH HANDLERS
            payload.once('send', ({that}) => {
                that.once('end', this.onEndHandler);
                that.on('computableprogress', this.onComputableProgressHandler);
                that.on('deltaloaded', this.onDeltaLoadedHandler);
                that.on('deltatotal', this.onDeltaTotalHandler);
                that.once('headers', this.onHeadersHandler);
            });

            // SEND PAYLOAD TO QUEUE
            if (addNext) {
                this.queue.unshift(payload);
            } else {
                this.queue.push(payload);
            }
            log.debug('Loader()', `${payload.requestUrl} SENT TO QUEUE`)();

            // UPDATE PROGRESS
            this.progress.total +=
                payload.progress.total !== null ? payload.progress.total : 0;

            // PUSH PAYLOAD TO OUTPUT
            output.push(payload);
        });

        if (this.status.inProgress === 0) {
            this.start();
        }

        return output.length === 1 ? output[0] : output;
    }

    // TODO
    // /**
    //  * @param {string|Array<string>}    item
    //  * @param {boolean} removeAll
    //  * @returns {boolean|Array<boolean>}
    //  */
    // remove(item, removeAll) {
    //     (Array.isArray(item) ? item : [item]).forEach((path) => {
    //         const payloads = this.getPayloads(path);
    //         if (payloads.length > 0) {
    //
    //         }
    //     });
    // }

    /**
     * @description Returns an array with all payloads matching indicated path.
     * @param {string} path - Payload path.
     * @returns {Array<Object<string,*>>} Payloads array.
     */
    getPayloads(path) {
        const locations = [this.queue, this.threads, this.history];
        let output = [];
        locations.forEach((location) => {
            let payload = null;
            if (Array.isArray(location)) {
                location.forEach((elem) => {
                    payload = elem instanceof Payload ? elem : elem.payload;
                    if (payload && payload.path === path) {
                        output.push(payload);
                    }
                });
            } else {
                for (const i in location) {
                    if (!location.hasOwnProperty(i)) {
                        continue;
                    }
                    payload =
                        location[i] instanceof Payload
                            ? location[i]
                            : location[i].payload;
                    if (payload && payload.path === path) {
                        output.push(payload);
                    }
                }
            }
        });
        return output;
    }

    start() {
        this.status.stopRequested = false;
        this.callThreads();
    }

    stop() {
        this.status.stopRequested = true;
    }

    reset() {
        // RESET INSTANCE
        Object.assign(
            this,
            new Loader({
                maxThreads: this.options.maxThreads,
                activeTimeThreshold: this.options.activeTimeThreshold
            })
        );
    }

    callThreads() {
        let flag = true;
        while (
            this.status.inProgress < this.options.maxThreads &&
            this.queue.length !== 0 &&
            !this.status.stopRequested
        ) {
            for (const i in this.threads) {
                if (!this.threads.hasOwnProperty(i)) {
                    continue;
                }
                if (this.threads[i].payload === null) {
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
     * @description Dynamically set a new maximum number of concurrent threads.
     * @param {number} newMax - New maximum.
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
                    this.threads[key].payload === null &&
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
                    this.threads[correctKey].threadIndex = correctKey;
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
            this.callThreads();
        }
    }

    refresh() {
        // TODO: REDUCE REFRESH CALLS? MORE LIKE FIRST IMPLEMENTATION

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
    }

    /**
     * @description Callback for end event.
     * @param {{that: Object<string,*>}} arg - Event passed arguments.
     */
    onEndHandler({that}) {
        // TODO: REMEMBER .succeeded AND .failed (ON SUCCESS AND ON FAIL)

        // DETACH HANDLERS
        that.off('computableprogress', this.onComputableProgressHandler);
        that.off('deltaloaded', this.onDeltaLoadedHandler);
        that.off('deltatotal', this.onDeltaTotalHandler);

        this.history.push(that);
        this.status.inProgress--;

        this.balanceThreads();

        if (this.queue.length !== 0) {
            // CALL NEXT THREADS
            this.callThreads();
        } else {
            // NO ITEMS LEFT IN QUEUE
            this.emit('end');
        }

        // this.refresh();
    }

    /**
     * @description Callback for computableProgress event.
     * @param {{now: number}} arg - Event passed arguments.
     */
    onComputableProgressHandler({now}) {
        // TODO: MAKE REQUEST UPDATE A Payload METHOD?

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
            if (!this.threads.hasOwnProperty(i)) {
                continue;
            }
            // GET LATENCY AHEAD
            if (
                !this.threads[i].status.isActive &&
                this.threads[i].payload !== null &&
                this.performance.rtt !== null
            ) {
                deltaRtt =
                    this.performance.rtt -
                    (now - this.threads[i].payload.stats.sendTimestamp);
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
            if (!this.threads.hasOwnProperty(i)) {
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
     * @description Callback for deltaLoaded event.
     * @param {{deltaLoaded: number}} arg - Event passed arguments.
     */
    onDeltaLoadedHandler({deltaLoaded}) {
        this.progress.loaded += deltaLoaded;
        // this.refresh();
    }

    /**
     * @description Callback for deltaTotal event.
     * @param {{deltaTotal: number}} arg - Event passed arguments.
     */
    onDeltaTotalHandler({deltaTotal}) {
        this.progress.total += deltaTotal;
        // this.refresh();
    }

    onHeadersHandler() {
        // GET LATENCY
        let x = 0;
        let rtt = null;
        for (const i in this.threads) {
            if (
                !this.threads.hasOwnProperty(i) ||
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

        // this.refresh();
    }

    /**
     * @description Event emission auxiliary method.
     * @param {(string|symbol)} event - Event name to be emitted.
     * @param {...*} args - Arguments to be passed to handlers.
     * @returns {boolean} Event emission result.
     */
    emit(event, ...args) {
        const now = Date.now();
        const [extraProps, ...otherArgs] = args;
        return super.emit(
            event,
            {
                that: this,
                now,
                ...(extraProps || {})
            },
            ...(otherArgs || [])
        );
    }
}

export {Loader};
