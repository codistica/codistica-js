/** @flow */

import {composeFn} from '@codistica/core';
import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {withGetUniqueID} from '../../hocs/with-get-unique-id.js';
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

// TODO: ADD SUPPORT FOR DOUBLE CLICK/TOUCH TO UNCHECK. ADD SUPPORT FOR INITIALLY CHECKED
// TODO: ALLOW SELECTING BY CLICKING ON 'LABEL' (TITLE) TO MATCH NATIVE BEHAVIOR.

type CommonProps = {
    name: string,
    label: string,
    radios: {[string]: string},
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InputRadioGroupInternalProps = {
    ...CommonProps,
    id: string,
    value: string,
    status: StatusType,
    getUniqueID: (any) => string,
    getSophistication: (...args: Array<any>) => {[string]: string}
};

const hoc = composeFn(withGetUniqueID, withSophistication(styles, true));

const InputRadioGroupInternal = hoc(
    class InputRadioGroupInternal extends React.Component<InputRadioGroupInternalProps> {
        render() {
            const {
                name,
                label,
                radios,
                value,
                status,
                style,
                className,
                customStyles,
                customClassNames,
                customColors,
                globalTheme,
                onChange,
                onBlur,
                getUniqueID,
                getSophistication
            } = this.props;

            const globalStyles = globalTheme
                ? InputRadioGroup.globalStyles[globalTheme] || {}
                : {};

            const globalClassNames = globalTheme
                ? InputRadioGroup.globalClassNames[globalTheme] || {}
                : {};

            const globalColors = globalTheme
                ? InputRadioGroup.globalColors[globalTheme] || {}
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
                inputRow: mergeStyles(
                    globalStyles.inputRow,
                    customStyles.inputRow
                ),
                title: mergeStyles(globalStyles.title, customStyles.title),
                inputWrapper: mergeStyles(
                    globalStyles.inputWrapper,
                    customStyles.inputWrapper
                )
            };

            const mergedClassNames = {
                root: mergeClassNames(
                    resetClassNames.greedy,
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
                <span
                    style={mergedStyles.root}
                    className={mergedClassNames.root}>
                    {(() => {
                        let index = 0;
                        let subId = '';
                        let output = [];
                        for (const i in radios) {
                            if (
                                !Object.prototype.hasOwnProperty.call(radios, i)
                            ) {
                                continue;
                            }
                            subId = getUniqueID(i);
                            output.push(
                                <span
                                    key={index}
                                    style={mergedStyles.inputRow}
                                    className={mergedClassNames.inputRow}>
                                    <span
                                        style={mergedStyles.inputWrapper}
                                        className={
                                            mergedClassNames.inputWrapper
                                        }>
                                        <input
                                            id={subId}
                                            type={'radio'}
                                            name={name}
                                            value={i}
                                            checked={value === i}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={mergedClassNames.input}
                                        />
                                        <label
                                            htmlFor={subId}
                                            className={mergedClassNames.label}>
                                            {label || name}
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
);

type InputRadioGroupProps = {
    ...CommonProps,
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

function InputRadioGroup(props: InputRadioGroupProps) {
    const {
        name,
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
            value={''}
            mandatory={mandatory}
            keepMissingStatus={keepMissingStatus}
            match={match}
            errorMessages={errorMessages}
            plugins={plugins}
            deferValidation={deferValidation}
            onValidationResult={onValidationResult}
            onChange={onChange}
            onBlur={onBlur}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                return (
                    <InputRadioGroupInternal
                        {...other}
                        name={inputProps.name}
                        id={inputProps.id}
                        value={inputProps.value}
                        onChange={inputProps.onChange}
                        onBlur={inputProps.onBlur}
                        status={inputRendererAPI.status}
                    />
                );
            }}
        />
    );
}

InputRadioGroup.defaultProps = {
    label: '',
    radios: {},
    mandatory: true,
    keepMissingStatus: false,
    match: null,
    plugins: [],
    errorMessages: {
        mandatory: null,
        match: null
    },
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

InputRadioGroup.globalStyles = ({
    default: {
        root: {},
        inputRow: {},
        title: {},
        inputWrapper: {}
    }
}: GlobalStyles);

InputRadioGroup.globalClassNames = ({
    default: {
        root: '',
        inputRow: '',
        title: '',
        inputWrapper: ''
    }
}: GlobalClassNames);

InputRadioGroup.globalColors = ({
    default: {}
}: GlobalColors);

export {InputRadioGroup};
