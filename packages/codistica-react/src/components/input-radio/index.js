/** @flow */

/** @module react/components/input-radio */

import React from 'react';
import type {Node} from 'react';
import {default as uniqueId} from 'react-html-id';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {InputRenderer} from '../input-renderer.js';
import type {Plugin, Preset} from '../input-renderer.js';
import componentClassNames from './index.module.scss';
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
    onValidationResult: (...args: Array<any>) => any,
    onNewValue: (...args: Array<any>) => any,
    onChange: (...args: Array<any>) => any,
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InternalProps = {
    ...ExternalProps,
    id: string,
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null
};

type State = {
    value: string
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any},
        inputRow: {[string]: any},
        title: {[string]: any},
        inputWrapper: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string,
        inputRow: string,
        title: string,
        inputWrapper: string
    }
};

type GlobalColors = {
    [string]: CustomColors
};

type CallableObj = {
    (props: ExternalProps): Node,
    globalStyles: GlobalStyles,
    globalClassNames: GlobalClassNames,
    globalColors: GlobalColors,
    defaultProps: {[string]: any}
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
    nextUniqueId: (...args: Array<any>) => any;

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
            style,
            className,
            customStyles,
            customClassNames,
            customColors,
            globalTheme
        } = this.props;
        const {value} = this.state;
        const {onChangeHandler} = this;

        const globalStyles = globalTheme
            ? InputRadio.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? InputRadio.globalClassNames[globalTheme] || {}
            : {};

        const globalColors = globalTheme
            ? InputRadio.globalColors[globalTheme] || {}
            : {};

        const jssClassNames = sophistication.getClassNames(this, {
            status,
            customColors: {
                ...globalColors,
                ...customColors
            },
            customStyles
        });

        const mergedStyles = {
            root: mergeStyles(globalStyles.root, customStyles.root, style),
            inputRow: mergeStyles(globalStyles.inputRow, customStyles.inputRow),
            title: mergeStyles(globalStyles.title, customStyles.title),
            inputWrapper: mergeStyles(
                globalStyles.inputWrapper,
                customStyles.inputWrapper
            )
        };

        const mergedClassNames = {
            root: mergeClassNames(
                resetClassNames.root,
                componentClassNames.root,
                globalClassNames.root,
                customClassNames.root,
                className
            ),
            inputRow: mergeClassNames(
                componentClassNames.inputRow,
                globalClassNames.inputRow,
                customClassNames.inputRow
            ),
            input: mergeClassNames(
                componentClassNames.input,
                jssClassNames.input
            ),
            label: mergeClassNames(
                [
                    componentClassNames.blink,
                    status === 'highlight' || status === 'warning'
                ],
                componentClassNames.label,
                jssClassNames.label
            ),
            title: mergeClassNames(
                componentClassNames.title,
                globalClassNames.title,
                customClassNames.title
            ),
            inputWrapper: mergeClassNames(
                componentClassNames.inputWrapper,
                globalClassNames.inputWrapper,
                customClassNames.inputWrapper
            )
        };

        return (
            <span style={mergedStyles.root} className={mergedClassNames.root}>
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
                                style={mergedStyles.inputRow}
                                className={mergedClassNames.inputRow}>
                                <span
                                    style={mergedStyles.inputWrapper}
                                    className={mergedClassNames.inputWrapper}>
                                    <input
                                        id={subId}
                                        type={'radio'}
                                        name={name}
                                        value={i}
                                        checked={value === i}
                                        onChange={onChangeHandler}
                                        className={mergedClassNames.input}
                                    />
                                    <label
                                        htmlFor={subId}
                                        className={mergedClassNames.label}>
                                        {label}
                                    </label>
                                </span>
                                <span
                                    style={mergedStyles.title}
                                    className={mergedClassNames.title}>
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
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {Object<string,*>} [customColors=null] - Custom colors prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A beautiful radio input component.
 * @param {inputRadioPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
const InputRadio: CallableObj = function InputRadio(props: ExternalProps) {
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
};

InputRadio.globalStyles = {
    default: {
        root: {},
        inputRow: {},
        title: {},
        inputWrapper: {}
    }
};

InputRadio.globalClassNames = {
    default: {
        root: '',
        inputRow: '',
        title: '',
        inputWrapper: ''
    }
};

InputRadio.globalColors = {
    default: {}
};

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
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    customColors: {},
    globalTheme: 'default'
};

export {InputRadio};
