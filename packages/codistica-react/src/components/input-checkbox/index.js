/** @flow */

/** @module react/components/input-checkbox */

import React from 'react';
import type {Node} from 'react';
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
    value: string,
    checked: boolean,
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
        root: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string
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
 * @typedef inputCheckboxInternalPropsType
 * @property {string} id - Input ID.
 * @property {('valid'|'invalid'|'highlight'|'warning'|null)} status - Input status.
 */

/**
 * @classdesc A beautiful checkbox input component (Internal).
 */
class InputCheckboxInternal extends React.Component<InternalProps, State> {
    /**
     * @description Constructor.
     * @param {(inputCheckboxPropsType|inputCheckboxInternalPropsType)} [props] - Component props.
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
            ? InputCheckbox.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? InputCheckbox.globalClassNames[globalTheme] || {}
            : {};

        const globalColors = globalTheme
            ? InputCheckbox.globalColors[globalTheme] || {}
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
            root: mergeStyles(globalStyles.root, customStyles.root, style)
        };

        const mergedClassNames = {
            root: mergeClassNames(
                resetClassNames.root,
                componentClassNames.root,
                globalClassNames.root,
                customClassNames.root,
                className
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
            )
        };

        return (
            <span style={mergedStyles.root} className={mergedClassNames.root}>
                <input
                    type={'checkbox'}
                    id={id}
                    name={name}
                    value={value}
                    checked={value !== ''}
                    onChange={onChangeHandler}
                    className={mergedClassNames.input}
                />
                <label htmlFor={id} className={mergedClassNames.label}>
                    {label}
                </label>
            </span>
        );
    }
}

/**
 * @typedef inputCheckboxPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [value=''] - Input value.
 * @property {boolean} [checked=null] - Input checked attribute.
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
 * @description A beautiful checkbox input component.
 * @param {inputCheckboxPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
const InputCheckbox: CallableObj = function InputCheckbox(
    props: ExternalProps
) {
    return (
        <InputRenderer
            inputRenderFn={(rendererParams) => {
                return (
                    <InputCheckboxInternal
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

InputCheckbox.globalStyles = {
    default: {
        root: {},
        img: {}
    }
};

InputCheckbox.globalClassNames = {
    default: {
        root: '',
        img: ''
    }
};

InputCheckbox.globalColors = {
    default: {}
};

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
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    customColors: {},
    globalTheme: 'default'
};

export {InputCheckbox};
