/** @flow */

/** @module react/components/input-radio */

import {default as classNames} from 'classnames';
import React from 'react';
import {default as uniqueId} from 'react-html-id';
import type {Plugin, Preset} from '../input-renderer.js';
import {InputRenderer} from '../input-renderer.js';
import styles from './index.module.scss';
import {sophistication} from './index.sophistication.js';
import type {CustomStyles, CustomColors} from './index.sophistication.js';

type ExternalProps = {
    name: string,
    label: string,
    radios: {[string]: string},
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
 * @typedef inputRadioInternalPropsType
 * @property {string} [id=''] - Input ID.
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {Object<string,*>} [radios={}] - Radios descriptor.
 * @property {('valid'|'invalid'|'highlight'|'warning'|null)} [status=null] - Input status.
 * @property {Function} [onNewValue=null] - Callback for newValue event.
 */

/**
 * @classdesc A beautiful radio input component (Internal).
 */
class InputRadioInternal extends React.Component<InternalProps, State> {
    nextUniqueId: Function;

    /**
     * @description Constructor.
     * @param {inputRadioInternalPropsType} [props] - Component props.
     */
    constructor(props: InternalProps) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            value: ''
        };

        sophistication.setup(this);

        // EMIT INITIAL VALUE
        props.onNewValue && props.onNewValue('');

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
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
        this.setState({value: e.target.value});
        this.props.onNewValue && this.props.onNewValue(e.target.value);
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
            radios,
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

        const inputWrapperClassName = classNames({
            [styles.inputWrapper]: true,
            [classes.inputWrapper]: true
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

        const titleClassName = classNames({
            [styles.title]: true,
            [classes.title]: true
        });

        return (
            <span className={rootClassName}>
                {(() => {
                    let index = 0;
                    let subId = '';
                    let output = [];
                    for (const i in radios) {
                        if (!Object.prototype.hasOwnProperty.call(radios, i)) {
                            continue;
                        }
                        subId = this.nextUniqueId();
                        output.push(
                            <span key={index} className={styles.inputRow}>
                                <span className={inputWrapperClassName}>
                                    <input
                                        id={subId}
                                        type={'radio'}
                                        name={name}
                                        value={i}
                                        checked={value === i}
                                        className={inputClassName}
                                        onChange={onChange}
                                    />
                                    <label
                                        htmlFor={subId}
                                        className={labelClassName}>
                                        {label}
                                    </label>
                                </span>
                                <span className={titleClassName}>
                                    {radios[i]}
                                </span>
                            </span>
                        );
                        index++;
                    }
                    return output;
                })()}
            </span>
        );
    }
}

/**
 * @description A beautiful radio input component.
 * @param {inputRadioInternalPropsType} props - Component props. // TODO: FIX (EXTERNAL PROPS TYPES MUST BE USED).
 * @returns {Object<string,*>} React component.
 */
function InputRadio(props: ExternalProps) {
    return (
        <InputRenderer
            inputRenderFn={(rendererParams) => {
                return (
                    <InputRadioInternal
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

InputRadio.defaultProps = {
    name: '',
    label: '',
    radios: {},
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

export {InputRadio};
