/** @module browser/classes/ajax-request */

import {log, urlUtils, randomizer, EventEmitter} from '@codistica/core';
import {isSafeHeader} from '../modules/is-safe-header.js';

// TODO: RENAME TO loader-payload

/**
 * @description Available events.
 * @event AJAXRequest#headers
 * @event AJAXRequest#success
 * @event AJAXRequest#fail
 * @event AJAXRequest#progress
 * @event AJAXRequest#computableProgress
 * @event AJAXRequest#deltaTotal
 * @event AJAXRequest#deltaLoaded
 * @event AJAXRequest#start
 * @event AJAXRequest#end
 * @event AJAXRequest#error
 * @event AJAXRequest#timeout
 * @event AJAXRequest#abort
 * @event AJAXRequest#send
 */

/**
 * @typedef ajaxRequestOptionsType
 * @property {string} url - Request URL.
 * @property {(number|null)} [total=null] - Payload size in bytes.
 * @property {string} [requestMethod='GET'] - HTTP method to be used.
 * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
 * @property {boolean} [noCache=false] - If true, appends unique query to the request URL so fresh responses are forced.
 */

/**
 * @classdesc XMLHttpRequest wrapper.
 */
class AJAXRequest extends EventEmitter {
    /**
     * @description Constructor.
     * @param {ajaxRequestOptionsType} options - AJAXRequest options.
     */
    constructor(options) {
        super();

        if (typeof options === 'object') {
            /** @type {ajaxRequestOptionsType} */
            this.options = options;

            this.options.url =
                typeof options.url === 'string' ? options.url : '';

            this.options.total =
                typeof options.total === 'number' ? options.total : null;

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
            /** @type {ajaxRequestOptionsType} */
            this.options = {
                url: '',
                total: null,
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

        this.stats = {
            sendTimestamp: null,
            headersTimestamp: null,
            latestProgressTimestamp: null
        };

        this.progress = {
            total: /** @type {(number|null)} */ this.options.total,
            loaded: 0,
            percent: 0
        };

        this.status = {
            isFromCache: null,
            isComputable: typeof this.options.total === 'number' ? true : null
        };

        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve.bind(null, this);
            this.reject = reject.bind(null, this);
        });

        // BIND METHODS
        this.createRequest = this.createRequest.bind(this);
        this.send = this.send.bind(this);
        this.fail = this.fail.bind(this);
        this.abort = this.abort.bind(this);
        this.revertProgress = this.revertProgress.bind(this);
        this.onProgressHandler = this.onProgressHandler.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onFailHandler = this.onFailHandler.bind(this);

        // CREATE REQUEST
        this.createRequest();
    }

    /**
     * @instance
     * @description Create request.
     * @returns {void} Void.
     */
    createRequest() {
        this.request = new XMLHttpRequest();
        this.request.responseType = this.options.responseType;

        this.request.addEventListener('readystatechange', (e) => {
            if (this.request.status >= 400 && this.request.status <= 599) {
                // CASE: HTTP ERROR OCCURRED
                log.error('AJAXRequest()', `${this.requestUrl} - HTTP ERROR`)();
                this.fail(e);
            } else if (
                this.request.readyState >= 2 &&
                this.request.status <= 99
            ) {
                // IMPORTANT. MUST BE NESTED
                if (this.request.status === null) {
                    // CASE: POSSIBLE REQUEST ERROR OCCURRED
                    log.warning(
                        'AJAXRequest()',
                        `${this.requestUrl} - REQUEST ERROR CAN BE EXPECTED`
                    )();
                }
            } else if (this.request.readyState === 2) {
                // CASE: HEADERS RECEIVED
                this.stats.headersTimestamp = Date.now();
                this.onHeadersHandler();
                this.emit('headers', e, this);
            } else if (this.request.readyState === 4) {
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
            log.error('AJAXRequest()', `${this.requestUrl} - REQUEST ERROR`)();
            this.emit('error', e, this);
            this.fail(e);
        });

        this.request.addEventListener('timeout', (e) => {
            // CASE: TIMEOUT
            log.warning(
                'AJAXRequest()',
                `${this.requestUrl} - REQUEST HAS TIMED OUT`
            )();
            this.emit('timeout', e, this);
            this.fail(e);
        });

        this.request.addEventListener('abort', (e) => {
            // CASE: ABORTED
            log.info('AJAXRequest()', `${this.requestUrl} - REQUEST ABORTED`)();
            this.emit('abort', e, this);
        });
    }

    /**
     * @instance
     * @description Send request.
     * @returns {void} Void.
     */
    send() {
        log.debug('AJAXRequest()', `${this.requestUrl} - SENDING REQUEST`)();

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
        log.error('AJAXRequest()', `${this.requestUrl} - REQUEST FAILED`)();
        this.emit('fail', e, this);
        this.onFailHandler();
    }

    /**
     * @instance
     * @description Abort request.
     * @returns {void} Void.
     */
    abort() {
        log.info('AJAXRequest()', `${this.requestUrl} - REQUESTING ABORTION`)();

        if (typeof this.request.abort === 'function') {
            this.request.abort();
        } else {
            log.warning(
                'AJAXRequest()',
                `${this.requestUrl} - CANNOT BE ABORTED`
            )();
        }
    }

    /**
     * @instance
     * @description Revert progress tracking.
     * @returns {void} Void.
     */
    revertProgress() {
        if (this.progress.total !== null && this.progress.total !== 0) {
            this.emit(
                'deltaTotal',
                {
                    deltaTotal: -this.progress.total
                },
                this
            );
        }

        if (this.progress.loaded !== 0) {
            this.emit(
                'deltaLoaded',
                {
                    deltaLoaded: -this.progress.loaded
                },
                this
            );
        }

        this.status.isComputable = false;
        this.progress.total = null;
        this.progress.loaded = 0;
        this.progress.percent = 0;
    }

    /**
     * @instance
     * @description Callback for progress event.
     * @param {ProgressEvent} e - Progress event.
     * @returns {void} Void.
     */
    onProgressHandler(e) {
        if (this.status.isComputable) {
            if (e.loaded > this.progress.total) {
                log.error(
                    'AJAXRequest()',
                    `${this.requestUrl} - LOADED EXCEEDED TOTAL. SWITCHING TO NON COMPUTABLE`
                )();

                // REVERT PROGRESS
                this.revertProgress();
            } else {
                this.emit(
                    'deltaLoaded',
                    {
                        deltaLoaded: e.loaded - this.progress.loaded
                    },
                    this
                );

                this.progress.loaded = e.loaded;
                this.progress.percent =
                    (100 * this.progress.loaded) / this.progress.total;

                this.emit('computableProgress', e, this);
            }
        }
    }

    /**
     * @instance
     * @description Callback for headers event.
     * @returns {void} Void.
     */
    onHeadersHandler() {
        let responseTimestamp = null;
        let total = null;

        // GET SOURCE
        if (isSafeHeader(this.request, 'Now')) {
            responseTimestamp = parseInt(this.request.getResponseHeader('Now'));

            if (!Number.isNaN(responseTimestamp)) {
                if (responseTimestamp < this.stats.sendTimestamp) {
                    // CASE: RESPONSE FROM CACHE
                    this.status.isFromCache = true;
                    log.verbose(
                        'AJAXRequest()',
                        `${this.requestUrl} - RESPONSE FROM CACHE`
                    )();
                } else {
                    // CASE: RESPONSE FROM SERVER
                    this.status.isFromCache = false;
                    log.verbose(
                        'AJAXRequest()',
                        `${this.requestUrl} - RESPONSE FROM SERVER`
                    )();
                }
            }
        }

        if (this.status.isFromCache === null) {
            // CASE: UNKNOWN SOURCE
            log.verbose(
                'AJAXRequest()',
                `${this.requestUrl} - UNKNOWN RESPONSE SOURCE`
            )();
        }

        // GET TOTAL
        if (isSafeHeader(this.request, 'Content-Length')) {
            total = parseInt(this.request.getResponseHeader('Content-Length'));
            if (!Number.isNaN(total)) {
                log.debug(
                    'AJAXRequest()',
                    `${this.requestUrl} - TOTAL RECEIVED FROM HEADER`
                )();

                if (this.progress.total !== total) {
                    this.emit(
                        'deltaTotal',
                        {
                            deltaTotal: total - this.progress.total
                        },
                        this
                    );

                    if (this.progress.total !== null) {
                        log.error(
                            'AJAXRequest()',
                            `${this.requestUrl} - SAVED TOTAL DIFFERS FROM HEADER. OVERWRITING`
                        )();
                    }
                }
                this.status.isComputable = true;
                this.progress.total = total;
            }
        }

        if (this.progress.total === null) {
            log.warning(
                'AJAXRequest()',
                `${this.requestUrl} - IS NON COMPUTABLE`
            )();
            this.status.isComputable = false;
        }
    }

    /**
     * @instance
     * @description Callback for success event.
     * @returns {void} Void.
     */
    onSuccessHandler() {
        this.resolve();
    }

    /**
     * @instance
     * @description Callback for fail event.
     * @returns {void} Void.
     */
    onFailHandler() {
        this.revertProgress();
        this.reject();
        this.abort();
    }
}

export {AJAXRequest};
