/** @module browser/classes/thread */

import {log} from '@codistica/core';

// TODO: RENAME TO loader-thread

/**
 * @typedef threadOptionsType
 * @property {number} [activeTimeThreshold=100] - Minimum accumulated active time to perform calculations [ms].
 * @property {number} [deltaLoadedThreshold=0] - Minimum accumulated delta loaded to perform calculations [B].
 * @property {(string|null)} [threadIndex=null] - Thread index in Loader.
 */

/**
 * @classdesc Thread class for @codistica/browser Loader class.
 */
class Thread {
    /**
     * @description Constructor.
     * @param {threadOptionsType} [options] - Thread options.
     */
    constructor(options = {}) {
        const that = this;

        if (typeof options === 'object') {
            /** @type {threadOptionsType} */
            this.options = options;

            this.options.activeTimeThreshold =
                typeof options.activeTimeThreshold === 'number'
                    ? options.activeTimeThreshold
                    : 100;

            this.options.deltaLoadedThreshold =
                typeof options.deltaLoadedThreshold === 'number'
                    ? options.deltaLoadedThreshold
                    : 0;

            this.options.threadIndex =
                typeof options.threadIndex === 'string'
                    ? options.threadIndex
                    : null;
        } else {
            /** @type {threadOptionsType} */
            this.options = {
                activeTimeThreshold: 100,
                deltaLoadedThreshold: 0,
                threadIndex: null
            };
        }

        this.AJAXRequest = null;

        this.stats = {
            activeTimestamp: null,
            accumulatedActiveTime: 0,
            accumulatedDeltaLoaded: 0
        };

        this.performance = {
            rtt: null,
            throughput: null
        };

        this.status = {
            firstChunkReceived: false,
            isUpdated: false,
            /**
             * @description Getter: isActive.
             * @returns {boolean} Value.
             */
            get isActive() {
                return that.stats.activeTimestamp !== null;
            }
        };

        // BIND METHODS
        this.run = this.run.bind(this);
        this.clear = this.clear.bind(this);
        this.reset = this.reset.bind(this);
        this.onEndHandler = this.onEndHandler.bind(this);
        this.onComputableProgressHandler = this.onComputableProgressHandler.bind(
            this
        );
        this.onDeltaLoadedHandler = this.onDeltaLoadedHandler.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
    }

    /**
     * @instance
     * @description Run AJAXRequest.
     * @param {Object<string,*>} AJAXRequest - AJAXRequest.
     */
    run(AJAXRequest) {
        // ATTACH HANDLERS
        AJAXRequest.prependOnceListener('end', this.onEndHandler);
        AJAXRequest.prependListener(
            'computableProgress',
            this.onComputableProgressHandler
        );
        AJAXRequest.prependListener('deltaLoaded', this.onDeltaLoadedHandler);
        AJAXRequest.prependOnceListener('headers', this.onHeadersHandler);

        // SEND REQUEST
        AJAXRequest.send();

        this.AJAXRequest = AJAXRequest;
    }

    /**
     * @instance
     * @description Clear thread.
     * @returns {void} Void.
     */
    clear() {
        this.AJAXRequest = null;
        this.stats.activeTimestamp = null;
        this.status.firstChunkReceived = false;
    }

    /**
     * @instance
     * @description Reset thread.
     * @returns {void} Void.
     */
    reset() {
        // RESET INSTANCE
        Object.assign(this, new Thread(this.options));
    }

    /**
     * @instance
     * @description Callback for end event.
     */
    onEndHandler() {
        // DETACH HANDLERS
        this.AJAXRequest.off('deltaLoaded', this.onDeltaLoadedHandler);
        this.AJAXRequest.off(
            'computableProgress',
            this.onComputableProgressHandler
        );
        this.clear();
    }

    /**
     * @instance
     * @description Callback for computableProgress event.
     */
    onComputableProgressHandler() {
        const now = this.AJAXRequest.stats.latestProgressTimestamp;

        if (this.stats.activeTimestamp === null) {
            this.stats.activeTimestamp = now;
        }

        // GET THROUGHPUT
        const currentActiveTime = now - this.stats.activeTimestamp;
        const activeTime = currentActiveTime + this.stats.accumulatedActiveTime;

        if (
            activeTime >= this.options.activeTimeThreshold &&
            this.stats.accumulatedDeltaLoaded >=
                this.options.deltaLoadedThreshold
        ) {
            this.performance.throughput =
                this.stats.accumulatedDeltaLoaded / activeTime;

            this.stats.activeTimestamp = now;
            this.stats.accumulatedActiveTime = 0;
            this.stats.accumulatedDeltaLoaded = 0;

            this.status.isUpdated = true;

            log.debug(
                'Thread()',
                `THREAD ${this.options.threadIndex} - THROUGHPUT: ${
                    this.performance.throughput * 7.8125
                } Kb/s`
            )();
        } else if (
            this.AJAXRequest.progress.loaded === this.AJAXRequest.progress.total
        ) {
            // SAVE ACCUMULATED ACTIVE TIME FOR NEXT AJAXRequest
            this.stats.accumulatedActiveTime = activeTime;
        }
    }

    /**
     * @instance
     * @description Callback for deltaLoaded event.
     * @param {{deltaLoaded: number}} e - Event.
     */
    onDeltaLoadedHandler(e) {
        if (this.status.firstChunkReceived) {
            this.stats.accumulatedDeltaLoaded += e.deltaLoaded;
        } else {
            this.status.firstChunkReceived = true;
        }
    }

    /**
     * @instance
     * @description Callback for headers event.
     */
    onHeadersHandler() {
        // GET LATENCY
        this.performance.rtt =
            this.AJAXRequest.stats.headersTimestamp -
            this.AJAXRequest.stats.sendTimestamp;

        log.debug(
            'Thread()',
            `THREAD ${this.options.threadIndex} - LATENCY: ${this.performance.rtt} ms`
        )();
    }
}

export {Thread};
