/** @flow */

import {objectUtils} from '@codistica/core';
import classnames from 'classnames/dedupe';
import React from 'react';
import {BGS_DARK} from '../../../../.storybook/custom-backgrounds.js';
import {
    Button,
    Form,
    Input,
    InputPresets,
    InputValidators
} from '../../../../src/index.js';
import styles from './index.module.scss';

type Props = {};

type State = {
    isValid: boolean,
    isBlinkForm: boolean,
    report: Object,
    dataPackage: Object
};

/**
 * @classdesc Form demo.
 */
class DarkForm extends React.Component<Props, State> {
    formAPI: Object;

    /**
     * @description Constructor.
     * @param {Object<string,*>} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            isValid: false,
            isBlinkForm: false,
            report: {},
            dataPackage: {}
        };

        this.formAPI = null;

        // BIND METHODS
        (this: Function).onValidationResult = this.onValidationResult.bind(
            this
        );
        (this: Function).submitForm = this.submitForm.bind(this);
        (this: Function).blinkForm = this.blinkForm.bind(this);
    }

    /**
     * @instance
     * @description Handler for validationResult event.
     * @param {boolean} isValid - Form validation result.
     * @param {Object<string,*>} dataPackage - Form data.
     * @param {Object<string,*>} report - Form validation report.
     * @returns {void} Void.
     */
    onValidationResult(isValid: boolean, dataPackage: Object, report: Object) {
        this.setState({
            isValid,
            report,
            dataPackage
        });
    }

    submitForm() {
        if (!this.state.isValid) {
            this.formAPI.blinkInvalids();
        } else {
            this.blinkForm();
        }
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
     * @returns {React.Component} React component.
     */
    render() {
        const mainClassName = classnames(
            {[styles.form]: true},
            {[styles.isValid]: this.state.isValid},
            {[styles.isInvalid]: !this.state.isValid},
            {[styles._isBlinkForm]: this.state.isBlinkForm}
        );

        return (
            <div>
                <Form
                    className={mainClassName}
                    onValidationResult={this.onValidationResult}
                    mandatory={{surname: false, check1: false}}
                    matches={[['password', 'repeat_password']]}
                    onAPI={(API) => {
                        this.formAPI = API;
                    }}>
                    <Input
                        placeholder={'Name'}
                        name={'name'}
                        presets={InputPresets.prettify}
                        validators={InputValidators.presence}
                    />
                    <Input
                        placeholder={'Surname (optional)'}
                        name={'surname'}
                        presets={InputPresets.prettify}
                        validators={InputValidators.presence}
                    />
                    <Input
                        placeholder={'Birthday (+18) (day/month/year)'}
                        name={'birthday'}
                        validators={InputValidators.date({
                            minAge: 18,
                            separator: '/',
                            minDate: new Date(1900, 1, 0)
                        })}
                    />
                    <Input
                        placeholder={'Email'}
                        name={'email'}
                        presets={InputPresets.email}
                    />
                    <Input
                        placeholder={'Password (strong)'}
                        name={'password'}
                        type={'password'}
                        presets={InputPresets.password}
                    />
                    <Input
                        placeholder={'Repeat Password'}
                        name={'repeat_password'}
                        type={'password'}
                    />
                    <div>
                        <span className={styles.checkboxesContainer}>
                            <span>
                                <Input
                                    name={'check1'}
                                    type={'checkbox'}
                                    value={'check1'}
                                    validators={InputValidators.presence}
                                />
                                <span className={styles.inputTitle}>
                                    Check 1 (Optional)
                                </span>
                            </span>
                            <span>
                                <Input
                                    name={'check2'}
                                    type={'checkbox'}
                                    value={'check2'}
                                    validators={InputValidators.presence}
                                />
                                <span className={styles.inputTitle}>
                                    Check 2
                                </span>
                            </span>
                            <span>
                                <Input
                                    name={'check3'}
                                    type={'checkbox'}
                                    value={'check3'}
                                    validators={InputValidators.presence}
                                />
                                <span className={styles.inputTitle}>
                                    Check 3
                                </span>
                            </span>
                        </span>
                    </div>
                    <div>
                        <Input
                            name={'radioGroup'}
                            type={'radio'}
                            radioButtons={{
                                radio1: 'Radio 1',
                                radio2: 'Radio 2 (Correct)',
                                radio3: 'Radio 3'
                            }}
                            validators={'radio2'}
                            containerStyle={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        />
                    </div>
                    <Button
                        style={{marginTop: '30px'}}
                        text={'SUBMIT'}
                        dark={true}
                        onClick={this.submitForm}
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
                                this.state.report,
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
 * @returns {React.Component} React component.
 */
function darkForm() {
    return <DarkForm />;
}

export {darkForm};

export default {
    title: 'Form',
    parameters: {
        backgrounds: BGS_DARK
    }
};
