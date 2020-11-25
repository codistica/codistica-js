/** @module browser/classes/loader-payload */

import {log, urlUtils, randomizer, EventEmitter} from '@codistica/core';
import {getSafeResponseHeaders} from '../modules/get-safe-response-headers.js';

/**
 * @description Available events.
 * @event LoaderPayload#headers
 * @event LoaderPayload#success
 * @event LoaderPayload#progress
 * @event LoaderPayload#start
 * @event LoaderPayload#end
 * @event LoaderPayload#error
 * @event LoaderPayload#timeout
 * @event LoaderPayload#abort
 * @event LoaderPayload#send
 * @event LoaderPayload#fail
 * @event LoaderPayload#totalChange
 * @event LoaderPayload#loadedChange
 * @event LoaderPayload#computableProgress
 */

/**
 * @typedef loaderPayloadOptionsType
 * @property {string} url - Request URL.
 * @property {(number|null)} [payloadLength=null] - Payload size [B].
 * @property {(number|null)} [assetLength=null] - Underlying asset size [B].
 * @property {string} [requestMethod='GET'] - HTTP method to be used.
 * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
 * @property {boolean} [noCache=false] - If true, appends unique query to the request URL so fresh responses are forced.
 */

/**
 * @classdesc XMLHttpRequest wrapper.
 */
class LoaderPayload extends EventEmitter {
    /**
     * @description Constructor.
     * @param {loaderPayloadOptionsType} options - LoaderPayload options.
     */
    constructor(options) {
        super();

        if (typeof options === 'object') {
            /** @type {loaderPayloadOptionsType} */
            this.options = options;

            this.options.url =
                typeof options.url === 'string' ? options.url : '';

            this.options.payloadLength =
                typeof options.payloadLength === 'number'
                    ? options.payloadLength
                    : null;

            this.options.assetLength =
                typeof options.assetLength === 'number'
                    ? options.assetLength
                    : null;

            this.options.requestMethod =
                typeof options.requestMethod === 'string'
                    ? options.requestMethod
                    : 'GET';

            this.options.responseType =
                typeof options.responseType === 'string'
                    ? options.responseType
                    : 'text';

            this.options.noCache =
                typeof options.noCache === 'boolean' ? options.noCache : false;
        } else {
            /** @type {loaderPayloadOptionsType} */
            this.options = {
                url: '',
                payloadLength: null,
                assetLength: null,
                requestMethod: 'GET',
                responseType: 'text',
                noCache: false
            };
        }

        this.id = randomizer.getUniqueId();

        // SAVE REQUEST URL
        if (this.options.noCache) {
            const parsedQueryString = urlUtils.parseQueryString(
                this.options.url
            );

            parsedQueryString[this.id] = Date.now();

            this.requestUrl =
                urlUtils.stripQueryString(this.options.url) +
                urlUtils.stringifyQueryString(parsedQueryString);
        } else {
            this.requestUrl = this.options.url;
        }

        this.compressionRatio = 1;
        this.isDecompressing = null;

        if (this.options.assetLength && this.options.payloadLength) {
            this.compressionRatio =
                this.options.assetLength / this.options.payloadLength;
        }

        this.progress = {
            total: /** @type {(number|null)} */ (this.options.payloadLength), // [B]
            loaded: 0, // [B]
            percent: 0 // [%]
        };

        this.stats = {
            sendTimestamp: null, // (EPOCH) [ms]
            headersTimestamp: null, // (EPOCH) [ms]
            latestProgressTimestamp: null, // (EPOCH) [ms]
            serverTimestamp: null, // (EPOCH) [ms]
            isFromCache: null,
            isComputable: typeof this.progress.total === 'number' ? true : null
        };

        this.performance = {
            rtt: null // [ms]
        };

        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve.bind(null, this);
            this.reject = reject.bind(null, this);
        });

        // BIND METHODS
        this.send = this.send.bind(this);
        this.fail = this.fail.bind(this);
        this.abort = this.abort.bind(this);
        this.stopProgressTracking = this.stopProgressTracking.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
        this.onProgressHandler = this.onProgressHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onFailHandler = this.onFailHandler.bind(this);

        // CREATE REQUEST
        this.request = new XMLHttpRequest();
        this.request.responseType = this.options.responseType;

        this.request.addEventListener('readystatechange', (e) => {
            if (this.request.status >= 400 && this.request.status <= 599) {
                // CASE: HTTP ERROR OCCURRED
                log.error(
                    'LoaderPayload()',
                    `${this.requestUrl} - HTTP ERROR`
                )();
                this.fail(e);
            } else if (
                this.request.readyState >= this.request.HEADERS_RECEIVED &&
                this.request.status <= 99
            ) {
                // IMPORTANT. MUST BE NESTED
                if (this.request.status === null) {
                    // CASE: POSSIBLE REQUEST ERROR OCCURRED
                    log.warning(
                        'LoaderPayload()',
                        `${this.requestUrl} - REQUEST ERROR CAN BE EXPECTED`
                    )();
                }
            } else if (
                this.request.readyState === this.request.HEADERS_RECEIVED
            ) {
                // CASE: HEADERS RECEIVED
                this.stats.headersTimestamp = Date.now();
                this.onHeadersHandler();
                this.emit('headers', e, this);
            } else if (this.request.readyState === this.request.DONE) {
                // CASE: DOWNLOAD SUCCESSFULLY COMPLETED
                this.onSuccessHandler();
                this.emit('success', e, this);
            }
        });

        this.request.addEventListener('progress', (e) => {
            this.stats.latestProgressTimestamp = Date.now();
            if (
                this.request.status >= 100 &&
                this.request.status <= 399 &&
                e.loaded > 0
            ) {
                this.onProgressHandler(e);
                this.emit('progress', e, this);
            }
        });

        this.request.addEventListener('loadstart', (e) => {
            // CASE: START
            this.emit('start', e, this);
        });

        this.request.addEventListener('loadend', (e) => {
            // CASE: END
            this.emit('end', e, this);
        });

        this.request.addEventListener('error', (e) => {
            // CASE: REQUEST ERROR OCCURRED
            log.error(
                'LoaderPayload()',
                `${this.requestUrl} - REQUEST ERROR`
            )();
            this.emit('error', e, this);
            this.fail(e);
        });

        this.request.addEventListener('timeout', (e) => {
            // CASE: TIMEOUT
            log.error(
                'LoaderPayload()',
                `${this.requestUrl} - REQUEST HAS TIMED OUT`
            )();
            this.emit('timeout', e, this);
            this.fail(e);
        });

        this.request.addEventListener('abort', (e) => {
            // CASE: ABORTED
            log.info(
                'LoaderPayload()',
                `${this.requestUrl} - REQUEST ABORTED`
            )();
            this.emit('abort', e, this);
        });
    }

    /**
     * @instance
     * @description Send request.
     * @returns {void} Void.
     */
    send() {
        log.debug('LoaderPayload()', `${this.requestUrl} - SENDING REQUEST`)();

        this.request.open(this.options.requestMethod, this.requestUrl);
        this.request.send();

        this.stats.sendTimestamp = Date.now();

        this.emit('send', this.request, this);
    }

    /**
     * @instance
     * @description Fail request.
     * @param {Event} e - Event.
     * @returns {void} Void.
     */
    fail(e) {
        log.error('LoaderPayload()', `${this.requestUrl} - REQUEST FAILED`)();
        this.emit('fail', e, this);
        this.onFailHandler();
    }

    /**
     * @instance
     * @description Abort request.
     * @returns {void} Void.
     */
    abort() {
        log.debug(
            'LoaderPayload()',
            `${this.requestUrl} - REQUESTING ABORTION`
        )();

        if (typeof this.request.abort === 'function') {
            this.request.abort();
        } else {
            log.warning(
                'LoaderPayload()',
                `${this.requestUrl} - CANNOT BE ABORTED`
            )();
        }
    }

    /**
     * @instance
     * @description Stop tracking progress.
     * @returns {void} Void.
     */
    stopProgressTracking() {
        this.stats.isComputable = false;

        this.progress.loaded = 0;
        this.progress.percent = 0;

        if (this.progress.total !== null) {
            this.progress.total = null;

            this.emit(
                'totalChange',
                this.progress.loaded - this.progress.total,
                this
            );
        }
    }

    /**
     * @instance
     * @description Callback for headers event.
     * @returns {void} Void.
     */
    onHeadersHandler() {
        const headers = getSafeResponseHeaders(this.request);
        const serverTimestamp = parseInt(headers['now']);
        const total = parseInt(headers['content-length']);

        // GET LATENCY
        this.performance.rtt =
            this.stats.headersTimestamp - this.stats.sendTimestamp;

        // GET SOURCE
        if (serverTimestamp) {
            this.stats.serverTimestamp = serverTimestamp;
            if (this.stats.serverTimestamp < this.stats.sendTimestamp) {
                // CASE: RESPONSE FROM CACHE
                this.stats.isFromCache = true;
                log.verbose(
                    'LoaderPayload()',
                    `${this.requestUrl} - RESPONSE FROM CACHE`
                )();
            } else {
                // CASE: RESPONSE FROM SERVER
                this.stats.isFromCache = false;
                log.verbose(
                    'LoaderPayload()',
                    `${this.requestUrl} - RESPONSE FROM SERVER`
                )();
            }
        }

        if (this.stats.isFromCache === null) {
            // CASE: UNKNOWN SOURCE
            log.verbose(
                'LoaderPayload()',
                `${this.requestUrl} - UNKNOWN RESPONSE SOURCE`
            )();
        }

        // GET TOTAL
        if (total) {
            if (this.progress.total !== total) {
                if (this.progress.total !== null) {
                    log.warning(
                        'LoaderPayload()',
                        `${this.requestUrl} - SAVED TOTAL DIFFERS FROM HEADER. OVERWRITING`
                    )();
                }

                this.emit(
                    'totalChange',
                    total - (this.progress.total || 0),
                    this
                );
            }

            this.progress.total = total;
            this.stats.isComputable = true;
        }

        if (this.progress.total === null) {
            log.warning(
                'LoaderPayload()',
                `${this.requestUrl} - IS NON COMPUTABLE`
            )();
            this.stats.isComputable = false;
        }
    }

    /**
     * @instance
     * @description Callback for progress event.
     * @param {ProgressEvent} e - Progress event.
     * @returns {void} Void.
     */
    onProgressHandler(e) {
        if (this.stats.isComputable) {
            let loaded = e.loaded;
            let deltaLoaded = 0;

            if (this.isDecompressing === null) {
                this.isDecompressing = !e.lengthComputable && e.total === 0;
                if (this.isDecompressing) {
                    log.warning(
                        'LoaderPayload()',
                        `${this.requestUrl} - BROWSER IS DECOMPRESSING PAYLOAD ON THE GO. LOADED VALUE MUST BE CORRECTED.`
                    )();
                }
            }

            if (this.isDecompressing) {
                loaded = Math.round(loaded * this.compressionRatio);
            }

            deltaLoaded = loaded - this.progress.loaded;

            this.progress.loaded += deltaLoaded;
            this.progress.percent =
                (100 * this.progress.loaded) / this.progress.total;

            this.emit('loadedChange', deltaLoaded, this);

            this.emit(
                'computableProgress',
                {
                    loaded: this.progress.loaded,
                    total: this.progress.total,
                    percent: this.progress.percent,
                    timestamp: this.stats.latestProgressTimestamp,
                    isDecompressing: this.isDecompressing,
                    deltaLoaded
                },
                this
            );
        }
    }

    /**
     * @instance
     * @description Callback for success event.
     * @returns {void} Void.
     */
    onSuccessHandler() {
        this.resolve();
        if (this.stats.isComputable) {
            const difference = this.progress.total - this.progress.loaded;
            if (difference) {
                // CORRECT PROGRESS IF INCONSISTENT AFTER SUCCESSFUL END
                log.warning(
                    'LoaderPayload()',
                    `${this.requestUrl} - CORRECTING PROGRESS. (DIFFERENCE: ${difference})`
                )();
                this.progress.loaded = this.progress.total;
                this.progress.percent = 100;
                this.emit('loadedChange', difference, this);
            }
        }
    }

    /**
     * @instance
     * @description Callback for fail event.
     * @returns {void} Void.
     */
    onFailHandler() {
        this.stopProgressTracking();
        this.reject();
        this.abort();
    }
}

export {LoaderPayload};
