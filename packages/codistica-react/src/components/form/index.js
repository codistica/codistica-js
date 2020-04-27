/** @flow */

/** @module react/components/form */

import {log} from '@codistica/core';
import classnames from 'classnames/dedupe';
import React from 'react';
import {InputContext} from '../input/index.js'; // TODO: IMPORT PROVIDER TYPES? TO CHECK PASSED VALUES
import type {InputAPI} from '../input/index.js'; // TODO: USE

type Props = {
    className: string,
    children: any,
    mandatory: Object,
    matches: Array<Array<string>>,
    onValidationResult: Function | null,
    onAPI: Function | null
};

type State = {};

type FormAPI = {
    state: State,
    blinkInvalids: Function
};

/**
 * @typedef formPropsType
 * @property {string} [className=''] - React prop.
 * @property {string} [children=null] - React prop.
 * @property {Object<string,*>} [mandatory={}] - Mandatory fields object.
 * @property {Array<Array<string>>} [matches] - Fields match array.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onAPI=null] - Callback for API event.
 */

/**
 * @classdesc A draggable component.
 */
class Form extends React.Component<Props, State> {
    // TODO: PASSWORDS DIFFERENCE COLORING SUPPORT? DATA COLLECTION FILTERS: toLowercase ALL, GET EPOCH FROM DATES, ETC...

    static defaultProps = {
        className: '',
        children: null,
        mandatory: {},
        matches: [],
        onValidationResult: null,
        onAPI: null
    };

    registeredInputs: Object;
    validationReport: Object;
    isValid: boolean | null;
    API: Object;
    contextValue: Object;

    /**
     * @description Constructor.
     * @param {formPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        // TODO: CREATE SCAN REPORT STATIC METHOD? TO NORMALIZE REPORT?

        super(props);

        this.registeredInputs = {};
        this.validationReport = {};
        this.isValid = null;

        this.state = {}; // TODO: ADD STATE TO BE SHARED IN API. EX: isValid?

        // BIND METHODS
        (this: Function).inputRegistrationHandler = this.inputRegistrationHandler.bind(
            this
        );
        (this: Function).inputValidationHandler = this.inputValidationHandler.bind(
            this
        );
        (this: Function).validateForm = this.validateForm.bind(this);
        (this: Function).blinkInvalids = this.blinkInvalids.bind(this);
        (this: Function).getInputsByName = this.getInputsByName.bind(this);

        this.API = {
            state: this.state,
            blinkInvalids: this.blinkInvalids
        };

        this.contextValue = {
            onRegistration: this.inputRegistrationHandler,
            onValidationResult: this.inputValidationHandler
        };
    }

    componentDidMount() {
        // EXPOSE API
        if (typeof this.props.onAPI === 'function') {
            this.props.onAPI(this.API);
        }
    }

    /**
     * @instance
     * @description Handler to register input and its relative API in the form component.
     * @param {string} id - Input id.
     * @param {Object<string,*>} API - Input API.
     * @returns {void} Void.
     */
    inputRegistrationHandler(id: string, API: InputAPI) {
        // TODO: DEFINE GROUPS SYSTEM? MAYBE NOT NECESSARY

        const {name} = API.state;

        if (this.getInputsByName(name).length !== 0) {
            log.warning(
                'inputValidationHandler()',
                'DUPLICATE NAME DETECTED'
            )();
        }

        this.registeredInputs[id] = {
            name: name,
            API: API,
            value: API.state.value,
            isValid: API.state.isValid,
            mandatory:
                typeof this.props.mandatory[name] !== 'boolean'
                    ? true
                    : this.props.mandatory[name]
        };

        this.validationReport[id] = null;
    }

    /**
     * @instance
     * @description Handler to track inputs validations.
     * @param {string} id - Input id.
     * @param {string} value - Input value.
     * @param {{validationResult: boolean, validationReport: Object<string,*>}} validationObject - Input inner validation object.
     * @returns {void} Void.
     */
    inputValidationHandler(
        id: string,
        value: string,
        validationObject: {
            validationResult: boolean | null,
            validationReport: Object
        }
    ) {
        // TODO: IMPORT types

        const {validationResult, validationReport} = validationObject;
        const input = this.registeredInputs[id];

        if (typeof input === 'undefined') {
            log.error(
                'inputValidationHandler()',
                'INPUT IS NOT REGISTERED. ABORTING'
            )();
            return;
        }

        if (input.API.state.name !== input.name) {
            log.warning(
                'inputValidationHandler()',
                'INPUT NAME CHANGE DETECTED. KEEPING ORIGINAL NAME'
            )();
        }

        input.value = value;
        input.isValid = validationResult;

        this.validationReport[id] =
            validationReport.length !== 0 ? validationReport : null;

        this.validateForm();
    }

    validateForm() {
        let dataPackage = {};

        // CHECK MATCHES
        this.props.matches.forEach((matchArray) => {
            // TODO: ITERATE ALL NAMES?
            matchArray.forEach((name, index) => {
                let input;
                if (index !== 0) {
                    input = this.registeredInputs[
                        this.getInputsByName(name)[0]
                    ];
                    if (typeof input !== 'undefined') {
                        if (input.value.length !== 0) {
                            if (
                                input.value ===
                                this.registeredInputs[
                                    this.getInputsByName(matchArray[0])[0]
                                ].value
                            ) {
                                input.isValid = true;
                                input.API.setValidation(true);
                            } else {
                                input.isValid = false;
                                input.API.setValidation(false);
                            }
                        } else {
                            input.isValid = null;
                            input.API.setValidation(null);
                        }
                    }
                }
            });
        });

        this.isValid = true;
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }

            const input = this.registeredInputs[i];

            // CHECK VALIDITY
            if (
                input.isValid === false ||
                (input.isValid === null &&
                    input.value.length === 0 &&
                    input.mandatory)
            ) {
                this.isValid = false;
            }

            // COLLECT DATA
            dataPackage[input.name] = input.value; // TODO: FIX! MAKE IT READABLE? EASY TO DIGEST. SUPPORT GROUPS. CASE DUPLICATE NAMES?
        }

        if (typeof this.props.onValidationResult === 'function') {
            this.props.onValidationResult(
                this.isValid,
                dataPackage,
                this.validationReport
            );
        }
    }

    blinkInvalids() {
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            const input = this.registeredInputs[i];
            // CHECK VALIDITY
            if (
                input.isValid === false ||
                (input.isValid === null &&
                    input.value.length === 0 &&
                    input.mandatory)
            ) {
                input.API.blinkWarning();
            }
        }
    }

    /**
     * @instance
     * @description Search registered inputs and returns matched name inputs.
     * @param {string} name - Input name.
     * @returns {Array<*>} Found inputs array.
     */
    getInputsByName(name: string) {
        let output = [];
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            if (this.registeredInputs[i].name === name) {
                output.push(i);
            }
        }
        return output;
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            children,
            className,
            onAPI,
            onValidationResult,
            mandatory,
            matches,
            ...others
        } = this.props;
        const mainClassName = classnames({[className]: className});
        // UPDATE API STATE
        this.API.state = this.state;
        return (
            <form {...others} className={mainClassName}>
                <InputContext.Provider value={this.contextValue}>
                    {children}
                </InputContext.Provider>
            </form>
        );
    }
}

export type {FormAPI};
export {Form};
