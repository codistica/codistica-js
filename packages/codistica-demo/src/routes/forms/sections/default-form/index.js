/** @flow */

import {Form, inputPresets, inputValidators} from '@codistica/react';
import {
    Checkbox,
    DatePicker,
    RadioGroup,
    TextField,
    TextFieldSelect,
    TextFieldPassword,
    Switch
} from '@codistica/react-mui';
import {Button, FormLabel} from '@material-ui/core';
import React, {useState, useRef} from 'react';
import {Section} from '../../../../components/section/index.js';
import countriesData from '../../../../data/countries.json';
import componentClassNames from './index.module.scss';

const category = 'DEMO';
const title = 'Form Validation Tools';
const description = 'TODO.';

const countries = countriesData.map(({name}) => ({value: name, label: name}));

countries.unshift({
    value: '',
    label: 'Select Your Country'
});

const colors = new Set([
    'red',
    'green',
    'blue',
    'yellow',
    'pink',
    'gray',
    'black',
    'white',
    'purple',
    'orange',
    'cyan',
    'magenta',
    'brown'
]);

const colorsAsyncMockValidator = function colorsAsyncMockValidator(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(colors.has(value.toLowerCase()));
        }, 2000);
    });
};

/**
 * @description Default form section.
 * @returns {Object<string,*>} Section.
 */
function DefaultForm() {
    const [validationResult, setValidationResult] = useState(false);
    const formInstanceRef = useRef(null);
    return (
        <Section category={category} title={title} description={description}>
            <Form
                className={componentClassNames.form}
                onValidationResult={(result) => setValidationResult(result)}
                onMount={(formInstance) =>
                    (formInstanceRef.current = formInstance)
                }>
                <TextField
                    variant={'outlined'}
                    name={'firstName'}
                    label={'First Name'}
                    plugins={inputPresets.prettifyPreset}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <TextField
                    variant={'outlined'}
                    name={'lastName'}
                    label={'Last Name'}
                    plugins={inputPresets.prettifyPreset}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <DatePicker
                    inputVariant={'outlined'}
                    name={'birthday'}
                    label={'Date of birth'}
                    placeholder={'Click to select date'}
                    format={'DD/MM/YYYY'}
                    views={['year', 'month', 'date']}
                    openTo={'year'}
                    disableFuture={true}
                    clearable={true}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <TextField
                    variant={'outlined'}
                    name={'colorA'}
                    label={'Color A'}
                    placeholder={'Color name async validation'}
                    plugins={inputValidators.asyncValidator({
                        asyncValidator: colorsAsyncMockValidator,
                        errorMessages: {
                            asyncValidator: 'Not valid. Sorry!'
                        },
                        successMessages: {
                            asyncValidator: 'Valid. Great!'
                        },
                        standByMessages: {
                            asyncValidator: 'Verifying...'
                        }
                    })}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <TextField
                    variant={'outlined'}
                    name={'colorB'}
                    label={'Color B'}
                    placeholder={'Color name async validation'}
                    match={'!colorA'}
                    plugins={inputValidators.asyncValidator({
                        asyncValidator: colorsAsyncMockValidator,
                        errorMessages: {
                            asyncValidator: 'Not valid. Sorry!'
                        },
                        successMessages: {
                            asyncValidator: 'Valid. Great!'
                        },
                        standByMessages: {
                            asyncValidator: 'Verifying...'
                        }
                    })}
                    errorMessages={{
                        mandatory: 'This field is mandatory.',
                        match: 'Must be different from above input.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <TextField
                    variant={'outlined'}
                    name={'email'}
                    label={'Email'}
                    type={'email'}
                    plugins={inputPresets.emailPreset({
                        username: /^\w+\.\w+$/,
                        domains: ['codistica.com'],
                        errorMessages: {
                            generic: 'Please check this field:',
                            format: '- Invalid email address.',
                            username: '- Use name.surname format.',
                            domains:
                                '- You must use a codistica.com email address.'
                        }
                    })}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <FormLabel
                    component={'legend'}
                    className={componentClassNames.formLabel}>
                    {'Gender'}
                </FormLabel>
                <RadioGroup
                    name={'gender'}
                    radios={{
                        male: 'Male',
                        female: 'Female',
                        undisclosed: 'Undisclosed'
                    }}
                    plugins={inputValidators.wordValidator({
                        valid: ['male', 'female'],
                        invalid: ['undisclosed'],
                        errorMessages: {
                            generic: 'Please check this field.'
                        }
                    })}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.radioGroup
                    }}
                />

                <TextFieldPassword
                    variant={'outlined'}
                    name={'password'}
                    label={'Password'}
                    plugins={inputPresets.passwordPreset({
                        errorMessages: {
                            generic: 'Please check this field:',
                            length: (params) =>
                                `- Password must be ${params.min}-${params.max} characters long.`,
                            numbers: '- Password must have at least 1 number',
                            lowercases:
                                '- Password must have at least 1 lowercase letter.',
                            uppercases:
                                '- Password must have at least 1 uppercase letter.',
                            specials:
                                '- Password must have at least 1 special character.'
                        }
                    })}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <TextFieldPassword
                    variant={'outlined'}
                    name={'repeatPassword'}
                    label={'Repeat Password'}
                    match={'password'}
                    errorMessages={{
                        mandatory: 'This field is mandatory.',
                        match: 'Passwords do not match.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <TextFieldSelect
                    variant={'outlined'}
                    name={'country'}
                    label={'Country'}
                    options={countries}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.text
                    }}
                />

                <Checkbox
                    name={'privacyTerms'}
                    label={'I accept Privacy Terms ad Conditions.'}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.checkbox
                    }}
                />

                <Checkbox
                    name={'serviceTerms'}
                    label={'I accept Service Terms and Conditions.'}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.checkbox
                    }}
                />

                <Switch
                    name={'switch1'}
                    label={'I am a switch.'}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.switch
                    }}
                />

                <Switch
                    name={'switch2'}
                    label={'I am another switch.'}
                    errorMessages={{
                        mandatory: 'This field is mandatory.'
                    }}
                    containerProps={{
                        className: componentClassNames.switch
                    }}
                />

                <span className={componentClassNames.buttonsWrapper}>
                    <span
                        onClick={() => {
                            if (!validationResult && formInstanceRef.current) {
                                formInstanceRef.current.warnInvalids();
                            }
                        }}>
                        <Button
                            variant={'contained'}
                            disabled={!validationResult}
                            onClick={() => {
                                if (formInstanceRef.current) {
                                    formInstanceRef.current.submit(() =>
                                        alert('SUBMIT')
                                    );
                                }
                            }}>
                            {'SUBMIT'}
                        </Button>
                    </span>
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            if (formInstanceRef.current) {
                                formInstanceRef.current.clear();
                            }
                        }}>
                        {'CLEAR'}
                    </Button>
                </span>
            </Form>
        </Section>
    );
}

export {DefaultForm};
