/** @flow */

/** @module react/classes/input-plugin-manager */

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

/**
 * @callback inputBlockerInstanceType
 * @param {Object<string,*>} e - Input event object.
 * @returns {boolean} - Should block.
 */

/**
 * @typedef inputBlockerType
 * @property {'blocker'} type - Plugin type.
 * @property {string} name - Plugin name.
 * @property {inputBlockerInstanceType} plugin - Blocker instance.
 */

/**
 * @callback inputFilterInstanceType
 * @param {string} value - Input value.
 * @returns {string} - Filtered output.
 */

/**
 * @typedef inputFilterType
 * @property {'filter'} type - Plugin type.
 * @property {string} name - Plugin name.
 * @property {inputFilterInstanceType} plugin - Filter instance.
 */

/**
 * @typedef {(string|RegExp|function(string): Object<string,*>)} inputValidatorInstanceType
 */

/**
 * @typedef inputValidatorType
 * @property {'validator'} type - Plugin type.
 * @property {string} name - Plugin name.
 * @property {string} [groupName] - Plugin group name.
 * @property {Array<Object<string,*>>} [groupMessages] - Plugin group error messages.
 * @property {Array<Object<string,*>>} [messages] - Plugin error messages.
 * @property {inputValidatorInstanceType} plugin - Validator instance.
 */

/**
 * @typedef {pluginType} inputPresetInstanceType
 */

/**
 * @typedef inputPresetType
 * @property {'preset'} type - Plugin type.
 * @property {string} name - Plugin name.
 * @property {Array<Object<string,*>>} groupMessages - Plugin group error messages.
 * @property {inputPresetInstanceType} plugin - Preset instance.
 */

/**
 * @typedef {(inputBlockerType|inputFilterType|inputValidatorType|inputPresetType)} allPluginsType
 */

/**
 * @callback pluginWrapperType
 * @param {*} [options] - Plugin options.
 * @returns {allPluginsType} - Plugin.
 */

/**
 * @typedef {((AllPluginsType|PluginWrapperType)|Array<(AllPluginsType|PluginWrapperType)>)} pluginType
 */

/**
 * @typedef runValidatorsOutputType
 * @property {(boolean|null)} result - Validation result.
 * @property {Object<string,Object<string,(boolean|null)>>} report - Validation report.
 * @property {Array<Object<string,*>>} messages - Validation error messages.
 * @property {Object<string,Object<string,*>>} data - Validation data.
 */

/**
 * @classdesc A class for input plugin management.
 */
class InputPluginManager {
    blockers: Array<BlockerType>;
    filters: Array<FilterType>;
    validators: Array<ValidatorType>;

    /**
     * @description Constructor.
     */
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

    /**
     * @instance
     * @description Validates input value using loaded validators.
     * @param {string} stringValue - String value to be validated.
     * @param {*} rawValue - Alternative raw value.
     * @returns {runValidatorsOutputType} Result.
     */
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

    /**
     * @instance
     * @description Filters input using loaded filters.
     * @param {string} value - Value to be filtered.
     * @returns {string} Filtered value.
     */
    runFilters(value: string): string {
        return this.filters.reduce((acc, filter) => filter.plugin(acc), value);
    }

    /**
     * @instance
     * @description Indicates if event should be blocked using loaded blockers.
     * @param {Object<string,*>} e - Event object.
     * @returns {boolean} Result.
     */
    runBlockers(e: {[string]: any}): boolean {
        const isPrintable = e.key && e.key.length === 1;
        return this.blockers.some((blocker) => {
            return !!(isPrintable && blocker.plugin(e));
        });
    }

    /**
     * @instance
     * @description Load plugins into instance.
     * @param {pluginType} plugins - Plugins to be loaded.
     * @returns {void} Void.
     */
    loadPlugins(plugins: InputPluginType) {
        const {blockers, filters, validators} = loadPlugins(plugins);
        this.blockers = mergePlugins<BlockerType>(this.blockers, blockers);
        this.filters = mergePlugins<FilterType>(this.filters, filters);
        this.validators = mergePlugins<ValidatorType>(
            this.validators,
            validators
        );
    }

    /**
     * @description Initializes plugin if not already initialized.
     * @param {(AllPluginsType|PluginWrapperType)} plugin - Plugin to be initialized.
     * @returns {(AllPluginsType|null)} Initialized plugin.
     */
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

/**
 * @description Plugins merge utility function.
 * @param {...AllPluginsType} pluginsArg - Plugins to be loaded.
 * @returns {Array<AllPluginsType>} Merged plugins.
 */
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

/**
 * @description Scans and initializes plugins.
 * @param {pluginType} plugins - Plugins to be loaded.
 * @returns {{blockers: Array<BlockerType>, filters: Array<FilterType>, validators: Array<ValidatorType>}} Plugins object.
 */
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

/**
 * @description Calls validator for specified value and returns a normalized output.
 * @param {string} stringValue - String value to be validated.
 * @param {any} rawValue - Alternative raw value.
 * @param {inputValidatorType} validator - Validator instance to be used.
 * @returns {Object<string,*>} Validator output.
 */
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
