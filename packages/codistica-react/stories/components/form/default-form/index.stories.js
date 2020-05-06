/** @flow */

import {objectUtils} from '@codistica/core';
import {default as classNames} from 'classnames';
import React from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {
    Button,
    Form,
    InputText,
    InputCheckbox,
    InputRadio,
    inputPresets,
    inputValidators
} from '../../../../src/index.js';
import styles from './index.module.scss';

type Props = {};

type State = {
    isValid: boolean,
    isBlinkForm: boolean,
    reports: {[string]: any},
    dataPackage: {[string]: any}
};

/**
 * @classdesc Form demo.
 */
class DefaultForm extends React.Component<Props, State> {
    formInstance: any;

    /**
     * @description Constructor.
     * @param {Object<string,*>} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            isValid: false,
            isBlinkForm: false,
            reports: {},
            dataPackage: {}
        };

        this.formInstance = null;

        // BIND METHODS
        (this: Function).onValidationResultHandler = this.onValidationResultHandler.bind(
            this
        );
        (this: Function).blinkForm = this.blinkForm.bind(this);
    }

    /**
     * @instance
     * @description Handler for validationResult event.
     * @param {boolean} result - Form validation result.
     * @param {Object<string,*>} dataPackage - Form data.
     * @param {Object<string,*>} reports - Form validation reports.
     * @returns {void} Void.
     */
    onValidationResultHandler(
        result: boolean,
        dataPackage: {[string]: any},
        reports: {[string]: any}
    ) {
        this.setState({
            isValid: result,
            dataPackage,
            reports
        });
    }

    blinkForm() {
        if (!this.state.isBlinkForm) {
            this.setState({
                isBlinkForm: true
            });
            setTimeout(() => {
                this.setState({
                    isBlinkForm: false
                });
            }, 900);
        }
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const rootClassName = classNames({
            [styles.form]: true,
            [styles.isValid]: this.state.isValid,
            [styles.isInvalid]: !this.state.isValid,
            [styles.blinkingForm]: this.state.isBlinkForm
        });

        return (
            <div>
                <Form
                    className={rootClassName}
                    onValidationResult={this.onValidationResultHandler}
                    onMount={(formInstance) => {
                        this.formInstance = formInstance;
                    }}>
                    <InputText
                        placeholder={'Name'}
                        name={'name'}
                        presets={inputPresets.prettifyPreset}
                        plugins={inputValidators.presenceValidator}
                    />
                    <InputText
                        placeholder={'Surname (optional)'}
                        name={'surname'}
                        presets={inputPresets.prettifyPreset}
                        plugins={inputValidators.presenceValidator}
                        mandatory={false}
                    />
                    <InputText
                        placeholder={'Birthday (+18) (day/month/year)'}
                        name={'birthday'}
                        plugins={inputValidators.dateValidator({
                            minAge: 18,
                            separator: '/',
                            minDate: new Date(1900, 1, 0)
                        })}
                    />
                    <InputText
                        placeholder={'Email'}
                        name={'email'}
                        presets={inputPresets.emailPreset}
                    />
                    <InputText
                        placeholder={'Password (strong)'}
                        name={'password'}
                        type={'password'}
                        presets={inputPresets.passwordPreset}
                    />
                    <InputText
                        placeholder={'Repeat Password'}
                        name={'repeat_password'}
                        type={'password'}
                        match={'password'}
                    />
                    <div>
                        <span className={styles.checkboxesContainer}>
                            <span>
                                <InputCheckbox
                                    name={'check1'}
                                    value={'check1'}
                                    plugins={inputValidators.presenceValidator}
                                    mandatory={false}
                                />
                                <span className={styles.inputTitle}>
                                    Check 1 (Optional)
                                </span>
                            </span>
                            <span>
                                <InputCheckbox
                                    name={'check2'}
                                    value={'check2'}
                                    plugins={inputValidators.presenceValidator}
                                />
                                <span className={styles.inputTitle}>
                                    Check 2
                                </span>
                            </span>
                            <span>
                                <InputCheckbox
                                    name={'check3'}
                                    value={'check3'}
                                    plugins={inputValidators.presenceValidator}
                                />
                                <span className={styles.inputTitle}>
                                    Check 3
                                </span>
                            </span>
                        </span>
                    </div>
                    <div>
                        <InputRadio
                            name={'radioGroup'}
                            radios={{
                                radio1: 'Radio 1',
                                radio2: 'Radio 2 (Correct)',
                                radio3: 'Radio 3'
                            }}
                            plugins={{
                                type: 'validator',
                                plugin: 'radio2'
                            }}
                            containerStyle={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        />
                    </div>
                    <Button
                        style={{marginTop: '30px'}}
                        text={'SUBMIT'}
                        disabled={!this.state.isValid}
                        onClick={this.blinkForm}
                        onClickDisabled={() => {
                            this.formInstance &&
                                this.formInstance.warnInvalids();
                        }}
                    />
                </Form>

                <div className={styles.infoContainer}>
                    <div className={styles.infoBox}>
                        <h5>[DATA]</h5>
                        {(() => {
                            let output = [];
                            let index = 0;
                            for (const i in this.state.dataPackage) {
                                if (
                                    !Object.prototype.hasOwnProperty.call(
                                        this.state.dataPackage,
                                        i
                                    )
                                ) {
                                    continue;
                                }
                                output.push(
                                    <span
                                        key={
                                            index
                                        }>{`${i}: ${this.state.dataPackage[i]}`}</span>
                                );
                                index++;
                            }
                            return output;
                        })()}
                    </div>

                    <div className={styles.infoBox}>
                        <h5>[REPORTS]</h5>
                        {(() => {
                            let title = '';
                            let output = [];
                            let index = 0;
                            objectUtils.forEachSync(
                                this.state.reports,
                                (value, API) => {
                                    let key = [];
                                    if (API.depth === 3) {
                                        key = API.path.split('.');
                                        if (title !== key[0]) {
                                            title = key[0];
                                            output.push(
                                                <h5 key={index}>
                                                    {title.toUpperCase()}
                                                </h5>
                                            );
                                            index++;
                                        }
                                        key = key[key.length - 1];
                                        output.push(
                                            <span
                                                key={
                                                    index
                                                }>{`${key}: ${value}`}</span>
                                        );
                                        index++;
                                    }
                                }
                            );
                            return output;
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * @description Auxiliary functional component.
 * @returns {Object<string,*>} React component.
 */
function defaultForm() {
    return <DefaultForm />;
}

export {defaultForm};

export default {
    title: 'Form',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
