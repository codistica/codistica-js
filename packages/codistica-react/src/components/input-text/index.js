/** @flow */

/** @module react/components/input-text */

import {eventUtils} from '@codistica/core';
import React from 'react';
import resetClassName from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {InputRenderer} from '../input-renderer.js';
import type {Plugin, Preset} from '../input-renderer.js';
import classNames from './index.module.scss';
import {sophistication} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

type BlockerInstance = (e: {[string]: any}) => boolean;
type FilterInstance = (value: string) => string;

type ExternalProps = {
    name: string,
    label: string,
    value: string,
    type: string,
    placeholder: string,
    mandatory: boolean,
    match: string | null,
    plugins: Plugin | Array<Plugin>,
    presets: Preset | Array<Preset>,
    onValidationResult: Function,
    onNewValue: Function,
    onKeyDown: Function,
    onInput: Function,
    onChangeFixed: Function,
    onChange: Function,
    onBlur: Function,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors
};

type InternalProps = {
    ...ExternalProps,
    id: string,
    blockers: Array<BlockerInstance>,
    filters: Array<FilterInstance>,
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null
};

type State = {
    value: string
};

/**
 * @typedef inputTextInternalPropsType
 * @property {string} id - Input ID.
 * @property {Array<*>} blockers - Blocker instances.
 * @property {Array<*>} filters - Filter instances.
 * @property {('valid'|'invalid'|'highlight'|'warning'|null)} status - Input status.
 */

/**
 * @classdesc A beautiful text input component (Internal).
 */
class InputTextInternal extends React.Component<InternalProps, State> {
    inputChangeTracker: string;

    /**
     * @description Constructor.
     * @param {(inputTextPropsType|inputTextInternalPropsType)} [props] - Component props.
     */
    constructor(props: InternalProps) {
        super(props);

        if (props.type === 'radio' || props.type === 'checkbox') {
            props.type = 'text';
        }

        this.inputChangeTracker = props.value;

        this.state = {
            value: props.value
        };

        sophistication.setup(this);

        // EMIT INITIAL VALUE
        props.onNewValue && props.onNewValue(props.value);

        // BIND METHODS
        (this: any).onKeyDownHandler = this.onKeyDownHandler.bind(this);
        (this: any).onInputHandler = this.onInputHandler.bind(this);
        (this: any).onChangeFixedHandler = this.onChangeFixedHandler.bind(this);
        (this: any).onChangeHandler = this.onChangeHandler.bind(this);
        (this: any).onBlurHandler = this.onBlurHandler.bind(this);
    }

    /**
     * @instance
     * @description React lifecycle.
     * @returns {void} Void.
     */
    componentWillUnmount() {
        sophistication.destroy(this);
    }

    /**
     * @instance
     * @description Callback for keyDown event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onKeyDownHandler(e: {[string]: any}) {
        const isPrintable = e.key && e.key.length === 1;

        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onKeyDown === 'function') {
            this.props.onKeyDown(e);
        }

        if (e.cancelable) {
            // CALL BLOCKERS
            this.props.blockers.forEach((blocker) => {
                if (
                    isPrintable &&
                    blocker({
                        target: {
                            selectionStart: e.target.selectionStart,
                            selectionEnd: e.selectionEnd,
                            value: e.target.value
                        },
                        key: e.key
                    })
                ) {
                    e.preventDefault();
                }
            });

            if (e.defaultPrevented) {
                this.updateInputValue(e.target.value, true);
            }
        }
    }

    /**
     * @instance
     * @description Callback for input event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onInputHandler(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onInput === 'function') {
            this.props.onInput(e);
        }

        // UPDATE INPUT
        this.updateInputValue(e.target.value);
    }

    /**
     * @instance
     * @description Callback for change fixed event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChangeFixedHandler(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChangeFixed === 'function') {
            this.props.onChangeFixed(e);
        }

        // CALL FILTERS
        const newValue = this.props.filters.reduce(
            (acc, filter) => filter(acc),
            e.target.value
        );

        // RESET inputChangeTracker
        this.inputChangeTracker = newValue;

        // UPDATE INPUT
        this.updateInputValue(newValue, newValue !== e.target.value);
    }

    /**
     * @instance
     * @description Callback for change event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChangeHandler(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }

    /**
     * @instance
     * @description Callback for blur event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onBlurHandler(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onBlur === 'function') {
            this.props.onBlur(e);
        }

        // EMULATE REAL onChange EVENT BEHAVIOUR
        if (e.target.value !== this.inputChangeTracker) {
            this.onChangeFixedHandler(
                eventUtils.getMockEvent({
                    ...e,
                    type: 'change'
                })
            );
        }
    }

    /**
     * @instance
     * @description Updates the input value.
     * @param {string} value - New value.
     * @param {boolean} [highlight] - Request input highlight after setting value.
     * @returns {void} Void.
     */
    updateInputValue(value: string, highlight?: boolean) {
        this.setState({value});
        this.props.onNewValue && this.props.onNewValue(value, highlight);
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            id,
            name,
            label,
            type,
            placeholder,
            status,
            customStyles,
            customClassNames,
            customColors,
            mandatory,
            match,
            onValidationResult,
            onNewValue,
            onKeyDown,
            onInput,
            onChangeFixed,
            onChange,
            onBlur,
            plugins,
            presets,
            blockers,
            filters,
            ...other
        } = this.props;

        const {value} = this.state;

        const {
            onKeyDownHandler,
            onInputHandler,
            onChangeHandler,
            onBlurHandler
        } = this;

        const jssClassNames = sophistication.getClassNames(this, {
            status,
            customColors,
            customStyles
        });

        const rootClassNames = mergeClassNames(
            resetClassName.root,
            customClassNames.root
        );

        const inputClassNames = mergeClassNames(
            {
                [classNames.blink]:
                    status === 'highlight' || status === 'warning'
            },
            classNames.input,
            jssClassNames.input,
            customClassNames.input
        );

        return (
            <span style={customStyles.root} className={rootClassNames}>
                <input
                    {...other}
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onKeyDown={onKeyDownHandler}
                    onInput={onInputHandler}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    style={customStyles.input}
                    className={inputClassNames}
                />
                <label
                    htmlFor={id}
                    style={customStyles.label}
                    className={customClassNames.label}>
                    {label}
                </label>
            </span>
        );
    }
}

/**
 * @typedef inputTextPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [value=''] - Input value.
 * @property {string} [type='text'] - Input type.
 * @property {string} [placeholder=''] - Input placeholder.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {(string|null)} [match=null] - Name of input that has to be matched to correctly validate.
 * @property {(*|Array<*>)} [plugins=[]] - Input plugins.
 * @property {(*|Array<*>)} [presets=[]] - Input presets.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onNewValue=null] - Callback for newValue event.
 * @property {Function} [onKeyDown=null] - Callback for keyDown event.
 * @property {Function} [onInput=null] - Callback for input event.
 * @property {Function} [onChangeFixed=null] - Callback for changeFixed event.
 * @property {Function} [onChange=null] - Callback for change event.
 * @property {Function} [onBlur=null] - Callback for blur event.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {Object<string,*>} [customColors=null] - Custom colors prop.
 */

/**
 * @description A beautiful text input component.
 * @param {inputTextPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function InputText(props: ExternalProps) {
    return (
        <InputRenderer
            inputRenderFn={(rendererParams) => {
                return (
                    <InputTextInternal
                        {...props}
                        id={rendererParams.id}
                        onNewValue={rendererParams.onNewValueHandler}
                        status={rendererParams.status}
                        blockers={rendererParams.blockers}
                        filters={rendererParams.filters}
                    />
                );
            }}
            name={props.name}
            mandatory={props.mandatory}
            match={props.match}
            plugins={props.plugins}
            presets={props.presets}
            onValidationResult={props.onValidationResult}
        />
    );
}

InputText.defaultProps = {
    name: '',
    label: '',
    value: '',
    type: 'text',
    placeholder: '',
    mandatory: true,
    match: null,
    plugins: [],
    presets: [],
    onValidationResult: null,
    onNewValue: null,
    onKeyDown: null,
    onInput: null,
    onChangeFixed: null,
    onChange: null,
    onBlur: null,
    customStyles: {},
    customClassNames: {},
    customColors: {}
};

export {InputText};
