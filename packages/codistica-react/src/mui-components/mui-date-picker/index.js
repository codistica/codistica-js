/** @flow */

/** @module react/mui-components/mui-date-picker */

import {default as MomentUtils} from '@date-io/moment';
import {FormControl, FormHelperText} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {default as moment} from 'moment';
import React, {useState} from 'react';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import type {PluginType} from '../../utils/input-renderer.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import {useStyles} from './index.styles.js';

type Props = {
    name: string,
    value: Date | null,
    voidValue: string,
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

MUIDatePicker.defaultProps = {
    value: null,
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

/**
 * @description Material UI text field component.
 * @param {Object<string,*>} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function MUIDatePicker(props: Props) {
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

    const [isOpen, setIsOpen] = useState(false);

    const componentClasses = useStyles();

    return (
        <InputRenderer
            name={name}
            value={(value && value.toString()) || ''}
            stringifier={(momentDate) =>
                momentDate ? momentDate.toISOString() : ''
            }
            parser={(str) => (str ? moment(str) : null)}
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
                const status = isOpen
                    ? null
                    : inputRendererAPI.status || 'standBy';
                const error = status === 'invalid';
                return (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <FormControl {...containerProps} error={error}>
                            <DatePicker
                                {...other}
                                name={inputProps.name}
                                value={inputProps.value}
                                onKeyDown={inputProps.onKeyDown}
                                onChange={inputProps.onChange}
                                onBlur={inputProps.onBlur}
                                onOpen={() => setIsOpen(true)}
                                onClose={() => setIsOpen(false)}
                                error={error}
                                required={required}
                                classes={{
                                    ...classes,
                                    root: mergeClassNames(
                                        classes.root,
                                        componentClasses.root,
                                        componentClasses[status]
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
                    </MuiPickersUtilsProvider>
                );
            }}
        />
    );
}

export {MUIDatePicker};
