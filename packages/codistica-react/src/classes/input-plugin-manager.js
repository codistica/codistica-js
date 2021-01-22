/** @flow */

// TODO: SET PLUGINS OBJECTS DEFAULTS!

import {arrayUtils, objectUtils} from '@codistica/core';
import {InputValidatorPluginUtils} from './input-validator-plugin-utils.js';
import type {
    RawMessageType,
    ValidatorOutputType
} from './input-validator-plugin-utils.js';

type BlockerInstanceType = (e: {[string]: any}) => boolean;
type BlockerType = {type: 'blocker', name: string, plugin: BlockerInstanceType};

type FilterInstanceType = (value: string) => string;
type FilterType = {type: 'filter', name: string, plugin: FilterInstanceType};

type ValidatorInstanceType =
    | string
    | RegExp
    | ((stringValue: string, rawValue: any) => ValidatorOutputType);
type ValidatorType = {
    type: 'validator',
    name: string,
    groupName: string,
    groupErrorMessages: {[string]: RawMessageType},
    errorMessages: {[string]: RawMessageType},
    plugin: ValidatorInstanceType
};

type PresetInstanceType = InputPluginType;
type PresetType = {
    type: 'preset',
    name: string,
    groupErrorMessages: {[string]: RawMessageType},
    plugin: PresetInstanceType
};

type AllPluginsType = BlockerType | FilterType | ValidatorType | PresetType;
type PluginWrapperType = (options?: any) => AllPluginsType;

type InputPluginType =
    | (AllPluginsType | PluginWrapperType)
    | Array<AllPluginsType | PluginWrapperType>;

type RunValidatorsOutputType = {[string]: ValidatorOutputType};

class InputPluginManager {
    blockers: Array<BlockerType>;
    filters: Array<FilterType>;
    validators: Array<ValidatorType>;

    constructor() {
        this.blockers = [];
        this.filters = [];
        this.validators = [];

        // BIND METHODS
        (this: any).runValidators = this.runValidators.bind(this);
        (this: any).runFilters = this.runFilters.bind(this);
        (this: any).runBlockers = this.runBlockers.bind(this);
        (this: any).loadPlugins = this.loadPlugins.bind(this);
    }

    runValidators(stringValue: string, rawValue: any): RunValidatorsOutputType {
        const output: RunValidatorsOutputType = {};

        for (const validator of this.validators) {
            const validatorOutput = getNormalizedValidatorOutput(
                stringValue,
                rawValue,
                validator
            );

            output[validator.name] = validatorOutput;

            if (validatorOutput.result === false) {
                break;
            }
        }

        return output;
    }

    runFilters(value: string): string {
        return this.filters.reduce((acc, filter) => filter.plugin(acc), value);
    }

    runBlockers(e: {[string]: any}): boolean {
        const isPrintable = e.key && e.key.length === 1;
        return this.blockers.some((blocker) => {
            return !!(isPrintable && blocker.plugin(e));
        });
    }

    loadPlugins(plugins: InputPluginType) {
        const {blockers, filters, validators} = loadPlugins(plugins);
        this.blockers = mergePlugins<BlockerType>(this.blockers, blockers);
        this.filters = mergePlugins<FilterType>(this.filters, filters);
        this.validators = mergePlugins<ValidatorType>(
            this.validators,
            validators
        );
    }

    static initializePlugin(
        plugin: AllPluginsType | PluginWrapperType
    ): AllPluginsType | null {
        if (typeof plugin === 'function') {
            const returnedValue = plugin();
            if (objectUtils.isPureObject(returnedValue) && returnedValue.type) {
                return returnedValue;
            }
        } else if (objectUtils.isPureObject(plugin) && plugin.type) {
            return plugin;
        }
        return null;
    }
}

function mergePlugins<MergePluginType: AllPluginsType>(
    ...pluginsArg: Array<MergePluginType | Array<MergePluginType>>
): Array<MergePluginType> {
    const output = [];
    const outputMap = new Map();

    pluginsArg.forEach((pluginArg) => {
        if (Array.isArray(pluginArg)) {
            pluginArg.forEach((plugin) => {
                const index = outputMap.get(plugin.name);

                if (typeof index !== 'number') {
                    // ADD PLUGIN
                    outputMap.set(plugin.name, output.length);
                    output.push(plugin);
                } else {
                    // REPLACE PLUGIN
                    output[index] = plugin;
                }
            });
        } else {
            const plugin = pluginArg;
            const index = outputMap.get(plugin.name);

            if (typeof index !== 'number') {
                // ADD PLUGIN
                outputMap.set(plugin.name, output.length);
                output.push(plugin);
            } else {
                // REPLACE PLUGIN
                output[index] = plugin;
            }
        }
    });

    return output;
}

function loadPlugins(
    plugins: InputPluginType
): {
    blockers: Array<BlockerType>,
    filters: Array<FilterType>,
    validators: Array<ValidatorType>
} {
    const output: {
        blockers: Array<BlockerType>,
        filters: Array<FilterType>,
        validators: Array<ValidatorType>
    } = {
        blockers: [],
        filters: [],
        validators: []
    };

    arrayUtils.flat(arrayUtils.normalize(plugins)).forEach((plugin) => {
        const pluginObject = InputPluginManager.initializePlugin(plugin);
        if (!pluginObject) {
            return;
        }
        let presetOutput = null;
        switch (pluginObject.type) {
            case 'blocker':
                output.blockers.push(pluginObject);
                break;
            case 'filter':
                output.filters.push(pluginObject);
                break;
            case 'validator':
                output.validators.push(pluginObject);
                break;
            case 'preset':
                presetOutput = loadPlugins(pluginObject.plugin);
                output.blockers = output.blockers.concat(presetOutput.blockers);
                output.filters = output.filters.concat(presetOutput.filters);
                output.validators = output.validators.concat(
                    presetOutput.validators.map((validator) => {
                        validator.groupName = pluginObject.name;
                        validator.groupErrorMessages =
                            pluginObject.groupErrorMessages;
                        return validator;
                    })
                );
                break;
            default:
                break;
        }
    });

    return output;
}

function getNormalizedValidatorOutput(
    stringValue: string,
    rawValue: any,
    validator: ValidatorType
): ValidatorOutputType {
    let validatorOutput: ValidatorOutputType = {
        result: true,
        report: {},
        messages: {},
        data: {},
        promises: {}
    };

    if (typeof validator.plugin === 'function') {
        const fnOutput = validator.plugin(stringValue, rawValue);
        if (typeof fnOutput === 'boolean' || fnOutput === null) {
            validatorOutput.result = fnOutput;
        } else {
            validatorOutput = fnOutput;
        }
    } else if (typeof validator.plugin === 'string') {
        validatorOutput.result = validator.plugin === stringValue;
    } else if (validator.plugin instanceof RegExp) {
        validatorOutput.result = validator.plugin.test(stringValue);
    }

    if (validatorOutput.result === false) {
        // ADD PLUGIN OBJECT ERROR MESSAGES
        if (validator.errorMessages) {
            for (const i in validator.errorMessages) {
                if (!Object.hasOwnProperty.call(validator.errorMessages, i)) {
                    continue;
                }
                if (validator.errorMessages[i]) {
                    validatorOutput.messages[
                        i
                    ] = InputValidatorPluginUtils.createMessageObject(
                        validator.errorMessages[i],
                        undefined,
                        {
                            sortKey: -1
                        }
                    );
                }
            }
        }

        // ADD PLUGIN OBJECT GROUP ERROR MESSAGES
        if (validator.groupErrorMessages) {
            for (const i in validator.groupErrorMessages) {
                if (
                    !Object.hasOwnProperty.call(validator.groupErrorMessages, i)
                ) {
                    continue;
                }
                if (validator.groupErrorMessages[i]) {
                    validatorOutput.messages[
                        i
                    ] = InputValidatorPluginUtils.createMessageObject(
                        validator.groupErrorMessages[i],
                        undefined,
                        {
                            sortKey: -1
                        }
                    );
                }
            }
        }
    }

    return validatorOutput;
}

export {InputPluginManager};
export type {InputPluginType, RunValidatorsOutputType};
