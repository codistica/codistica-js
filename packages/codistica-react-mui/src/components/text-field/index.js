/** @flow */

/** @module react-mui/components/text-field */

import {mergeClassNames, InputRenderer} from '@codistica/react';
import type {InputPluginType} from '@codistica/react';
import {
    TextField as MUITextField,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import React from 'react';
import {useStyles} from './index.styles.js';

type Props = {
    name: string,
    value: string,
    voidValue: string | null,
    type: string,
    containerProps: {[string]: any},
    required: boolean,
    keepMissingStatus: boolean,
    match: string | null,
    errorMessages: {
        mandatory?: string | null,
        match?: string | null
    },
    plugins: InputPluginType,
    deferValidation: boolean,
    onValidationResult: null | ((...args: Array<any>) => any),
    onKeyDown: null | ((...args: Array<any>) => any),
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    classes: {[string]: string}
};

TextField.defaultProps = {
    value: '',
    voidValue: '',
    type: 'text',
    containerProps: {},
    required: true,
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
    classes: {}
};

/**
 * @description Material UI text field component.
 * @param {Object<string,*>} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function TextField(props: Props) {
    const {
        name,
        value,
        voidValue,
        type,
        containerProps,
        required,
        keepMissingStatus,
        match,
        errorMessages,
        plugins,
        deferValidation,
        onValidationResult,
        onKeyDown,
        onChange,
        onBlur,
        classes,
        ...other
    } = props;

    const componentClasses = useStyles();

    return (
        <InputRenderer
            name={name}
            value={value}
            voidValue={voidValue}
            mandatory={required}
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
                const error = inputRendererAPI.status === 'invalid';
                return (
                    <FormControl {...containerProps} error={error}>
                        <MUITextField
                            {...other}
                            name={inputProps.name}
                            type={type}
                            value={inputProps.value}
                            onKeyDown={inputProps.onKeyDown}
                            onChange={inputProps.onChange}
                            onBlur={inputProps.onBlur}
                            error={error}
                            required={required}
                            classes={{
                                ...classes,
                                root: mergeClassNames(
                                    classes.root,
                                    componentClasses.root,
                                    componentClasses[
                                        inputRendererAPI.status || 'standBy'
                                    ]
                                )
                            }}
                        />
                        {inputRendererAPI.validationObject.messages.map(
                            (item, index) => (
                                <FormHelperText key={index}>
                                    {item.message}
                                </FormHelperText>
                            )
                        )}
                    </FormControl>
                );
            }}
        />
    );
}

export {TextField};
