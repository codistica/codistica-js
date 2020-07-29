/** @flow */

/** @module react/classes/input-validator-plugin-utils */

import {
    promiseUtils,
    objectUtils,
    createHeartbeatTimeout
} from '@codistica/core';
import {Types} from '@codistica/types';

const inputValidatorPluginUtilsSchema = new Types({
    options: {
        type: 'Object',
        def: {
            keys: {type: 'Array<string>', def: []},
            enableDeferCache: {type: 'boolean', def: false},
            deferThrottlingDelay: {type: ['number', 'null'], def: null}
        }
    }
});

type MessageObjectType = {
    message?: string | ((any) => string | null) | null,
    params?: {[string]: any},
    options?: {
        sortKey?: number
    }
};
type RawMessageType =
    | string
    | ((any) => string | null)
    | MessageObjectType
    | null;
type MessageType = {
    message: string,
    params: {[string]: any},
    options: {
        sortKey?: number
    }
};

type ResultType = boolean | null;
type ReportType = {[string]: ResultType};
type MessagesType = {[string]: MessageType};
type DataType = {[string]: any};
type PromisesType = {[string]: Promise<boolean>};

type ValidatorOutputType = {
    result: ResultType,
    report: ReportType,
    messages: MessagesType,
    data: DataType,
    promises: PromisesType
};

type DeferContextType = {
    invalidate: (rawMessage?: RawMessageType, params?: {[string]: any}) => void,
    validate: (rawMessage?: RawMessageType, params?: {[string]: any}) => void,
    disable: (rawMessage?: RawMessageType, params?: {[string]: any}) => void,
    abort: (void) => void,
    isActive: (void) => boolean,
    updateValue: (void) => void
};

type DeferCacheType = Map<
    string,
    {
        result: ResultType,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    }
>;

type DeferCallbackType = (value: string, context: DeferContextType) => void;

type Options = {
    keys: Array<string>,
    enableDeferCache: boolean,
    deferThrottlingDelay: number | null
};

/**
 * @typedef inputValidatorPluginUtilsOptionsType
 * @property {Array<string>} [keys=[]] - Validation keys.
 * @property {boolean} [enableDeferCache=false] - Enable internal defer cache.
 * @property {(number|null)} [deferThrottlingDelay=null] - Internal defer throttling delay in milliseconds.
 */

/**
 * @classdesc Input plugins utility class.
 */
class InputValidatorPluginUtils {
    options: Options;

    value: string;
    previousValue: string | null;

    validatorOutput: ValidatorOutputType;

    deferContexts: {[string]: DeferContextType};
    deferCaches: {[string]: DeferCacheType};
    deferHeartbeats: {[string]: (...args: Array<any>) => any};

    /**
     * @description Constructor.
     * @param {inputValidatorPluginUtilsOptionsType} [options] - Options.
     */
    constructor(options?: Options) {
        ({options} = inputValidatorPluginUtilsSchema.validate({options}));
        this.options = options;

        this.value = '';
        this.previousValue = null;

        this.validatorOutput = {
            result: null,
            report: {},
            messages: {},
            data: {},
            promises: {}
        };

        this.deferContexts = {};
        this.deferCaches = {};
        this.deferHeartbeats = {};

        // BIND METHODS
        (this: any).init = this.init.bind(this);
        (this: any).invalidate = this.invalidate.bind(this);
        (this: any).invalidateAll = this.invalidateAll.bind(this);
        (this: any).validate = this.validate.bind(this);
        (this: any).validateAll = this.validateAll.bind(this);
        (this: any).disable = this.disable.bind(this);
        (this: any).disableAll = this.disableAll.bind(this);
        (this: any).defer = this.defer.bind(this);
        (this: any).createDeferContext = this.createDeferContext.bind(this);
        (this: any).isStandBy = this.isStandBy.bind(this);
        (this: any).isValid = this.isValid.bind(this);
        (this: any).setData = this.setData.bind(this);
        (this: any).getValidatorOutput = this.getValidatorOutput.bind(this);
    }

    /**
     * @instance
     * @description Initializes validator state.
     * @param {string} value - Input value.
     * @param {(boolean|null)} initialValidationStatus - Initial validation status value.
     * @param {Object<string,(string|(function(*): string|null)|Object<string,*>|null)>} [rawMessages] - Raw messages.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    init(
        value: string,
        initialValidationStatus: boolean | null,
        rawMessages?: {[string]: RawMessageType},
        params?: {[string]: any}
    ) {
        this.value = value;

        this.validatorOutput.result = initialValidationStatus;

        this.validatorOutput.report = this.options.keys.reduce((acc, key) => {
            acc[key] = initialValidationStatus;
            return acc;
        }, {});

        if (rawMessages) {
            this.validatorOutput.messages = this.options.keys.reduce(
                (acc, key) => {
                    const rawMessage = rawMessages[key];
                    if (rawMessage) {
                        if (
                            typeof params === 'object' &&
                            params !== null &&
                            Object.hasOwnProperty.call(params, key)
                        ) {
                            acc[
                                key
                            ] = InputValidatorPluginUtils.createMessageObject(
                                rawMessage,
                                params[key]
                            );
                        } else {
                            acc[
                                key
                            ] = InputValidatorPluginUtils.createMessageObject(
                                rawMessage,
                                params
                            );
                        }
                    }
                    return acc;
                },
                {}
            );
        } else {
            this.validatorOutput.messages = {};
        }

        this.validatorOutput.data = {};
    }

    /**
     * @instance
     * @description Sets specified result to key.
     * @param {string} [key] - Key to be invalidated.
     * @param {(boolean|null)} [result] - Result.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @param {boolean} [noAbort] - Do not abort deferred validation.
     * @returns {void} Void.
     */
    setKeyResult(
        key?: string,
        result: boolean | null,
        rawMessage?: RawMessageType,
        params?: {[string]: any},
        noAbort?: boolean
    ) {
        if (key) {
            if (!noAbort) {
                this.deferContexts[key] && this.deferContexts[key].abort();
            }
            this.validatorOutput.report[key] = result;
            if (rawMessage) {
                this.validatorOutput.messages[
                    key
                ] = InputValidatorPluginUtils.createMessageObject(
                    rawMessage,
                    params
                );
            }
            this.updateResult();
        } else if (!this.options.keys.length) {
            this.validatorOutput.result = result;
        }
    }

    /**
     * @instance
     * @description Invalidates specified key or complete validation.
     * @param {string} [key] - Key to be invalidated.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    invalidate(
        key?: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    ) {
        this.setKeyResult(key, false, rawMessage, params);
    }

    /**
     * @instance
     * @description Invalidates all keys.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    invalidateAll(rawMessage?: RawMessageType, params?: {[string]: any}) {
        if (!this.options.keys.length) {
            this.validatorOutput.result = false;
        } else {
            this.options.keys.forEach((currentKey) =>
                this.setKeyResult(currentKey, false, rawMessage, params)
            );
        }
    }

    /**
     * @instance
     * @description Validates specified key or complete validation.
     * @param {string} [key] - Key to be validated.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    validate(
        key?: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    ) {
        this.setKeyResult(key, true, rawMessage, params);
    }

    /**
     * @instance
     * @description Validates all keys.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    validateAll(rawMessage?: RawMessageType, params?: {[string]: any}) {
        if (!this.options.keys.length) {
            this.validatorOutput.result = true;
        } else {
            this.options.keys.forEach((currentKey) =>
                this.setKeyResult(currentKey, true, rawMessage, params)
            );
        }
    }

    /**
     * @instance
     * @description Disables specified key or complete validation.
     * @param {string} [key] - Key.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    disable(
        key?: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    ) {
        this.setKeyResult(key, null, rawMessage, params);
    }

    /**
     * @instance
     * @description Disables all keys.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @returns {void} Void.
     */
    disableAll(rawMessage?: RawMessageType, params?: {[string]: any}) {
        if (!this.options.keys.length) {
            this.validatorOutput.result = null;
        } else {
            this.options.keys.forEach((currentKey) =>
                this.setKeyResult(currentKey, null, rawMessage, params)
            );
        }
    }

    /**
     * @instance
     * @description Defer specified key validation.
     * @param {string} key - Key.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} [rawMessage] - Raw message.
     * @param {Object<string,*>} [params] - Message parameters.
     * @param {function(string,Object<string,*>): void} callback - Callback.
     * @param {function(void): void} onAbort - Callback for abort event.
     * @returns {void} Void.
     */
    defer(
        key: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any},
        callback: DeferCallbackType,
        onAbort?: (void) => void
    ) {
        if (
            this.deferContexts[key] &&
            this.deferContexts[key].isActive() &&
            this.value === this.previousValue
        ) {
            this.setKeyResult(key, null, rawMessage, params, true);
            return;
        }

        this.deferContexts[key] && this.deferContexts[key].abort();

        if (
            this.options.enableDeferCache &&
            this.deferCaches[key] &&
            this.deferCaches[key].has(this.value)
        ) {
            const cache: any = this.deferCaches[key].get(this.value);
            if (cache.result) {
                this.validate(key, cache.rawMessage, cache.params);
            } else if (cache.result === false) {
                this.invalidate(key, cache.rawMessage, cache.params);
            } else {
                this.disable(key, cache.rawMessage, cache.params);
            }
        } else {
            if (this.options.enableDeferCache && !this.deferCaches[key]) {
                this.deferCaches[key] = new Map();
            }

            // CREATE VALIDATION PROMISE
            this.validatorOutput.promises[
                key
            ] = promiseUtils.createStatePromise(
                new Promise((resolve) => {
                    const context = this.createDeferContext(
                        key,
                        resolve,
                        this.deferCaches[key],
                        onAbort
                    );

                    this.deferContexts[key] = context;

                    if (this.options.deferThrottlingDelay) {
                        // WITH THROTTLING
                        if (!this.deferHeartbeats[key]) {
                            this.deferHeartbeats[
                                key
                            ] = createHeartbeatTimeout();
                        }
                        this.deferHeartbeats[key](() => {
                            context.updateValue();
                            callback(this.value, context);
                        }, this.options.deferThrottlingDelay);
                    } else {
                        // WITHOUT THROTTLING
                        callback(this.value, context);
                    }
                })
            );

            this.setKeyResult(key, null, rawMessage, params, true);
        }
    }

    /**
     * @instance
     * @description Creates context for defer callback execution.
     * @param {string} key - Key.
     * @param {function(boolean): void} resolve - Promise resolve method.
     * @param {Map<string,(boolean|null)>} [cache] - Defer cache.
     * @param {function(void): void} onAbort - Callback for abort event.
     * @returns {Object<string,*>} Defer context.
     */
    createDeferContext(
        key: string,
        resolve: (boolean) => void,
        cache?: DeferCacheType,
        onAbort?: (void) => void
    ): DeferContextType {
        let isActive: boolean = true;
        let value = this.value;
        return {
            invalidate: (
                rawMessage?: RawMessageType,
                params?: {[string]: any}
            ) => {
                cache &&
                    cache.set(value, {
                        result: false,
                        rawMessage,
                        params
                    });
                if (isActive) {
                    isActive = false;
                    this.invalidate(key, rawMessage, params);
                    resolve(true);
                    delete this.validatorOutput.promises[key];
                }
            },
            validate: (
                rawMessage?: RawMessageType,
                params?: {[string]: any}
            ) => {
                cache &&
                    cache.set(value, {
                        result: true,
                        rawMessage,
                        params
                    });
                if (isActive) {
                    isActive = false;
                    this.validate(key, rawMessage, params);
                    resolve(true);
                    delete this.validatorOutput.promises[key];
                }
            },
            disable: (
                rawMessage?: RawMessageType,
                params?: {[string]: any}
            ) => {
                cache &&
                    cache.set(value, {
                        result: null,
                        rawMessage,
                        params
                    });
                if (isActive) {
                    isActive = false;
                    this.disable(key, rawMessage, params);
                    resolve(true);
                    delete this.validatorOutput.promises[key];
                }
            },
            abort: () => {
                if (isActive) {
                    onAbort && onAbort();
                    isActive = false;
                    resolve(false);
                    delete this.validatorOutput.promises[key];
                }
            },
            isActive: () => isActive,
            updateValue: () => {
                value = this.value;
            }
        };
    }

    /**
     * @instance
     * @description Returns true if there are pending active defer contexts and false otherwise.
     * @returns {boolean} Result.
     */
    isStandBy() {
        return objectUtils
            .getValuesArray(this.deferContexts)
            .some((context) => {
                return context.isActive();
            });
    }

    /**
     * @instance
     * @description Returns specified key validation status.
     * @param {string} [key] - Key.
     * @returns {(boolean|null)} Result.
     */
    isValid(key?: string) {
        if (key) {
            return this.validatorOutput.report[key];
        }
        return this.validatorOutput.result;
    }

    /**
     * @instance
     * @description Saves custom data item.
     * @param {string} key - Data key.
     * @param {*} value - Data value.
     * @returns {void} Void.
     */
    setData(key: string, value: any) {
        this.validatorOutput.data[key] = value;
    }

    /**
     * @instance
     * @description Updates validation result value according to current reports.
     * @returns {void} Void.
     */
    updateResult() {
        if (this.isStandBy()) {
            this.validatorOutput.result = null;
            return;
        }

        let result = null;
        for (const i in this.validatorOutput.report) {
            if (!Object.hasOwnProperty.call(this.validatorOutput.report, i)) {
                continue;
            }
            if (result === null) {
                result = this.validatorOutput.report[i];
            } else if (
                result === true &&
                this.validatorOutput.report[i] !== null
            ) {
                result = this.validatorOutput.report[i];
            }
            if (result === false) {
                break;
            }
        }

        this.validatorOutput.result = result;
    }

    /**
     * @instance
     * @description Returns validator output.
     * @returns {Object<string,*>} Validator output.
     */
    getValidatorOutput(): ValidatorOutputType {
        this.previousValue = this.value;
        return this.validatorOutput;
    }

    /**
     * @description Creates a message object.
     * @param {(string|(function(*): string|null)|Object<string,*>|null)} rawMessage - Raw message.
     * @param {Object<string,*>} params - Message parameters.
     * @param {Object<string,*>} options - Message options.
     * @returns {Object<string,*>} Message object.
     */
    static createMessageObject(
        rawMessage: RawMessageType,
        params?: {[string]: any},
        options?: {sortKey?: number}
    ): MessageType {
        let messageSource = null;
        let messageParams = {};
        let messageOptions = {};
        let outputMessage = null;
        let outputParams = {};
        let outputOptions = {};

        if (typeof rawMessage === 'string') {
            return {
                message: rawMessage,
                params: params || {},
                options: options || {}
            };
        }

        if (typeof rawMessage === 'object' && rawMessage !== null) {
            messageSource = rawMessage.message || null;
            messageParams = rawMessage.params || {};
            messageOptions = rawMessage.options || {};
        } else {
            messageSource = rawMessage;
        }

        outputParams = {
            ...(params || {}: {[string]: any}),
            ...(messageParams: {[string]: any})
        };

        outputOptions = {
            ...(options || {}: {[string]: any}),
            ...(messageOptions: {[string]: any})
        };

        if (typeof messageSource === 'function') {
            outputMessage = messageSource(outputParams);
        } else {
            outputMessage = messageSource;
        }

        return {
            message: outputMessage || '',
            params: outputParams,
            options: outputOptions
        };
    }
}

export {InputValidatorPluginUtils};
export type {
    RawMessageType,
    MessageType,
    ResultType,
    ReportType,
    MessagesType,
    DataType,
    PromisesType,
    ValidatorOutputType
};
