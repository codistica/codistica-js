/** @flow */

import {stringify} from '@codistica/core';
import React from 'react';
import {
    Button,
    Form,
    InputText,
    InputCheckbox,
    InputRadioGroup,
    inputPresets,
    inputValidators,
    mergeClassNames
} from '../../../../../src/index.js';
import type {FormValidationObjectType} from '../../../../../src/index.js';
import componentClassNames from './index.module.scss';

type Props = {};

type State = {
    blinkForm: boolean,
    validationResult: boolean,
    dataPayload: {[string]: any},
    formValidationObject: FormValidationObjectType
};

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

const colorsAsyncMockValidator = async function colorsAsyncMockValidator(
    value
) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(colors.has(value.toLowerCase()));
        }, 2000);
    });
};

class DemoClass extends React.Component<Props, State> {
    formInstance: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            blinkForm: false,
            validationResult: false,
            dataPayload: {},
            formValidationObject: {}
        };

        this.formInstance = null;

        // BIND METHODS
        (this: any).onValidationResultHandler =
            this.onValidationResultHandler.bind(this);
        (this: any).blinkForm = this.blinkForm.bind(this);
    }

    onValidationResultHandler(
        validationResult: boolean,
        dataPayload: {[string]: string | Array<string>},
        validationObject: FormValidationObjectType
    ) {
        this.setState({
            validationResult,
            dataPayload,
            formValidationObject: validationObject
        });
    }

    blinkForm() {
        if (!this.state.blinkForm) {
            this.setState({
                blinkForm: true
            });
            setTimeout(() => {
                this.setState({
                    blinkForm: false
                });
            }, 1000);
        }
    }

    render() {
        const rootClassNames = mergeClassNames(
            componentClassNames.form,
            [componentClassNames.valid, this.state.validationResult],
            [componentClassNames.invalid, !this.state.validationResult],
            [componentClassNames.blink, this.state.blinkForm]
        );

        return (
            <div>
                <Form
                    onValidationResult={this.onValidationResultHandler}
                    onMount={(formInstance) => {
                        this.formInstance = formInstance;
                    }}
                    customClassNames={{
                        root: rootClassNames
                    }}>
                    <InputText
                        placeholder={'First Name'}
                        name={'firstName'}
                        plugins={inputPresets.prettifyPreset}
                        errorMessages={{
                            mandatory: 'This field is mandatory.'
                        }}
                    />

                    <InputText
                        placeholder={'Last Name (optional)'}
                        name={'lastName'}
                        plugins={inputPresets.prettifyPreset}
                        mandatory={false}
                    />

                    <InputText
                        placeholder={'Color name async validation'}
                        name={'colorA'}
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
                    />

                    <InputText
                        placeholder={'Color name async validation'}
                        name={'colorB'}
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
                    />

                    <InputText
                        placeholder={'Birthday (+18) (day/month/year)'}
                        name={'birthday'}
                        plugins={inputValidators.dateValidator({
                            minAge: 18,
                            separator: '/',
                            minDate: new Date(1900, 1, 0),
                            errorMessages: {
                                generic: 'Please check this field:',
                                format: '- Expected format is: "dd/mm/yyyy".',
                                separator: '- Use "/" as separator.',
                                minAge: '- Min age is 18.'
                            }
                        })}
                        errorMessages={{
                            mandatory: 'This field is mandatory.'
                        }}
                    />

                    <InputText
                        placeholder={'Email'}
                        name={'email'}
                        plugins={inputPresets.emailPreset({
                            errorMessages: {
                                generic: 'Please insert a valid email address.'
                            }
                        })}
                        errorMessages={{
                            mandatory: 'This field is mandatory.'
                        }}
                    />

                    <InputText
                        placeholder={'Password (strong)'}
                        name={'password'}
                        type={'password'}
                        plugins={inputPresets.passwordPreset({
                            errorMessages: {
                                generic: 'Please check this field:',
                                length: (params) =>
                                    `- Password must be ${params.min}-${params.max} characters long.`,
                                numbers:
                                    '- Password must have at least 1 number',
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
                    />

                    <InputText
                        placeholder={'Repeat Password'}
                        name={'repeatPassword'}
                        type={'password'}
                        match={'password'}
                        errorMessages={{
                            mandatory: 'This field is mandatory.',
                            match: 'Passwords do not match.'
                        }}
                    />

                    <div>
                        <span
                            className={componentClassNames.checkboxesContainer}>
                            <span>
                                <InputCheckbox
                                    name={'checks:1'}
                                    mandatory={false}
                                />
                                <span
                                    className={componentClassNames.inputTitle}>
                                    {'Check 1 (optional)'}
                                </span>
                            </span>
                            <span>
                                <InputCheckbox
                                    name={'checks:2'}
                                    errorMessages={{
                                        mandatory: 'This field is mandatory.'
                                    }}
                                />
                                <span
                                    className={componentClassNames.inputTitle}>
                                    {'Check 2'}
                                </span>
                            </span>
                            <span>
                                <InputCheckbox
                                    name={'checks:3'}
                                    errorMessages={{
                                        mandatory: 'This field is mandatory.'
                                    }}
                                />
                                <span
                                    className={componentClassNames.inputTitle}>
                                    {'Check 3'}
                                </span>
                            </span>
                        </span>
                    </div>

                    <div>
                        <InputRadioGroup
                            name={'radioGroup'}
                            radios={{
                                radio1: 'Radio 1',
                                radio2: 'Radio 2 (correct)',
                                radio3: 'Radio 3'
                            }}
                            plugins={inputValidators.wordValidator({
                                valid: ['radio2'],
                                invalid: ['radio1', 'radio3'],
                                errorMessages: {
                                    generic: 'Please check this field.'
                                }
                            })}
                            errorMessages={{
                                mandatory: 'This field is mandatory.'
                            }}
                        />
                    </div>

                    <Button
                        title={'SUBMIT'}
                        disabled={!this.state.validationResult}
                        onClickEnabled={() => {
                            if (this.formInstance) {
                                this.formInstance.submit((validationResult) => {
                                    if (validationResult) {
                                        this.blinkForm();
                                    }
                                });
                            }
                        }}
                        onClickDisabled={() => {
                            if (this.formInstance) {
                                this.formInstance.warnInvalids();
                            }
                        }}
                        style={{marginTop: '30px'}}
                    />
                </Form>

                <div className={componentClassNames.infoContainer}>
                    <div className={componentClassNames.infoBox}>
                        <h5>{'[DATA PAYLOAD]'}</h5>
                        {listDataPayload(this.state.dataPayload)}
                    </div>

                    <div className={componentClassNames.infoBox}>
                        <h5>{'[VALIDATION MESSAGES]'}</h5>
                        {listMessages(this.state.formValidationObject)}
                    </div>

                    <div className={componentClassNames.infoBox}>
                        <h5>{'[VALIDATION REPORT]'}</h5>
                        {listReports(this.state.formValidationObject)}
                    </div>

                    <div className={componentClassNames.infoBox}>
                        <h5>{'[VALIDATION DATA]'}</h5>
                        {listData(this.state.formValidationObject)}
                    </div>
                </div>
            </div>
        );
    }
}

function listDataPayload(dataPayload) {
    let output = [];
    let index = 0;
    for (const i in dataPayload) {
        if (!Object.prototype.hasOwnProperty.call(dataPayload, i)) {
            continue;
        }
        output.push(<span key={index}>{`${i}: ${dataPayload[i]}`}</span>);
        index++;
    }
    return output;
}

function listMessages(formValidationObject: FormValidationObjectType) {
    let output = [];
    let index = 0;
    for (const inputName in formValidationObject) {
        if (
            !Object.prototype.hasOwnProperty.call(
                formValidationObject,
                inputName
            )
        ) {
            continue;
        }
        output.push(<h5 key={index + ':'}>{inputName}</h5>);
        index++;
        formValidationObject[inputName].messages.forEach((msg) => {
            output.push(<span key={index}>{msg.message}</span>);
            index++;
        });
    }
    return output;
}

function listReports(formValidationObject: FormValidationObjectType) {
    let output = [];
    let index = 0;
    for (const inputName in formValidationObject) {
        if (
            !Object.prototype.hasOwnProperty.call(
                formValidationObject,
                inputName
            )
        ) {
            continue;
        }
        output.push(<h5 key={index}>{inputName + ':'}</h5>);
        index++;
        const reports = formValidationObject[inputName].reports;
        for (const validatorName in reports) {
            if (!Object.prototype.hasOwnProperty.call(reports, validatorName)) {
                continue;
            }
            output.push(<h5 key={index}>{' ' + validatorName + ':'}</h5>);
            index++;
            const report = reports[validatorName];
            for (const reportItemName in report) {
                if (
                    !Object.prototype.hasOwnProperty.call(
                        report,
                        reportItemName
                    )
                ) {
                    continue;
                }
                output.push(
                    <span key={index}>{`${'  ' + reportItemName}: ${stringify(
                        report[reportItemName]
                    )}`}</span>
                );
                index++;
            }
        }
    }
    return output;
}

function listData(formValidationObject: FormValidationObjectType) {
    let output = [];
    let index = 0;
    for (const inputName in formValidationObject) {
        if (
            !Object.prototype.hasOwnProperty.call(
                formValidationObject,
                inputName
            )
        ) {
            continue;
        }
        output.push(<h5 key={index}>{inputName + ':'}</h5>);
        index++;
        const data = formValidationObject[inputName].data;
        for (const validatorName in data) {
            if (!Object.prototype.hasOwnProperty.call(data, validatorName)) {
                continue;
            }
            output.push(<h5 key={index}>{' ' + validatorName + ':'}</h5>);
            index++;
            const dataSet = data[validatorName];
            for (const dataSetItemKey in dataSet) {
                if (
                    !Object.prototype.hasOwnProperty.call(
                        dataSet,
                        dataSetItemKey
                    )
                ) {
                    continue;
                }
                output.push(
                    <span key={index}>{`${'  ' + dataSetItemKey}: ${stringify(
                        dataSet[dataSetItemKey]
                    )}`}</span>
                );
                index++;
            }
        }
    }
    return output;
}

function Demo() {
    return <DemoClass />;
}

export {Demo};
