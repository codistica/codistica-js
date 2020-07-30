/** @module browser/classes/payload */

import {log} from '@codistica/core';
import {isSafeHeader} from '../modules/is-safe-header.js';
import {AJAXRequest} from './ajax-request.js';

/**
 * @typedef payloadPayloadDataType
 * @property {number|null} [total=null] - Payload size in bytes.
 * @property {boolean} [createObjectUrl=false] - If true, object url will be created from response. Only applies if response is of blob type.
 * @property {string} url - Request URL.
 * @property {string} [requestMethod='GET'] - HTTP method to be used.
 * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
 * @property {boolean} [noCache=false] - If true, appends unique queries to the request URL so fresh responses are forced.
 */

/**
 * @classdesc AJAXRequest wrapper for @codistica/browser Loader class.
 */
class Payload extends AJAXRequest {
    /**
     * @description Constructor.
     * @param {payloadPayloadDataType} payloadData - Payload data.
     */
    constructor(payloadData) {
        super({
            url: payloadData.url,
            requestMethod: payloadData.requestMethod,
            responseType: payloadData.responseType,
            noCache: payloadData.noCache
        });

        this.objectUrl = null;
        this.errors = [];

        this.options = {
            ...this.options,
            createObjectUrl:
                typeof payloadData.createObjectUrl === 'boolean'
                    ? payloadData.createObjectUrl
                    : false
        };

        this.status = {
            isFromCache: null,
            isComputable: typeof payloadData.total === 'number' ? true : null
        };

        this.stats = {
            ...this.stats,
            requested: 0
        };

        this.progress = {
            total:
                typeof payloadData.total === 'number'
                    ? payloadData.total
                    : null,
            loaded: 0,
            percent: 0
        };

        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve.bind(null, this);
            this.reject = reject.bind(null, this);
        });

        // BIND METHODS
        this.send = this.send.bind(this);
        this.revertProgress = this.revertProgress.bind(this);
        this.emit = this.emit.bind(this);
        this.onEndHandler = this.onEndHandler.bind(this);
        this.onProgressHandler = this.onProgressHandler.bind(this);
        this.onHeadersHandler = this.onHeadersHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onFailHandler = this.onFailHandler.bind(this);

        // ATTACH HANDLERS
        this.once('end', this.onEndHandler);
        this.on('progress', this.onProgressHandler);
        this.once('headers', this.onHeadersHandler);
        this.once('success', this.onSuccessHandler);
        this.once('fail', this.onFailHandler);
    }

    send() {
        this.stats.requested++;
        super.send();
    }

    revertProgress() {
        if (this.progress.total !== null && this.progress.total !== 0) {
            this.emit('deltatotal', {
                deltaTotal: -this.progress.total
            });
        }

        if (this.progress.loaded !== 0) {
            this.emit('deltaloaded', {
                deltaLoaded: -this.progress.loaded
            });
        }

        this.status.isComputable = false;
        this.progress.total = null;
        this.progress.loaded = -1;
        this.progress.percent = -1;
    }

    onEndHandler() {
        // DETACH HANDLERS
        this.off('progress', this.onProgressHandler);
    }

    /**
     * @instance
     * @description Callback for progress event.
     * @param {ProgressEvent} e - Progress event.
     */
    onProgressHandler(e) {
        if (this.status.isComputable) {
            if (e.loaded > this.progress.total) {
                log.error(
                    'Payload()',
                    `${this.requestUrl} - LOADED EXCEEDED TOTAL. SWITCHING TO NON COMPUTABLE`
                )();

                // REVERT PROGRESS
                this.revertProgress();
            } else {
                this.emit('deltaloaded', {
                    deltaLoaded: e.loaded - this.progress.loaded
                });

                this.progress.loaded = e.loaded;
                this.progress.percent =
                    (100 * this.progress.loaded) / this.progress.total;

                this.emit('computableprogress', e);
            }
        }
    }

    onHeadersHandler() {
        let responseTimestamp = null;
        let total = null;

        // GET SOURCE
        if (isSafeHeader(this.request, 'Now')) {
            // TODO: ANOTHER WAY TO DETECT IF FROM CACHE?

            responseTimestamp = parseInt(this.request.getResponseHeader('Now'));

            if (!Number.isNaN(responseTimestamp)) {
                if (responseTimestamp < this.stats.sendTimestamp) {
                    // CASE: RESPONSE FROM CACHE
                    this.status.isFromCache = true;
                    log.verbose(
                        'Payload()',
                        `${this.requestUrl} - RESPONSE FROM CACHE`
                    )();
                } else {
                    // CASE: RESPONSE FROM SERVER
                    this.status.isFromCache = false;
                    log.verbose(
                        'Payload()',
                        `${this.requestUrl} - RESPONSE FROM SERVER`
                    )();
                }
            }
        }
        if (this.status.isFromCache === null) {
            // CASE: UNKNOWN SOURCE
            log.verbose(
                'Payload()',
                `${this.requestUrl} - UNKNOWN RESPONSE SOURCE`
            )();
        }

        // GET TOTAL
        if (isSafeHeader(this.request, 'Content-Length')) {
            total = parseInt(this.request.getResponseHeader('Content-Length'));
            if (!Number.isNaN(total)) {
                log.debug(
                    'Payload()',
                    `${this.requestUrl} - TOTAL RECEIVED FROM HEADER`
                )();

                if (this.progress.total !== total) {
                    this.emit('deltatotal', {
                        deltaTotal: total - this.progress.total
                    });

                    if (this.progress.total !== null) {
                        log.error(
                            'Payload()',
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
                'Payload()',
                `${this.requestUrl} - IS NON COMPUTABLE`
            )();
            this.status.isComputable = false;
        }
    }

    onSuccessHandler() {
        if (
            this.options.createObjectUrl &&
            this.options.responseType === 'blob' &&
            this.request.response !== null
        ) {
            this.objectUrl = URL.createObjectURL(this.request.response);
            log.debug('Payload()', `${this.requestUrl} - CREATED OBJECT URL`)();
        }
        // RESOLVE PROMISE
        this.resolve();
    }

    onFailHandler() {
        // REVERT PROGRESS
        this.revertProgress();
        // REJECT PROMISE
        this.reject();
    }

    /**
     * @instance
     * @description Event emission auxiliary method.
     * @param {(string|symbol)} event - Event name to be emitted.
     * @param {...*} args - Arguments to be passed to handlers.
     * @returns {boolean} Event emission result.
     */
    emit(event, ...args) {
        const [extraProps, ...otherArgs] = args;
        return super.emit(
            event,
            {
                ...(extraProps || {}),
                that: this
            },
            ...(otherArgs || [])
        );
    }
}

export {Payload};
