/** @flow */

/** @module react/components/input-renderer */

// TODO: RADIOS: ADD SUPPORT FOR DOUBLE CLICK (TOUCH) TO UNCHECK. ADD SUPPORT FOR INITIALLY CHECKED (IN radios PROP?)
// TODO: MAKE label = name WHEN NOT SPECIFIED?
// TODO: RESET BROWSERS AUTOFILL STYLES!
// TODO: ADD CLEAR INPUT BUTTON AND SHOW PASSWORD BUTTON OPTIONS (WITH FOCUS SUPPORT).
// TODO: ALLOW COMMANDS (LIKE cmd + v) IN ALL INPUTS DESPITE OF BLOCKERS. (CREATE BLOCKER TO BLOCK COMMANDS AND ANOTHER FOR RIGHT-CLICKS AND ANOTHER FOR SELECTION)
// TODO: ALLOW CLICKING CHECKBOXES AND RADIOS BY CLICKING ON 'LABEL' (TITLE) TO MATCH NATIVE BEHAVIOUR.
// TODO: ADD SUPPORT FOR INPUT TOOLTIPS (WITH PLUGINS)
// TODO: ADD SUPPORT FOR INPUT REPORTS RENDERING (WITH EXTRA ELEMENT. VIA FORM PROVIDER? OR INDEPENDENT (BETTER) ?)

import {objectUtils, arrayUtils} from '@codistica/core';
import React from 'react';
import type {Node} from 'react';
import {default as uniqueId} from 'react-html-id';

type BlockerInstance = (e: {[string]: any}) => boolean;
type Blocker = {type: 'blocker', plugin: BlockerInstance};

type FilterInstance = (value: string) => string;
type Filter = {type: 'filter', plugin: FilterInstance};

type ValidatorInstance =
    | string
    | RegExp
    | ((value: string) => {result: boolean, report: {[string]: any}});
type Validator = {type: 'validator', plugin: ValidatorInstance};

type Plugins = Blocker | Filter | Validator;
type PluginWrapper = (options?: any) => Plugins;

type Plugin = Plugins | PluginWrapper;
type Preset = Plugin | Array<Plugin>;

type Status = 'valid' | 'invalid' | 'highlight' | 'warning' | null;

type RendererParams = {
    id: string,
    status: Status,
    onNewValueHandler: (value: string, highlight?: boolean) => void,
    blockers: Array<BlockerInstance>,
    filters: Array<FilterInstance>
};

type Props = {
    inputRenderFn: null | ((rendererParams: RendererParams) => Node),
    name: string,
    mandatory: boolean,
    match: string | null,
    plugins: Plugin | Array<Plugin>,
    presets: Preset | Array<Preset>,
    onValidationResult: null | ((...args: Array<any>) => any)
};

type State = {
    status: Status
};

const InputContext: {[string]: any} = React.createContext({
    onMount: null,
    onValidationResult: null
});

/**
 * @callback inputBlockerInstanceType
 * @param {Object<string,*>} e - Input event object.
 * @returns {boolean} - Should block.
 */

/**
 * @typedef inputBlockerType
 * @property {'blocker'} type - Plugin type.
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
 * @property {inputFilterInstanceType} plugin - Filter instance.
 */

/**
 * @typedef {(string|RegExp|function(string): {result: boolean, report: Object<string,*>})} inputValidatorInstanceType
 */

/**
 * @typedef inputValidatorType
 * @property {'validator'} type - Plugin type.
 * @property {inputValidatorInstanceType} plugin - Validator instance.
 */

/**
 * @typedef {(inputBlockerType|inputFilterType|inputValidatorType)} inputPluginsType
 */

/**
 * @callback inputPluginWrapperType
 * @param {*} [options] - Plugin options.
 * @returns {inputPluginsType} - Plugin.
 */

/**
 * @typedef {(inputPluginsType|inputPluginWrapperType)} inputPluginType
 */

/**
 * @typedef {(inputPluginType|Array<inputPluginType>)} inputPresetType
 */

/**
 * @typedef inputRendererPropsType
 * @property {Object<string,*>} [inputRenderFn=null] - Input component render prop.
 * @property {string} [name=''] - Input name.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {(string|null)} [match=null] - Name of input that has to be matched to correctly validate.
 * @property {(inputPluginType|Array<inputPluginType>)} [plugins=[]] - Input plugins.
 * @property {(inputPresetType|Array<inputPresetType>)} [presets=[]] - Input presets.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 */

/**
 * @classdesc A beautiful input component.
 */
class InputRenderer extends React.Component<Props, State> {
    static contextType = InputContext;

    static defaultProps = {
        inputRenderFn: null,
        name: '',
        mandatory: true,
        match: null,
        plugins: [],
        presets: [],
        onValidationResult: null
    };

    nextUniqueId: (...args: Array<any>) => any;

    id: string;
    value: string;

    validationResult: boolean | null;
    validationReport: Array<Object>;
    externalValidation: boolean | null | typeof undefined;
    externalOverrideValidation: boolean | null | typeof undefined;

    validators: Array<ValidatorInstance>;
    filters: Array<FilterInstance>;
    blockers: Array<BlockerInstance>;

    /**
     * @description Constructor.
     * @param {inputRendererPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.id = this.nextUniqueId();

        this.validationResult = null;
        this.validationReport = [];
        this.externalValidation = undefined;
        this.externalOverrideValidation = undefined;

        this.validators = [];
        this.filters = [];
        this.blockers = [];

        this.loadPresets(props.presets);
        this.loadPlugins(props.plugins);

        this.state = {
            status: null
        };

        // BIND METHODS
        (this: any).onNewValueHandler = this.onNewValueHandler.bind(this);
        (this: any).setValidation = this.setValidation.bind(this);
        (this: any).setOverrideValidation = this.setOverrideValidation.bind(
            this
        );
        (this: any).validateInput = this.validateInput.bind(this);
        (this: any).highlight = this.highlight.bind(this);
        (this: any).warn = this.warn.bind(this);
    }

    /**
     * @instance
     * @description React lifecycle.
     * @returns {void} Void.
     */
    componentDidMount() {
        // EXPOSE INSTANCE
        this.context.onMount && this.context.onMount(this);
    }

    /**
     * @instance
     * @description Loads presets into component's instance.
     * @param {(inputPresetType|Array<inputPresetType>)} presets - Array of presets to be loaded.
     */
    loadPresets(presets: Preset | Array<Preset>) {
        this.loadPlugins(arrayUtils.flatten(arrayUtils.normalize(presets)));
    }

    /**
     * @instance
     * @description Loads plugins into component's instance.
     * @param {(inputPluginType|Array<inputPluginType>)} plugins - Array of plugins to be loaded.
     */
    loadPlugins(plugins: Plugin | Array<Plugin>) {
        arrayUtils.normalize(plugins).forEach((plugin) => {
            const pluginObject = this.normalizePlugin(plugin);
            if (!pluginObject) {
                return;
            }
            switch (pluginObject.type) {
                case 'blocker':
                    this.blockers.push(pluginObject.plugin);
                    break;
                case 'filter':
                    this.filters.push(pluginObject.plugin);
                    break;
                case 'validator':
                    this.validators.push(pluginObject.plugin);
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * @instance
     * @description Initializes plugin if not already initialized.
     * @param {inputPluginType} plugin - Plugin to be normalized.
     * @returns {(inputPluginsType|null)} Normalized plugin.
     */
    normalizePlugin(plugin: Plugin): Plugins | null {
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

    /**
     * @instance
     * @description Callback for newValue event.
     * @param {string} value - New value.
     * @param {boolean} [highlight] - Highlight input after setting value.
     * @returns {void} Void.
     */
    onNewValueHandler(value: string, highlight?: boolean) {
        if (value !== this.value) {
            // SET NEW VALUE
            this.value = value;
            // VALIDATE NEW VALUE
            this.validateInput();
        }
        // BLINK IF REQUESTED
        highlight && this.highlight();
    }

    /**
     * @instance
     * @description Set input validation result.
     * @param {(boolean|null)} result - Validation result to be set.
     * @returns {void} Void.
     */
    setValidation(result: boolean | null | typeof undefined) {
        if (result !== this.externalValidation) {
            this.externalValidation = result;
            this.validateInput();
        }
    }

    /**
     * @instance
     * @description Override input validation result.
     * @param {(boolean|null)} result - Validation result to be set.
     * @returns {void} Void.
     */
    setOverrideValidation(result: boolean | null | typeof undefined) {
        if (result !== this.externalOverrideValidation) {
            this.externalOverrideValidation = result;
            this.validateInput();
        }
    }

    /**
     * @instance
     * @description Run input validation process.
     * @returns {void} Void.
     */
    validateInput() {
        let internalValidation = null;

        this.validationResult = null;
        this.validationReport = [];

        // CALL VALIDATORS
        if (this.value.length !== 0 && this.validators.length !== 0) {
            internalValidation = this.validators.every((validator) => {
                let result = null;
                let report = null;
                if (typeof validator === 'function') {
                    ({result, report} = validator(this.value));
                    this.validationReport.push(report);
                    return result;
                } else if (typeof validator === 'string') {
                    return validator === this.value;
                } else if (
                    validator instanceof RegExp &&
                    typeof this.value === 'string'
                ) {
                    return validator.test(this.value);
                } else {
                    return true;
                }
            });
        }

        // APPLY VALIDATION PRIORITY LOGIC
        if (typeof this.externalOverrideValidation !== 'undefined') {
            this.validationResult = this.externalOverrideValidation;
        } else {
            if (typeof this.externalValidation !== 'undefined') {
                this.validationResult =
                    (internalValidation !== null ? internalValidation : true) &&
                    this.externalValidation;
            } else {
                this.validationResult = internalValidation;
            }
        }

        this.setState({
            status:
                typeof this.validationResult === 'boolean'
                    ? this.validationResult
                        ? 'valid'
                        : 'invalid'
                    : null
        });

        // EMIT VALIDATION RESULT
        this.context.onValidationResult &&
            this.context.onValidationResult(
                this.id,
                this.validationResult,
                this.validationReport
            );
        this.props.onValidationResult &&
            this.props.onValidationResult(
                this.id,
                this.validationResult,
                this.validationReport
            );
    }

    /**
     * @instance
     * @description Triggers highlight state for the specified amount of time.
     * @param {number} duration - State duration.
     * @returns {void} Void.
     */
    highlight(duration?: number) {
        const previousStatus = this.state.status;
        if (previousStatus !== 'warning' && previousStatus !== 'highlight') {
            this.setState({
                status: 'highlight'
            });
            setTimeout(() => {
                if (this.state.status === 'highlight') {
                    this.setState({
                        status: previousStatus
                    });
                }
            }, duration || 1000);
        }
    }

    /**
     * @instance
     * @description Triggers warning state for the specified amount of time.
     * @param {number} duration - State duration.
     * @returns {void} Void.
     */
    warn(duration?: number) {
        const previousStatus = this.state.status;
        if (previousStatus !== 'warning' && previousStatus !== 'highlight') {
            this.setState({
                status: 'warning'
            });
            setTimeout(() => {
                if (this.state.status === 'warning') {
                    this.setState({
                        status: previousStatus
                    });
                }
            }, duration || 1000);
        }
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {status} = this.state;
        const {id, onNewValueHandler, filters, blockers} = this;

        return this.props.inputRenderFn
            ? this.props.inputRenderFn({
                  id,
                  status,
                  onNewValueHandler,
                  blockers,
                  filters
              })
            : null;
    }
}

export {InputContext, InputRenderer};
export type {Plugin, Preset};
