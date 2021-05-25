/** @flow */

import {mergeClassNames, InputRenderer} from '@codistica/react';
import type {InputPluginType} from '@codistica/react';
import {
    IconButton,
    InputAdornment,
    TextField,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons';
import React, {useState} from 'react';
import {useStyles} from './index.styles.js';

type Props = {
    name: string,
    value: string,
    voidValue: string | null,
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

function TextFieldPassword(props: Props) {
    const {
        name,
        value,
        voidValue,
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

    const [showPassword, setShowPassword] = useState(false);
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
                        <TextField
                            {...other}
                            name={inputProps.name}
                            type={showPassword ? 'text' : 'password'}
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }>
                                            {showPassword ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
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

TextFieldPassword.defaultProps = {
    value: '',
    voidValue: '',
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

export {TextFieldPassword};
