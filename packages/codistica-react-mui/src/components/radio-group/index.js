/** @flow */

/** @module react-mui/components/radio-group */

import type {InputPluginType} from '@codistica/react';
import {mergeClassNames, InputRenderer} from '@codistica/react';
import {
    RadioGroup as MUIRadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import React from 'react';
import {useStyles} from './index.styles.js';

type Props = {
    name: string,
    radios: {[string]: string},
    radioProps: {[string]: any},
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
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    classes: {[string]: string}
};

RadioGroup.defaultProps = {
    radioProps: {},
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
 * @description Material UI radio group component.
 * @param {Object<string,*>} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function RadioGroup(props: Props) {
    const {
        name,
        radios,
        radioProps,
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
            value={''}
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
                        <MUIRadioGroup
                            {...other}
                            name={inputProps.name}
                            value={inputProps.value}
                            classes={{
                                ...classes,
                                root: mergeClassNames(
                                    classes.root,
                                    componentClasses.radioGroupRoot
                                )
                            }}>
                            {(() => {
                                let output = [];
                                let key = 0;
                                for (const radioValue in radios) {
                                    if (
                                        !Object.prototype.hasOwnProperty.call(
                                            radios,
                                            radioValue
                                        )
                                    ) {
                                        continue;
                                    }
                                    output.push(
                                        <FormControlLabel
                                            key={key}
                                            control={
                                                <Radio
                                                    {...radioProps}
                                                    name={inputProps.name}
                                                    value={radioValue}
                                                    onChange={
                                                        inputProps.onChange
                                                    }
                                                    onBlur={inputProps.onBlur}
                                                    error={error}
                                                    required={required}
                                                    classes={{
                                                        ...(radioProps.classes ||
                                                            {}),
                                                        root: mergeClassNames(
                                                            (
                                                                radioProps.classes ||
                                                                {}
                                                            ).root,
                                                            componentClasses.radioRoot,
                                                            componentClasses[
                                                                inputRendererAPI.status ||
                                                                    'standBy'
                                                            ]
                                                        )
                                                    }}
                                                />
                                            }
                                            label={radios[radioValue]}
                                        />
                                    );
                                    key++;
                                }
                                return output;
                            })()}
                        </MUIRadioGroup>
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

export {RadioGroup};
