/** @flow */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {withSophistication} from '../../hocs/with-sophistication.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import type {InputPluginType, StatusType} from '../../utils/input-renderer.js';
import componentClassNames from './index.module.scss';
import {styles} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

// TODO: RESET BROWSERS AUTOFILL STYLES.
// TODO: ADD focusColor SUPPORT.

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

const InputTextInternal = withSophistication(
    styles,
    true
)(
    class InputTextInternal extends React.Component<InputTextInternalProps> {
        constructor(props: InputTextInternalProps) {
            super(props);

            if (props.type === 'radio' || props.type === 'checkbox') {
                props.type = 'text';
            }
        }

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
                }
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
    plugins: InputPluginType,
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
