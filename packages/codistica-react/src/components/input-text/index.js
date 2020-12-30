/** @flow */

/** @module react/components/input-text */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {withSophistication} from '../../hocs/with-sophistication.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import type {PluginType, StatusType} from '../../utils/input-renderer.js';
import componentClassNames from './index.module.scss';
import {styles} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

// TODO: RESET BROWSERS AUTOFILL STYLES.

type CommonProps = {
    name: string,
    label: string,
    value: string,
    type: string,
    placeholder: string,
    onKeyDown: null | ((...args: Array<any>) => any),
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InputTextInternalProps = {
    ...CommonProps,
    id: string,
    status: StatusType,
    getSophistication: (...args: Array<any>) => {[string]: string}
};

/**
 * @typedef inputTextInternalPropsType
 * @property {string} id - Input ID.
 * @property {('valid'|'invalid'|'highlight'|'warning'|'missing'|'standBy'|null)} status - Input status.
 */

const InputTextInternal = withSophistication(
    styles,
    true
)(
    /**
     * @classdesc A beautiful text input component (Internal).
     */
    class InputTextInternal extends React.Component<InputTextInternalProps> {
        /**
         * @description Constructor.
         * @param {(inputTextPropsType|inputTextInternalPropsType)} [props] - Component props.
         */
        constructor(props: InputTextInternalProps) {
            super(props);

            if (props.type === 'radio' || props.type === 'checkbox') {
                props.type = 'text';
            }
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
                value,
                type,
                placeholder,
                status,
                style,
                className,
                customStyles,
                customClassNames,
                customColors,
                globalTheme,
                onKeyDown,
                onChange,
                onBlur,
                getSophistication,
                ...other
            } = this.props;

            const globalStyles = globalTheme
                ? InputText.globalStyles[globalTheme] || {}
                : {};

            const globalClassNames = globalTheme
                ? InputText.globalClassNames[globalTheme] || {}
                : {};

            const globalColors = globalTheme
                ? InputText.globalColors[globalTheme] || {}
                : {};

            const jssClassNames = getSophistication({
                status,
                customColors: {
                    ...globalColors,
                    ...customColors
                },
                customStyles
            });

            const mergedStyles = {
                root: mergeStyles(globalStyles.root, customStyles.root, style),
                input: mergeStyles(globalStyles.input, customStyles.input),
                label: mergeStyles(globalStyles.label, customStyles.label)
            };

            const mergedClassNames = {
                root: mergeClassNames(
                    resetClassNames.greedy,
                    componentClassNames.root,
                    globalClassNames.root,
                    customClassNames.root,
                    className
                ),
                input: mergeClassNames(
                    [
                        componentClassNames.blink,
                        status === 'highlight' || status === 'warning'
                    ],
                    componentClassNames.input,
                    globalClassNames.input,
                    customClassNames.input,
                    jssClassNames.input
                ),
                label: mergeClassNames(
                    globalClassNames.label,
                    customClassNames.label
                )
            };

            return (
                <span
                    style={mergedStyles.root}
                    className={mergedClassNames.root}>
                    <input
                        {...other}
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onKeyDown={onKeyDown}
                        onChange={onChange}
                        onBlur={onBlur}
                        style={mergedStyles.input}
                        className={mergedClassNames.input}
                    />
                    <label
                        htmlFor={id}
                        style={mergedStyles.label}
                        className={mergedClassNames.label}>
                        {label || name}
                    </label>
                </span>
            );
        }
    }
);

type InputTextProps = {
    ...CommonProps,
    voidValue: string | null,
    mandatory: boolean,
    keepMissingStatus: boolean,
    match: string | null,
    errorMessages: {
        mandatory?: string | null,
        match?: string | null
    },
    plugins: PluginType,
    deferValidation: boolean,
    onValidationResult: null | ((...args: Array<any>) => any)
};

type GlobalStyles = {
    [string]: CustomStyles
};

type GlobalClassNames = {
    [string]: CustomClassNames
};

type GlobalColors = {
    [string]: CustomColors
};

/**
 * @typedef inputTextErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [mandatory=null] - Mandatory error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [match=null] - Match error message.
 */

/**
 * @typedef inputTextPropsType
 * @property {string} name - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [value=''] - Input value.
 * @property {(string|null)} [voidValue=''] - Value to consider input to be void.
 * @property {string} [type='text'] - Input type.
 * @property {string} [placeholder=''] - Input placeholder.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {boolean} [keepMissingStatus=false] - Keep missing status after user interaction.
 * @property {(string|null)} [match=null] - Name of input that has to be matched to correctly validate.
 * @property {inputTextErrorMessagesType} [errorMessages] - Validation error messages.
 * @property {*} [plugins=[]] - Input plugins.
 * @property {boolean} [deferValidation=true] - Defer input validation until there is an interaction.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onKeyDown=null] - Callback for keyDown event.
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
function InputText(props: InputTextProps) {
    const {
        name,
        value,
        voidValue,
        type,
        mandatory,
        keepMissingStatus,
        match,
        errorMessages,
        plugins,
        deferValidation,
        onValidationResult,
        onKeyDown,
        onChange,
        onBlur,
        ...other
    } = props;
    return (
        <InputRenderer
            name={name}
            value={value}
            voidValue={voidValue}
            mandatory={mandatory}
            keepMissingStatus={keepMissingStatus}
            match={match}
            errorMessages={errorMessages}
            plugins={plugins}
            deferValidation={deferValidation}
            onValidationResult={onValidationResult}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onBlur={onBlur}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                return (
                    <InputTextInternal
                        {...other}
                        name={inputProps.name}
                        type={type}
                        id={inputProps.id}
                        value={inputProps.value}
                        onKeyDown={inputProps.onKeyDown}
                        onChange={inputProps.onChange}
                        onBlur={inputProps.onBlur}
                        status={inputRendererAPI.status}
                    />
                );
            }}
        />
    );
}

InputText.defaultProps = {
    label: '',
    value: '',
    voidValue: '',
    type: 'text',
    placeholder: '',
    mandatory: true,
    keepMissingStatus: false,
    match: null,
    errorMessages: {
        mandatory: null,
        match: null
    },
    plugins: [],
    deferValidation: true,
    onValidationResult: null,
    onKeyDown: null,
    onChange: null,
    onBlur: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    customColors: {},
    globalTheme: 'default'
};

InputText.globalStyles = ({
    default: {
        root: {},
        input: {},
        label: {}
    }
}: GlobalStyles);

InputText.globalClassNames = ({
    default: {
        root: '',
        input: '',
        label: ''
    }
}: GlobalClassNames);

InputText.globalColors = ({
    default: {}
}: GlobalColors);

export {InputText};
