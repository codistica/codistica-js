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

// TODO: ALLOW CHECKING BY CLICKING ON 'LABEL' (TITLE) TO MATCH NATIVE BEHAVIOR.

type CommonProps = {
    name: string,
    label: string,
    checked: boolean,
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InputCheckboxInternalProps = {
    ...CommonProps,
    id: string,
    status: StatusType,
    getSophistication: (...args: Array<any>) => {[string]: string}
};

const InputCheckboxInternal = withSophistication(
    styles,
    true
)(
    class InputCheckboxInternal extends React.Component<InputCheckboxInternalProps> {
        render() {
            const {
                id,
                name,
                label,
                checked,
                status,
                style,
                className,
                customStyles,
                customClassNames,
                customColors,
                globalTheme,
                onChange,
                onBlur,
                getSophistication
            } = this.props;

            const globalStyles = globalTheme
                ? InputCheckbox.globalStyles[globalTheme] || {}
                : {};

            const globalClassNames = globalTheme
                ? InputCheckbox.globalClassNames[globalTheme] || {}
                : {};

            const globalColors = globalTheme
                ? InputCheckbox.globalColors[globalTheme] || {}
                : {};

            const jssClassNames = getSophistication({
                status,
                customColors: {
                    ...globalColors,
                    ...customColors
                }
            });

            const mergedStyles = {
                root: mergeStyles(globalStyles.root, customStyles.root, style)
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
                <span
                    style={mergedStyles.root}
                    className={mergedClassNames.root}>
                    <input
                        type={'checkbox'}
                        id={id}
                        name={name}
                        checked={checked}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={mergedClassNames.input}
                    />
                    <label htmlFor={id} className={mergedClassNames.label}>
                        {label || name}
                    </label>
                </span>
            );
        }
    }
);

type InputCheckboxProps = {
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

function InputCheckbox(props: InputCheckboxProps) {
    const {
        name,
        checked,
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
            value={checked ? 'true' : 'false'}
            voidValue={'false'}
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
                    <InputCheckboxInternal
                        {...other}
                        name={inputProps.name}
                        id={inputProps.id}
                        checked={inputProps.value === 'true'}
                        onChange={inputProps.onChange}
                        onBlur={inputProps.onBlur}
                        status={inputRendererAPI.status}
                    />
                );
            }}
        />
    );
}

InputCheckbox.defaultProps = {
    label: '',
    checked: false,
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

InputCheckbox.globalStyles = ({
    default: {
        root: {}
    }
}: GlobalStyles);

InputCheckbox.globalClassNames = ({
    default: {
        root: ''
    }
}: GlobalClassNames);

InputCheckbox.globalColors = ({
    default: {}
}: GlobalColors);

export {InputCheckbox};
