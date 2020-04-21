/** @flow */

import {ObjectUtils} from '@codistica/core';
import classnames from 'classnames/dedupe';
import React from 'react';
import {Button} from '../../../src/components/button/index.js';
import {Form} from '../../../src/components/form/index.js';
import type {FormAPI} from '../../../src/components/form/index.js';
import {Input} from '../../../src/components/input/index.js';
import {InputPresets} from '../../../src/plugins/input-presets.js';
import {InputValidators} from '../../../src/plugins/input-validators.js';
import Styles from './index.module.scss';

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
class FormDemo extends React.Component<Props, State> {
    formAPI: FormAPI | any;

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
     * @returns {Object<string,*>} React component.
     */
    render() {
        const mainClassName = classnames(
            {[Styles.form]: true},
            {[Styles.isValid]: this.state.isValid},
            {[Styles.isInvalid]: !this.state.isValid},
            {[Styles._isBlinkForm]: this.state.isBlinkForm}
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
                        <span className={Styles.checkboxesContainer}>
                            <span>
                                <Input
                                    name={'check1'}
                                    type={'checkbox'}
                                    value={'check1'}
                                    validators={InputValidators.presence}
                                />
                                <span className={Styles.inputTitle}>
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
                                <span className={Styles.inputTitle}>
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
                                <span className={Styles.inputTitle}>
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
                        dark={false}
                        onClick={this.submitForm}
                    />
                </Form>

                <div className={Styles.infoContainer}>
                    <div className={Styles.infoBox}>
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

                    <div className={Styles.infoBox}>
                        <h5>[REPORTS]</h5>
                        {(() => {
                            let title = '';
                            let output = [];
                            let index = 0;
                            ObjectUtils.forEachSync(
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

export {FormDemo};
