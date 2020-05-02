/** @flow */

/** @module react/components/input */

// TODO: SUPPORT FOR any TYPE value IN PROPS?
// TODO: RADIOS: ADD SUPPORT FOR DOUBLE CLICK (TOUCH) TO UNCHECK. ADD SUPPORT FOR INITIALLY CHECKED (IN radioButtons?)
// TODO: IMPROVE FOCUS WHEN INPUT HAS VALUE
// TODO: IMPROVE radio TITLES SYSTEM. MAKE A LITTLE MORE CUSTOMIZABLE?
// TODO: MAKE label = name WHEN NOT SPECIFIED?
// TODO: RESET BROWSERS AUTOFILL STYLES!
// TODO: ADD CLEAR INPUT BUTTON AND SHOW PASSWORD BUTTON OPTIONS (WITH FOCUS SUPPORT).
// TODO: SUPPORT FOR interpretation TOOLTIP?
// TODO: CHECK TAB NAVIGATION FOR RADIO BUTTONS AND CHECKBOXES IN Safari.

// TODO: CHECK INPUTS STYLE FILES.
// TODO: CHECK STYLES CORRECTNESS IN WEB INSPECTOR.

// TODO: ALLOW COMMANDS (LIKE cmd + v) IN ALL INPUTS DESPITE OF BLOCKERS, FILTERS, VALIDATORS, ETC.
// TODO: ALLOW CLICKING CHECKBOXES AND RADIOS BY CLICKING ON 'LABEL' (TITLE) TO MATCH NATIVE BEHAVIOUR.

import {objectUtils, arrayUtils} from '@codistica/core';
import React from 'react';
import uniqueId from 'react-html-id';
import {InputCheckbox} from './internals/input-checkbox/index.js';
import {InputRadio} from './internals/input-radio/index.js';
import {InputText} from './internals/input-text/index.js';

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

type Props = {
    name: string,
    label: string,
    value: string,
    checked: boolean,
    radios: {[string]: string},
    placeholder: string,
    type: string,
    mandatory: boolean,
    match: string,
    plugins: Plugin | Array<Plugin>,
    presets: Preset | Array<Preset>,
    onValidationResult: Function
};

type State = {
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null
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
 * @typedef inputPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [value=''] - Input value.
 * @property {boolean} [checked=false] - Input checked attribute.
 * @property {Object<string,string>} [radios=''] - Radio inputs definitions.
 * @property {string} [type='text'] - Input type.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {(string|null)} [match=null] - Name of input that has to be matched.
 * @property {(inputPluginType|Array<inputPluginType>)} [plugins=[]] - Input plugins.
 * @property {(inputPresetType|Array<inputPresetType>)} [presets=[]] - Input presets.
 */

/**
 * @classdesc A beautiful input component.
 */
class Input extends React.Component<Props, State> {
    static contextType = InputContext;

    static defaultProps = {
        name: '',
        label: '',
        value: '',
        checked: false,
        radios: {},
        placeholder: '',
        type: 'text',
        mandatory: true,
        match: null,
        plugins: [],
        presets: [],
        onValidationResult: null
    };

    nextUniqueId: Function;

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
     * @param {inputPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.id = this.nextUniqueId();
        this.value =
            props.type === 'checkbox'
                ? props.checked
                    ? props.value
                    : ''
                : props.type === 'radio'
                ? ''
                : props.value;

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
        (this: Function).newValueHandler = this.newValueHandler.bind(this);
        (this: Function).setValidation = this.setValidation.bind(this);
        (this: Function).setOverrideValidation = this.setOverrideValidation.bind(
            this
        );
        (this: Function).validateInput = this.validateInput.bind(this);
        (this: Function).highlight = this.highlight.bind(this);
        (this: Function).warn = this.warn.bind(this);
    }

    componentDidMount() {
        // EXPOSE INSTANCE
        this.context.onMount && this.context.onMount(this);

        // VALIDATE INITIAL VALUE
        this.validateInput();
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
     * @description Handler for newValue event.
     * @param {string} value - New value.
     * @param {boolean} [highlight] - Highlight input after setting value.
     * @returns {void} Void.
     */
    newValueHandler(value: string, highlight?: boolean) {
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

    highlight() {
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
            }, 900);
        }
    }

    warn() {
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
            }, 900);
        }
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            name,
            label,
            value,
            checked,
            radios,
            placeholder,
            type,
            ...others
        } = this.props;
        const {status} = this.state;
        const {id, newValueHandler, filters, blockers} = this;

        const Input =
            type === 'radio'
                ? InputRadio
                : type === 'checkbox'
                ? InputCheckbox
                : InputText;

        return (
            <Input
                {...others}
                id={id}
                name={name}
                label={label}
                value={value}
                status={status}
                type={type}
                checked={checked}
                radios={radios}
                placeholder={placeholder}
                onNewValue={newValueHandler}
                filters={filters}
                blockers={blockers}
            />
        );
    }
}

export {InputContext, Input};
