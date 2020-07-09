/** @flow */

/** @module react/mui-components/mui-text-field-select */

import {
    MenuItem,
    TextField,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import React from 'react';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import type {PluginType} from '../../utils/input-renderer.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import {useStyles} from './index.styles.js';

type Props = {
    name: string,
    value: string,
    voidValue: string,
    options: Array<{value: string, label: string}>,
    containerProps: {[string]: any},
    required: boolean,
    keepMissingStatus: boolean,
    match: string | null,
    errorMessages: {
        mandatory?: string | null,
        match?: string | null
    },
    plugins: PluginType,
    deferValidation: boolean,
    onValidationResult: null | ((...args: Array<any>) => any),
    onKeyDown: null | ((...args: Array<any>) => any),
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    classes: {[string]: string}
};

MUITextFieldSelect.defaultProps = {
    value: '',
    voidValue: '',
    options: [],
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
 * @description Material UI input text field select component.
 * @param {Object<string,*>} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function MUITextFieldSelect(props: Props) {
    const {
        name,
        value,
        voidValue,
        options,
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
            deferValidation={deferValidation}
            plugins={plugins}
            onValidationResult={onValidationResult}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onBlur={onBlur}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                const error = inputRendererAPI.status === 'invalid';
                return (
                    <FormControl {...containerProps} error={error}>
                        <TextField
                            {...other}
                            name={inputProps.name}
                            select={true}
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
                            }}>
                            {options.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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

export {MUITextFieldSelect};
