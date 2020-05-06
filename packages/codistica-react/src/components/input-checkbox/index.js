/** @flow */

/** @module react/components/input-checkbox */

import {default as classNames} from 'classnames';
import React from 'react';
import type {Plugin, Preset} from '../input-renderer.js';
import {InputRenderer} from '../input-renderer.js';
import styles from './index.module.scss';
import {sophistication} from './index.sophistication.js';
import type {CustomStyles, CustomColors} from './index.sophistication.js';

type ExternalProps = {
    name: string,
    label: string,
    value: string,
    checked: boolean,
    mandatory: boolean,
    match: string | null,
    plugins: Plugin | Array<Plugin>,
    presets: Preset | Array<Preset>,
    onValidationResult: Function,
    onNewValue: Function,
    onChange: Function,
    customStyles: CustomStyles,
    customColors: CustomColors
};

type InternalProps = {
    ...ExternalProps,
    id: string,
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null
};

type State = {
    value: string
};

// TODO: FIX.
/**
 * @typedef inputCheckboxInternalPropsType
 * @property {string} [id=''] - Input ID.
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [value=''] - Input value.
 * @property {boolean} [checked=null] - Input checked attribute.
 * @property {('valid'|'invalid'|'highlight'|'warning'|null)} [status=null] - Input status.
 * @property {Function} [onNewValue=null] - Callback for newValue event.
 */

/**
 * @classdesc A beautiful checkbox input component (Internal).
 */
class InputCheckboxInternal extends React.Component<InternalProps, State> {
    /**
     * @description Constructor.
     * @param {inputCheckboxInternalPropsType} [props] - Component props.
     */
    constructor(props: InternalProps) {
        super(props);

        const value = props.checked ? props.value : '';

        this.state = {
            value
        };

        sophistication.setup(this);

        // EMIT INITIAL VALUE
        props.onNewValue && props.onNewValue(value);

        // BIND METHODS
        (this: Function).onChange = this.onChange.bind(this);
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
     * @description Handler for change event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChange(e: {[string]: any}) {
        const newValue = e.target.checked ? this.props.value : '';
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
        this.setState({
            value: newValue
        });
        this.props.onNewValue && this.props.onNewValue(newValue);
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
            status,
            customColors,
            customStyles
        } = this.props;
        const {value} = this.state;
        const {onChange} = this;

        const classes = sophistication.getClasses(this, {
            status,
            customColors,
            customStyles
        });

        const rootClassName = classNames({
            [styles.root]: true,
            [classes.root]: true
        });

        const inputClassName = classNames({
            [styles.input]: true,
            [classes.input]: true
        });

        const labelClassName = classNames({
            [styles.blink]: status === 'highlight' || status === 'warning',
            [styles.label]: true,
            [classes.label]: true
        });

        return (
            <span className={rootClassName}>
                <input
                    type={'checkbox'}
                    id={id}
                    name={name}
                    value={value}
                    checked={value !== ''}
                    className={inputClassName}
                    onChange={onChange}
                />
                <label htmlFor={id} className={labelClassName}>
                    {label}
                </label>
            </span>
        );
    }
}

/**
 * @description A beautiful checkbox input component.
 * @param {inputCheckboxInternalPropsType} props - Component props. // TODO: FIX (EXTERNAL PROPS TYPES MUST BE USED).
 * @returns {Object<string,*>} React component.
 */
function InputCheckbox(props: ExternalProps) {
    return (
        <InputRenderer
            inputRenderFn={(rendererParams) => {
                return (
                    <InputCheckboxInternal
                        {...props}
                        id={rendererParams.id}
                        onNewValue={rendererParams.newValueHandler}
                        status={rendererParams.status}
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

InputCheckbox.defaultProps = {
    name: '',
    label: '',
    value: '',
    checked: false,
    mandatory: true,
    match: null,
    plugins: [],
    presets: [],
    onValidationResult: null,
    onNewValue: null,
    onChange: null,
    customStyles: {},
    customColors: {}
};

export {InputCheckbox};
