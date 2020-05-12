/** @flow */

/** @module react/components/input-radio */

import React from 'react';
import {default as uniqueId} from 'react-html-id';
import resetClassName from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import type {Plugin, Preset} from '../input-renderer.js';
import {InputRenderer} from '../input-renderer.js';
import classNames from './index.module.scss';
import {sophistication} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

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
    customClassNames: CustomClassNames,
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

/**
 * @typedef inputRadioInternalPropsType
 * @property {string} id - Input ID.
 * @property {('valid'|'invalid'|'highlight'|'warning'|null)} status - Input status.
 */

/**
 * @classdesc A beautiful radio input component (Internal).
 */
class InputRadioInternal extends React.Component<InternalProps, State> {
    nextUniqueId: Function;

    /**
     * @description Constructor.
     * @param {(inputRadioPropsType|inputRadioInternalPropsType)} [props] - Component props.
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
        (this: any).onChangeHandler = this.onChangeHandler.bind(this);
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
     * @description Callback for change event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChangeHandler(e: {[string]: any}) {
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
            customStyles,
            customClassNames,
            customColors
        } = this.props;
        const {value} = this.state;
        const {onChangeHandler} = this;

        const jssClassNames = sophistication.getClassNames(this, {
            status,
            customColors,
            customStyles
        });

        const rootClassNames = mergeClassNames(
            resetClassName.root,
            classNames.root,
            customClassNames.root
        );

        const inputRowClassNames = mergeClassNames(
            classNames.inputRow,
            customClassNames.inputRow
        );

        const inputWrapperClassNames = mergeClassNames(
            classNames.inputWrapper,
            customClassNames.inputWrapper
        );

        const inputClassNames = mergeClassNames(
            classNames.input,
            jssClassNames.input
        );

        const labelClassNames = mergeClassNames(
            {
                [classNames.blink]:
                    status === 'highlight' || status === 'warning'
            },
            classNames.label,
            jssClassNames.label
        );

        const titleClassNames = mergeClassNames(
            classNames.title,
            customClassNames.title
        );

        return (
            <span style={customStyles.root} className={rootClassNames}>
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
                            <span
                                key={index}
                                style={customStyles.inputRow}
                                className={inputRowClassNames}>
                                <span
                                    style={customStyles.inputWrapper}
                                    className={inputWrapperClassNames}>
                                    <input
                                        id={subId}
                                        type={'radio'}
                                        name={name}
                                        value={i}
                                        checked={value === i}
                                        onChange={onChangeHandler}
                                        className={inputClassNames}
                                    />
                                    <label
                                        htmlFor={subId}
                                        className={labelClassNames}>
                                        {label}
                                    </label>
                                </span>
                                <span
                                    style={customStyles.title}
                                    className={titleClassNames}>
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
 * @typedef inputRadioPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {Object<string,*>} [radios={}] - Radios descriptor.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {(string|null)} [match=null] - Name of input that has to be matched to correctly validate.
 * @property {(*|Array<*>)} [plugins=[]] - Input plugins.
 * @property {(*|Array<*>)} [presets=[]] - Input presets.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onNewValue=null] - Callback for newValue event.
 * @property {Function} [onChange=null] - Callback for change event.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {Object<string,*>} [customColors=null] - Custom colors prop.
 */

/**
 * @description A beautiful radio input component.
 * @param {inputRadioPropsType} props - Component props.
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
                        onNewValue={rendererParams.onNewValueHandler}
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
    customClassNames: {},
    customColors: {}
};

export {InputRadio};
