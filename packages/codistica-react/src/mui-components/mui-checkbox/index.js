/** @flow */

/** @module react/mui-components/mui-checkbox */

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText
} from '@material-ui/core';
import React from 'react';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import type {PluginType} from '../../utils/input-renderer.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import {useStyles} from './index.styles.js';

type Props = {
    name: string,
    label: string,
    voidValue: string,
    checked: boolean,
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
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    classes: {[string]: string}
};

MUICheckbox.defaultProps = {
    label: '',
    voidValue: 'false',
    checked: false,
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
    onChange: null,
    onBlur: null,
    classes: {}
};

/**
 * @description Material UI checkbox component.
 * @param {Object<string,*>} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function MUICheckbox(props: Props) {
    const {
        name,
        label,
        voidValue,
        checked,
        containerProps,
        required,
        keepMissingStatus,
        match,
        errorMessages,
        plugins,
        deferValidation,
        onValidationResult,
        onChange,
        onBlur,
        classes,
        ...other
    } = props;

    const componentClasses = useStyles();

    return (
        <InputRenderer
            name={name}
            value={checked ? 'true' : 'false'}
            voidValue={voidValue}
            mandatory={required}
            keepMissingStatus={keepMissingStatus}
            match={match}
            errorMessages={errorMessages}
            plugins={plugins}
            deferValidation={deferValidation}
            onValidationResult={onValidationResult}
            onChange={onChange}
            onBlur={onBlur}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                const error = inputRendererAPI.status === 'invalid';
                return (
                    <FormControl {...containerProps} error={error}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...other}
                                    name={inputProps.name}
                                    checked={inputProps.value === 'true'}
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
                                                inputRendererAPI.status ||
                                                    'standBy'
                                            ]
                                        )
                                    }}
                                />
                            }
                            label={label}
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

export {MUICheckbox};
