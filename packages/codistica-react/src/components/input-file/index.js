/** @flow */

import React, {useRef} from 'react';
import type {Node} from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {lengthValidator} from '../../plugins/input-validators/index.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import type {InputPluginType, StatusType} from '../../utils/input-renderer.js';
import componentClassNames from './index.module.scss';
import {useSophistication} from './index.sophistication.js';
import type {
    CustomColors,
    CustomStyles,
    CustomClassNames,
    GlobalCustomClassNames,
    GlobalCustomStyles
} from './index.sophistication.js';

type CommonProps = {
    name: string,
    label: string,
    accept: string | null,
    capture: string | boolean | null,
    placeholder: string,
    onChange: ((SyntheticInputEvent<HTMLInputElement>) => void) | null,
    onBlur: ((SyntheticFocusEvent<HTMLInputElement>) => void) | null,
    className: string,
    customColors: CustomColors,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    style: $Shape<CSSStyleDeclaration> | null,
    globalTheme: 'default' | string | null,
    children: Node | null
};

type InputFileInternalProps = {
    ...CommonProps,
    id: string,
    status: StatusType,
    currentValue: {
        files: FileList,
        value: string
    } | null
};

function InputFileInternal({
    placeholder,
    name,
    id,
    label,
    accept,
    capture,
    onChange,
    status,
    customColors,
    customStyles,
    customClassNames,
    globalTheme,
    className,
    style,
    children,
    currentValue,
    ...other
}: InputFileInternalProps) {
    const {files, value} = currentValue || {files: null, value: ''};
    const currentFile = files ? files[0] : null;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const labelIsHidden = !(customStyles.label || customClassNames.label);

    const globalStyles = globalTheme
        ? InputFile.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? InputFile.globalClassNames[globalTheme] || {}
        : {};

    const globalColors = globalTheme
        ? InputFile.globalColors[globalTheme] || {}
        : {};

    const jssClassName = useSophistication({
        status,
        customColors: {
            ...globalColors,
            ...customColors
        },
        customStyles
    });

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style),
        textContainer: mergeStyles(
            [customStyles.placeholder, !currentFile],
            customStyles.text,
            style
        ),
        label: mergeStyles(globalStyles.label, customStyles.label, style),
        input: mergeStyles(globalStyles.input, customStyles.input, style)
    };

    const mergedClassNames = {
        root: mergeClassNames(
            [
                componentClassNames.blink,
                status === 'highlight' || status === 'warning'
            ],
            resetClassNames.greedy,
            componentClassNames.root,
            globalClassNames.root,
            customClassNames.root,
            jssClassName.root,
            className
        ),
        contentContainer: mergeClassNames(componentClassNames.contentContainer),
        textContainer: mergeClassNames(
            componentClassNames.textContainer,
            [componentClassNames.placeholder, !currentFile],
            [customClassNames.placeholder, !currentFile],
            customClassNames.text
        ),
        label: mergeClassNames(
            globalClassNames.label,
            customClassNames.label,
            className
        ),
        input: mergeClassNames(
            componentClassNames.input,
            globalClassNames.label,
            customClassNames.label,
            className
        )
    };

    return (
        <span style={mergedStyles.root} className={mergedClassNames.root}>
            <div className={mergedClassNames.contentContainer}>
                <span
                    style={mergedStyles.textContainer}
                    className={mergedClassNames.textContainer}>
                    {currentFile ? currentFile.name : placeholder}
                </span>
                {children}
            </div>
            <input
                {...other}
                value={value}
                multiple={false}
                ref={inputRef}
                type={'file'}
                name={name}
                id={id}
                accept={accept}
                capture={capture}
                style={mergedStyles.input}
                className={mergedClassNames.input}
                onChange={onChange}
            />
            <label
                hidden={labelIsHidden}
                htmlFor={id}
                style={mergedStyles.label}
                className={mergedClassNames.label}>
                {label || name}
            </label>
        </span>
    );
}

type InputFilePropsType = {
    ...CommonProps,
    value: string,
    files: FileList | null,
    accept: string | null,
    mandatory: boolean,
    keepMissingStatus: boolean,
    match: string | null,
    errorMessages: {
        mandatory?: string | ((any) => string | null) | {[string]: any} | null,
        match?: string | ((any) => string | null) | {[string]: any} | null
    },
    plugins: InputPluginType,
    deferValidation: boolean,
    onValidationResult: null | ((...args: Array<any>) => any)
};

type GlobalStyles = {
    [string]: GlobalCustomStyles
};

type GlobalClassNames = {
    [string]: GlobalCustomClassNames
};

type GlobalColors = {
    [string]: CustomColors
};

InputFile.defaultProps = {
    value: '',
    label: '',
    accept: null,
    files: null,
    capture: null,
    mandatory: true,
    placeholder: 'No file chosen',
    keepMissingStatus: false,
    match: null,
    errorMessages: {
        mandatory: null,
        match: null
    },
    plugins: [],
    deferValidation: true,
    onValidationResult: null,
    onChange: null,
    onBlur: null,
    style: null,
    className: '',
    customColors: {},
    customClassNames: {},
    customStyles: {},
    globalTheme: 'default',
    children: null
};

InputFile.globalStyles = ({
    default: {
        root: null,
        label: null,
        input: null
    }
}: GlobalStyles);

InputFile.globalClassNames = ({
    default: {
        root: ''
    }
}: GlobalClassNames);

InputFile.globalColors = ({
    default: {
        root: {}
    }
}: GlobalColors);

function InputFile(props: InputFilePropsType): React$Element<any> {
    const {
        name,
        value,
        files,
        mandatory,
        keepMissingStatus,
        match,
        errorMessages,
        plugins,
        deferValidation,
        onValidationResult,
        onChange,
        onBlur,
        children,
        ...other
    } = props;

    const pluginArray = Array.isArray(plugins) ? plugins : [plugins];
    const mergedPlugins: Array<InputPluginType> = [
        lengthValidator({
            minLength: 1
        }),
        ...pluginArray
    ];

    return (
        <InputRenderer
            name={name}
            value={{
                files: files,
                value: value
            }}
            mandatory={mandatory}
            keepMissingStatus={keepMissingStatus}
            match={match}
            errorMessages={errorMessages}
            plugins={mergedPlugins}
            deferValidation={deferValidation}
            onValidationResult={onValidationResult}
            onChange={onChange}
            onBlur={onBlur}
            stringifier={(val, callContext) => {
                if (callContext === 'form') {
                    return val.files;
                }
                if (callContext === 'validation') {
                    return val.value;
                }
                return val;
            }}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                return (
                    <InputFileInternal
                        {...other}
                        name={inputProps.name}
                        currentValue={inputProps.value}
                        onChange={(e) => {
                            const newValue = e.target.files
                                ? {
                                      files: e.target.files,
                                      value: e.target.value
                                  }
                                : null;
                            inputRendererAPI.setNewValue(newValue);
                            inputRendererAPI.setIsInteracted(true);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                        onBlur={inputProps.onBlur}
                        id={inputProps.id}
                        status={inputRendererAPI.status}>
                        {children}
                    </InputFileInternal>
                );
            }}
        />
    );
}

export {InputFile};
export type {InputFilePropsType};
