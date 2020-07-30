/** @module browser/classes/ajax-request */

import {log, urlUtils} from '@codistica/core';
import {EventEmitter} from 'eventemitter3';

// TODO: LOG AND PASS ERRORS
// TODO: REMOVE EVENT LISTENERS WHEN FINISHED

/**
 * @typedef ajaxRequestOptionsType
 * @property {string} url - Request URL.
 * @property {string} [requestMethod='GET'] - HTTP method to be used.
 * @property {(''|'arraybuffer'|'blob'|'document'|'json'|'text')} [responseType='text'] - Response type.
 * @property {boolean} [noCache=false] - If true, appends unique queries to the request URL so fresh responses are forced.
 */

/**
 * @classdesc XMLHttpRequest wrapper with eventemitter3 support.
 */
class AJAXRequest extends EventEmitter {
    /**
     * @description Constructor.
     * @param {ajaxRequestOptionsType} options - AJAXRequest options.
     */
    constructor(options) {
        super();

        this.options = typeof options === 'object' ? options : {};

        this.options.url = options.url;

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

        this.stats = {
            sendTimestamp: null
        };

        // BIND METHODS
        this.send = this.send.bind(this);
        this.abort = this.abort.bind(this);
        this.fail = this.fail.bind(this);
        this.emit = this.emit.bind(this);

        // SAVE REQUEST URL
        if (this.options.noCache) {
            const parsedQueryString = urlUtils.parseQueryString(
                this.options.url
            );

            parsedQueryString.noCache = Date.now();

            this.requestUrl =
                urlUtils.stripQueryString(this.options.url) +
                urlUtils.stringifyQueryString(parsedQueryString);
        } else {
            this.requestUrl = this.options.url;
        }

        // CREATE REQUEST
        this.request = new XMLHttpRequest();

        // SETUP REQUEST
        this.request.responseType = this.options.responseType;

        // TRACK STATUS
        this.request.addEventListener('readystatechange', () => {
            if (this.request.status >= 400 && this.request.status <= 599) {
                // CASE: HTTP ERROR OCCURRED

                log.error('AJAXRequest()', `${this.requestUrl} - HTTP ERROR`)();

                // FAIL
                this.fail();
            } else if (
                this.request.readyState >= 2 &&
                this.request.status <= 99
            ) {
                // MUST BE NESTED
                if (this.request.status === null) {
                    // CASE: POSSIBLE REQUEST ERROR OCCURRED
                    log.warning(
                        'AJAXRequest()',
                        `${this.requestUrl} - REQUEST ERROR CAN BE EXPECTED`
                    )();
                }
            } else if (this.request.readyState === 2) {
                // CASE: HEADERS RECEIVED

                this.emit('headers');
            } else if (this.request.readyState === 4) {
                // CASE: DOWNLOAD SUCCESSFULLY COMPLETED

                this.emit('success');
            }
        });

        // TRACK PROGRESS
        this.request.addEventListener('progress', (e) => {
            if (
                this.request.status >= 100 &&
                this.request.status <= 399 &&
                e.loaded > 0
            ) {
                this.emit('progress', {
                    loaded: e.loaded,
                    total: e.total,
                    lengthComputable: e.lengthComputable
                });
            }
        });

        // LOAD START
        this.request.addEventListener('loadstart', () => {
            // CASE: START

            this.emit('start');
        });

        // LOAD END
        this.request.addEventListener('loadend', () => {
            // CASE: END

            this.emit('end');
        });

        // ERROR HANDLER
        this.request.addEventListener('error', () => {
            // CASE: REQUEST ERROR OCCURRED

            log.error('AJAXRequest()', `${this.requestUrl} - REQUEST ERROR`)();

            this.emit('error');

            // FAIL
            this.fail();
        });

        // TIMEOUT HANDLER
        this.request.addEventListener('timeout', () => {
            // CASE: TIMEOUT

            log.warning(
                'AJAXRequest()',
                `${this.requestUrl} - REQUEST HAS TIMED OUT`
            )();

            this.emit('timeout');

            // FAIL
            this.fail();
        });

        // ABORT HANDLER
        this.request.addEventListener('abort', () => {
            // CASE: ABORTED

            log.info('AJAXRequest()', `${this.requestUrl} - REQUEST ABORTED`)();

            this.emit('abort');
        });
    }

    send() {
        log.debug('AJAXRequest()', `${this.requestUrl} - SENDING REQUEST`)();

        this.emit('send');

        this.request.open(this.options.requestMethod, this.requestUrl);
        this.request.send();

        this.stats.sendTimestamp = Date.now();
    }

    fail() {
        log.error('AJAXRequest()', `${this.requestUrl} - REQUEST FAILED`)();

        this.emit('fail');

        // ABORT REQUEST
        this.abort();
    }

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

export {AJAXRequest};
