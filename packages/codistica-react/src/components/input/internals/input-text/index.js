/** @flow */

/** @module react/components/input-text */

import {eventUtils} from '@codistica/core';
import classnames from 'classnames/dedupe';
import React from 'react';
import styles from './index.module.scss';

type BlockerInstance = (e: {[string]: any}) => boolean;
type FilterInstance = (value: string) => string;

type Props = {
    id: string,
    name: string,
    label: string,
    value: string,
    type: string,
    placeholder: string,
    blockers: Array<BlockerInstance>,
    filters: Array<FilterInstance>,
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null,
    onNewValue: Function,
    onKeyDown: Function,
    onInput: Function,
    onChangeFixed: Function,
    onChange: Function,
    onBlur: Function
};

type State = {
    value: string
};

/**
 * @typedef inputTextPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [type='text'] - Input type.
 * @property {string} [value=''] - Input value.
 * @property {string} [placeholder=''] - Input placeholder.
 * @property {Function} [onKeyDown=null] - Callback for key down event.
 * @property {Function} [onInput=null] - Callback for input event.
 * @property {Function} [onChangeFixed=null] - Callback for fixed change event.
 * @property {Function} [onBlur=null] - Callback for blur event.
 */

/**
 * @classdesc A beautiful text input component.
 */
class InputText extends React.Component<Props, State> {
    static defaultProps = {
        id: '',
        name: '',
        label: '',
        value: '',
        type: 'text',
        placeholder: '',
        blockers: [],
        filters: [],
        status: null,
        onNewValue: null,
        onKeyDown: null,
        onInput: null,
        onChangeFixed: null,
        onChange: null,
        onBlur: null
    };

    inputChangeTracker: string;

    /**
     * @description Constructor.
     * @param {inputTextPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.inputChangeTracker = props.value;

        this.state = {
            value: props.value
        };

        // BIND METHODS
        (this: Function).onKeyDown = this.onKeyDown.bind(this);
        (this: Function).onInput = this.onInput.bind(this);
        (this: Function).onChangeFixed = this.onChangeFixed.bind(this);
        (this: Function).onChange = this.onChange.bind(this);
        (this: Function).onBlur = this.onBlur.bind(this);
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
     * @returns {React.Component} React component.
     */
    render() {
        const {id, name, label, type, placeholder, status} = this.props;
        const {value} = this.state;
        const {onKeyDown, onInput, onChange, onBlur} = this;

        const mainClassName = classnames({[styles.main]: true});

        const inputClassName = classnames(
            {[styles.valid]: status === 'valid'},
            {[styles.invalid]: status === 'invalid'},
            {[styles.highlight]: status === 'highlight'},
            {[styles.warning]: status === 'warning'}
        );

        return (
            <span className={mainClassName}>
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

export {InputText};
