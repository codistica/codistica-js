/** @module browser/classes/thread */

import {log} from '@codistica/core';

/**
 * @typedef threadOptionsType
 * @property {number} [activeTimeThreshold=100] - Minimum measured time in milliseconds that must be accumulated before using for calculations.
 * @property {string|null} [threadIndex=null] - Thread index in Loader.
 */

/**
 * @classdesc Thread class for @codistica/browser Loader class.
 */
class Thread {
    // TODO: ADD activeLoadedThreshold. SPECIFY UNITS IN DESCRIPTION, ALSO FOR activeTimeThreshold

    /**
     * @description Constructor.
     * @param {threadOptionsType} [options] - Thread options.
     */
    constructor(options = {}) {
        const that = this;

        this.threadIndex =
            typeof options.threadIndex === 'string'
                ? options.threadIndex
                : null;
        this.payload = null;

        this.options = {
            activeTimeThreshold:
                typeof options.activeTimeThreshold === 'number'
                    ? options.activeTimeThreshold
                    : 100
        };

        this.timing = {
            activeTimestamp: null, // TODO: RENAME
            activeTime: 0, // TODO: RENAME
            activeLoaded: 0 // TODO: RENAME
        };

        this.status = {
            firstChunkReceived: false,
            isUpdated: false,
            /**
             * @description Getter: isActive.
             * @returns {boolean} Value.
             */
            get isActive() {
                // TODO: RENAME
                return that.timing.activeTimestamp !== null;
            }
        };

        this.performance = {
            rtt: null,
            throughput: null
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
     * @description Run specified payload.
     * @param {Object<string,*>} payload - Payload.
     */
    run(payload) {
        this.payload = payload;

        // ATTACH HANDLERS
        payload.once('end', this.onEndHandler);
        payload.on('computableprogress', this.onComputableProgressHandler);
        payload.on('deltaloaded', this.onDeltaLoadedHandler);
        payload.once('headers', this.onHeadersHandler);

        payload.send();
    }

    clear() {
        this.payload = null;
        this.timing.activeTimestamp = null;
        this.status.firstChunkReceived = false;
    }

    reset() {
        // RESET INSTANCE
        Object.assign(
            this,
            new Thread({
                activeTimeThreshold: this.options.activeTimeThreshold,
                threadIndex: this.threadIndex
            })
        );
    }

    /**
     * @description Callback for end event.
     * @param {{that: Object<string,*>}} arg - Event passed arguments.
     */
    onEndHandler({that}) {
        // DETACH HANDLERS
        that.off('deltaloaded', this.onDeltaLoadedHandler);
        that.off('computableprogress', this.onComputableProgressHandler);
        this.clear();
    }

    /**
     * @description Callback for computableProgress event.
     * @param {{that: Object<string,*>, now: number}} arg - Event passed arguments.
     */
    onComputableProgressHandler({that, now}) {
        let activeTime;

        if (this.timing.activeTimestamp === null) {
            this.timing.activeTimestamp = now;
        }

        // GET THROUGHPUT
        activeTime = now - this.timing.activeTimestamp + this.timing.activeTime;
        if (activeTime >= this.options.activeTimeThreshold) {
            this.performance.throughput = this.timing.activeLoaded / activeTime;
            this.timing.activeTimestamp = now;
            this.timing.activeTime = 0;
            this.timing.activeLoaded = 0;
            this.status.isUpdated = true;
            log.debug(
                'Thread()',
                `THREAD ${this.threadIndex} - THROUGHPUT: ${
                    this.performance.throughput * 7.8125
                } Kb/s`
            )();
        } else if (that.progress.loaded === that.progress.total) {
            // SAVE ACCUMULATED ACTIVE TIME FOR NEXT PAYLOAD
            this.timing.activeTime = activeTime;
        }
    }

    /**
     * @description Callback for deltaLoaded event.
     * @param {{deltaLoaded: number}} arg - Event passed arguments.
     */
    onDeltaLoadedHandler({deltaLoaded}) {
        if (this.status.firstChunkReceived) {
            this.timing.activeLoaded += deltaLoaded;
        } else {
            this.status.firstChunkReceived = true;
        }
    }

    /**
     * @description Callback for headers event.
     * @param {{now: number}} arg - Event passed arguments.
     */
    onHeadersHandler({now}) {
        // GET LATENCY
        this.performance.rtt = now - this.payload.stats.sendTimestamp;
        log.debug(
            'Thread()',
            `THREAD ${this.threadIndex} - LATENCY: ${this.performance.rtt} ms`
        )();
    }
}

export {Thread};
