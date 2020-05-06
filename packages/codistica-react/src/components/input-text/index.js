/** @flow */

/** @module react/components/input-text */

import {eventUtils} from '@codistica/core';
import {default as classNames} from 'classnames';
import React from 'react';
import {InputRenderer} from '../input-renderer.js';
import type {Plugin, Preset} from '../input-renderer.js';
import styles from './index.module.scss';
import {sophistication} from './index.sophistication.js';
import type {CustomStyles, CustomColors} from './index.sophistication.js';

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

// TODO: FIX.
/**
 * @typedef inputTextInternalPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [type='text'] - Input type.
 * @property {string} [value=''] - Input value.
 * @property {string} [placeholder=''] - Input placeholder.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {(string|null)} [match=null] - Name of input that has to be matched.
 * @property {Function} [onKeyDown=null] - Callback for key down event.
 * @property {Function} [onInput=null] - Callback for input event.
 * @property {Function} [onChangeFixed=null] - Callback for fixed change event.
 * @property {Function} [onBlur=null] - Callback for blur event.
 */

/**
 * @classdesc A beautiful text input component (Internal).
 */
class InputTextInternal extends React.Component<InternalProps, State> {
    inputChangeTracker: string;

    /**
     * @description Constructor.
     * @param {inputTextInternalPropsType} [props] - Component props.
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
        (this: Function).onKeyDown = this.onKeyDown.bind(this);
        (this: Function).onInput = this.onInput.bind(this);
        (this: Function).onChangeFixed = this.onChangeFixed.bind(this);
        (this: Function).onChange = this.onChange.bind(this);
        (this: Function).onBlur = this.onBlur.bind(this);
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
     * @description Handler for keyDown event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onKeyDown(e: {[string]: any}) {
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
     * @description Handler for input event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onInput(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onInput === 'function') {
            this.props.onInput(e);
        }

        // UPDATE INPUT
        this.updateInputValue(e.target.value);
    }

    /**
     * @instance
     * @description Handler for change fixed event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChangeFixed(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChangeFixed === 'function') {
            this.props.onChangeFixed(e);
        }

        // CALL FILTERS
        const newValue = this.props.filters.reduce(
            (acc, filter) => filter(acc),
            e.target.value
        );

        // UPDATE INPUT
        this.updateInputValue(newValue, newValue !== e.target.value);
    }

    /**
     * @instance
     * @description Handler for change event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChange(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }

    /**
     * @instance
     * @description Handler for blur event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onBlur(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onBlur === 'function') {
            this.props.onBlur(e);
        }

        // EMULATE REAL onChange EVENT BEHAVIOUR
        if (e.target.value !== this.inputChangeTracker) {
            this.onChangeFixed(
                eventUtils.getMockEvent({
                    ...e,
                    type: 'change'
                })
            );

            // RESET inputChangeTracker
            this.inputChangeTracker = e.target.value;
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
            customColors,
            customStyles
        } = this.props;
        const {value} = this.state;
        const {onKeyDown, onInput, onChange, onBlur} = this;

        const classes = sophistication.getClasses(this, {
            status,
            customColors,
            customStyles
        });

        const inputClassName = classNames({
            [styles.blink]: status === 'highlight' || status === 'warning',
            [styles.input]: true,
            [classes.input]: true
        });

        return (
            <span>
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={inputClassName}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <label htmlFor={id}>{label}</label>
            </span>
        );
    }
}

/**
 * @description A beautiful text input component.
 * @param {inputTextInternalPropsType} props - Component props. // TODO: FIX (EXTERNAL PROPS TYPES MUST BE USED).
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
                        onNewValue={rendererParams.newValueHandler}
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
    customColors: {}
};

export {InputText};
