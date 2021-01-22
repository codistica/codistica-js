/** @flow */

import {stringUtils} from '@codistica/core';
import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {createSophistication} from '../../hooks/create-sophistication.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import type {InputPluginType, StatusType} from '../../utils/input-renderer.js';
import {Button} from '../button/index.js';
import componentClassNames from './index.module.scss';
import {styles} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

// TODO: ADD remove (x) ON LIST.
// TODO: CREATE AD-HOC VALIDATOR WITH PER FILE VALIDATION SUPPORT.
// TODO: ADD maxFiles PROP.
// TODO: ADD InputFile.Preview? (COMPOUND COMPONENT)
// TODO: OR ADD PREVIEW TOOLTIP WHEN HOVER/TOUCH? (BOTH?)

type CommonProps = {
    name: string,
    buttonTitle: string,
    value: Array<File> | null,
    placeholder: string,
    accept: string,
    capture: string | typeof undefined,
    multiple: boolean,
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InputFileInternalProps = {
    ...CommonProps,
    id: string,
    status: StatusType
};

const useSophistication = createSophistication(styles);

function InputFileInternal(props: InputFileInternalProps) {
    const {
        id,
        name,
        buttonTitle,
        value,
        placeholder,
        accept,
        capture,
        multiple,
        status,
        style,
        className,
        customStyles,
        customClassNames,
        customColors,
        globalTheme,
        onChange,
        onBlur,
        ...other
    } = props;

    const globalStyles = globalTheme
        ? InputFile.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? InputFile.globalClassNames[globalTheme] || {}
        : {};

    const globalColors = globalTheme
        ? InputFile.globalColors[globalTheme] || {}
        : {};

    const jssClassNames = useSophistication({
        status,
        customColors: {
            ...globalColors,
            ...customColors
        }
    });

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style),
        button: mergeStyles(globalStyles.button, customStyles.button),
        list: mergeStyles(globalStyles.list, customStyles.list)
    };

    const blink = [
        componentClassNames.blink,
        status === 'highlight' || status === 'warning'
    ];

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.greedy,
            componentClassNames.root,
            globalClassNames.root,
            customClassNames.root,
            className
        ),
        input: mergeClassNames(componentClassNames.input, jssClassNames.input),
        button: mergeClassNames(
            blink,
            componentClassNames.button,
            jssClassNames.button,
            globalClassNames.button,
            customClassNames.button
        ),
        list: mergeClassNames(
            blink,
            componentClassNames.list,
            globalClassNames.list,
            customClassNames.list
        )
    };

    return (
        <span style={mergedStyles.root} className={mergedClassNames.root}>
            <input
                {...other}
                id={id}
                type={'file'}
                name={name}
                accept={accept}
                capture={capture}
                multiple={multiple}
                onChange={onChange}
                onBlur={onBlur}
                className={mergedClassNames.input}
            />
            <Button
                component={'label'}
                title={buttonTitle || name}
                htmlFor={id}
                style={mergedStyles.button}
                className={mergedClassNames.button}
            />
            <span style={mergedStyles.list} className={mergedClassNames.list}>
                {placeholder && !(value && value.length) ? (
                    <span>{placeholder}</span>
                ) : null}
                {value &&
                    value.map((file, index) => {
                        return (
                            <span key={index}>
                                {file.name +
                                    ' - ' +
                                    stringUtils.toDataStorageUnits(file.size)}
                            </span>
                        );
                    })}
            </span>
        </span>
    );
}

type InputFileProps = {
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

function InputFile(props: InputFileProps) {
    const {
        name,
        value,
        voidValue,
        mandatory,
        keepMissingStatus,
        match,
        errorMessages,
        plugins,
        deferValidation,
        onValidationResult,
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
            onBlur={onBlur}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                return (
                    <InputFileInternal
                        {...other}
                        name={inputProps.name}
                        id={inputProps.id}
                        value={inputProps.value}
                        onChange={(e) => {
                            inputRendererAPI.setNewValue(
                                Array.from(e.target.files)
                            );
                            inputRendererAPI.setIsInteracted(true);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                        onBlur={inputProps.onBlur}
                        status={inputRendererAPI.status}
                    />
                );
            }}
        />
    );
}

InputFile.defaultProps = {
    buttonTitle: '',
    value: null,
    voidValue: null,
    placeholder: '',
    accept: '*',
    capture: undefined,
    multiple: false,
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
    onChange: null,
    onBlur: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    customColors: {},
    globalTheme: 'default'
};

InputFile.globalStyles = ({
    default: {
        root: {},
        button: {},
        list: {}
    }
}: GlobalStyles);

InputFile.globalClassNames = ({
    default: {
        root: '',
        button: '',
        list: ''
    }
}: GlobalClassNames);

InputFile.globalColors = ({
    default: {}
}: GlobalColors);

export {InputFile};
