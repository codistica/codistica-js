/** @module browser/classes/loader-thread */

// TODO: ADD invalidate() METHOD TO SET isUpdated TO false? IMPROVE COMMUNICATION WITH Loader.

/**
 * @typedef loaderThreadOptionsType
 * @property {number} [activeTimeThreshold=100] - Minimum accumulated active time to perform calculations [ms].
 * @property {number} [deltaLoadedThreshold=0] - Minimum accumulated delta loaded to perform calculations [B].
 * @property {(string|null)} [threadIndex=null] - Thread index in Loader.
 */

/**
 * @classdesc Thread class for @codistica/browser Loader class.
 */
class LoaderThread {
    /**
     * @description Constructor.
     * @param {loaderThreadOptionsType} [options] - LoaderThread options.
     */
    constructor(options = {}) {
        const that = this;

        if (typeof options === 'object') {
            /** @type {loaderThreadOptionsType} */
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
            /** @type {loaderThreadOptionsType} */
            this.options = {
                activeTimeThreshold: 100,
                deltaLoadedThreshold: 0,
                threadIndex: null
            };
        }

        this.loaderPayload = null;

        this.stats = {
            isActiveTimestamp: null, // (EPOCH) [ms]
            accumulatedActiveTime: 0, // [ms]
            accumulatedDeltaLoaded: 0, // [B]
            firstChunkReceived: false,
            isUpdated: false,
            /**
             * @description Getter: isActive.
             * @returns {boolean} Value.
             */
            get isActive() {
                return that.stats.isActiveTimestamp !== null;
            }
        };

        this.performance = {
            throughput: null // [B/ms]
        };

        // BIND METHODS
        this.run = this.run.bind(this);
        this.onComputableProgressHandler =
            this.onComputableProgressHandler.bind(this);
        this.onEndHandler = this.onEndHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.reset = this.reset.bind(this);
    }

    /**
     * @instance
     * @description Run LoaderPayload instance.
     * @param {Object<string,*>} loaderPayload - LoaderPayload instance to be ran.
     * @returns {void} Void.
     */
    run(loaderPayload) {
        this.loaderPayload = loaderPayload;

        // ATTACH HANDLERS
        this.loaderPayload.prependListener(
            'computableProgress',
            this.onComputableProgressHandler
        );
        this.loaderPayload.prependOnceListener('end', this.onEndHandler);

        // SEND REQUEST
        this.loaderPayload.send();
    }

    /**
     * @instance
     * @description Callback for computableProgress event.
     * @param {Object<string,*>} e - Event.
     * @returns {void} Void.
     */
    onComputableProgressHandler(e) {
        if (this.stats.firstChunkReceived) {
            this.stats.accumulatedDeltaLoaded += e.deltaLoaded;
        } else {
            this.stats.firstChunkReceived = true;
        }

        if (this.stats.isActiveTimestamp === null) {
            this.stats.isActiveTimestamp = e.timestamp;
        }

        // GET THROUGHPUT
        const currentActiveTime = e.timestamp - this.stats.isActiveTimestamp;
        const activeTime = currentActiveTime + this.stats.accumulatedActiveTime;

        if (
            activeTime >= this.options.activeTimeThreshold &&
            this.stats.accumulatedDeltaLoaded >=
                this.options.deltaLoadedThreshold
        ) {
            this.performance.throughput =
                this.stats.accumulatedDeltaLoaded / activeTime;

            this.stats.isActiveTimestamp = e.timestamp;
            this.stats.accumulatedActiveTime = 0;
            this.stats.accumulatedDeltaLoaded = 0;
            this.stats.isUpdated = true;
        } else if (
            this.loaderPayload.progress.loaded ===
            this.loaderPayload.progress.total
        ) {
            // SAVE ACCUMULATED ACTIVE TIME FOR NEXT PAYLOAD
            this.stats.accumulatedActiveTime = activeTime;
        }
    }

    /**
     * @instance
     * @description Callback for end event.
     * @returns {void} Void.
     */
    onEndHandler() {
        // DETACH HANDLERS
        this.loaderPayload.off(
            'computableProgress',
            this.onComputableProgressHandler
        );
        this.clear();
    }

    /**
     * @instance
     * @description Clear thread.
     * @returns {void} Void.
     */
    clear() {
        this.loaderPayload = null;
        this.stats.isActiveTimestamp = null;
        this.stats.firstChunkReceived = false;
    }

    /**
     * @instance
     * @description Reset thread.
     * @returns {void} Void.
     */
    reset() {
        // RESET INSTANCE
        Object.assign(this, new LoaderThread(this.options));
    }
}

export {LoaderThread};
