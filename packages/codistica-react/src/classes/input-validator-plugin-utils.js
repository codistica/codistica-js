/** @flow */

import {
    promiseUtils,
    objectUtils,
    createHeartbeatTimeout
} from '@codistica/core';
import {Types} from '@codistica/types';

const inputValidatorPluginUtilsTypes = new Types({
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

class InputValidatorPluginUtils {
    options: Options;

    value: string;
    previousValue: string | null;

    validatorOutput: ValidatorOutputType;

    deferContexts: {[string]: DeferContextType};
    deferCaches: {[string]: DeferCacheType};
    deferHeartbeats: {[string]: (...args: Array<any>) => any};

    constructor(options?: Options) {
        ({options} = inputValidatorPluginUtilsTypes.validate({options}));
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
                            acc[key] =
                                InputValidatorPluginUtils.createMessageObject(
                                    rawMessage,
                                    params[key]
                                );
                        } else {
                            acc[key] =
                                InputValidatorPluginUtils.createMessageObject(
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

    setKeyResult(
        key?: string,
        result: boolean | null,
        rawMessage?: RawMessageType,
        params?: {[string]: any},
        noAbort?: boolean
    ) {
        if (key) {
            if (!noAbort && this.deferContexts[key]) {
                this.deferContexts[key].abort();
            }
            this.validatorOutput.report[key] = result;
            if (rawMessage) {
                this.validatorOutput.messages[key] =
                    InputValidatorPluginUtils.createMessageObject(
                        rawMessage,
                        params
                    );
            }
            this.updateResult();
        } else if (!this.options.keys.length) {
            this.validatorOutput.result = result;
        }
    }

    invalidate(
        key?: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    ) {
        this.setKeyResult(key, false, rawMessage, params);
    }

    invalidateAll(rawMessage?: RawMessageType, params?: {[string]: any}) {
        if (!this.options.keys.length) {
            this.validatorOutput.result = false;
        } else {
            this.options.keys.forEach((currentKey) =>
                this.setKeyResult(currentKey, false, rawMessage, params)
            );
        }
    }

    validate(
        key?: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    ) {
        this.setKeyResult(key, true, rawMessage, params);
    }

    validateAll(rawMessage?: RawMessageType, params?: {[string]: any}) {
        if (!this.options.keys.length) {
            this.validatorOutput.result = true;
        } else {
            this.options.keys.forEach((currentKey) =>
                this.setKeyResult(currentKey, true, rawMessage, params)
            );
        }
    }

    disable(
        key?: string,
        rawMessage?: RawMessageType,
        params?: {[string]: any}
    ) {
        this.setKeyResult(key, null, rawMessage, params);
    }

    disableAll(rawMessage?: RawMessageType, params?: {[string]: any}) {
        if (!this.options.keys.length) {
            this.validatorOutput.result = null;
        } else {
            this.options.keys.forEach((currentKey) =>
                this.setKeyResult(currentKey, null, rawMessage, params)
            );
        }
    }

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

        if (this.deferContexts[key]) {
            this.deferContexts[key].abort();
        }

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
            this.validatorOutput.promises[key] =
                promiseUtils.createStatePromise(
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
                                this.deferHeartbeats[key] =
                                    createHeartbeatTimeout();
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
                if (cache) {
                    cache.set(value, {
                        result: false,
                        rawMessage,
                        params
                    });
                }
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
                if (cache) {
                    cache.set(value, {
                        result: true,
                        rawMessage,
                        params
                    });
                }
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
                if (cache) {
                    cache.set(value, {
                        result: null,
                        rawMessage,
                        params
                    });
                }
                if (isActive) {
                    isActive = false;
                    this.disable(key, rawMessage, params);
                    resolve(true);
                    delete this.validatorOutput.promises[key];
                }
            },
            abort: () => {
                if (isActive) {
                    if (onAbort) {
                        onAbort();
                    }
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

    isStandBy() {
        return objectUtils
            .getValuesArray(this.deferContexts)
            .some((context) => {
                return context.isActive();
            });
    }

    isValid(key?: string) {
        if (key) {
            return this.validatorOutput.report[key];
        }
        return this.validatorOutput.result;
    }

    setData(key: string, value: any) {
        this.validatorOutput.data[key] = value;
    }

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

    getValidatorOutput(): ValidatorOutputType {
        this.previousValue = this.value;
        return this.validatorOutput;
    }

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
