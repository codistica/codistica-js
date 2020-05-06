/** @flow */

/** @module react/components/form */

// TODO: ADD SUBMISSION PLUGINS SUPPORT. (TO CREATE PASSWORD HASHES, ETC)

import {log} from '@codistica/core';
import React from 'react';
import {InputContext} from './input-renderer.js';
import type {InputRenderer} from './input-renderer.js'; // TODO: USE TYPES FORM EACH INPUT COMPONENT (USE & TYPE OPERATOR).

type Props = {
    onValidationResult: Function,
    onMount: Function,
    children: any,
    className: string,
    style: {[string]: any}
};

/**
 * @typedef formPropsType
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onMount=null] - Callback for componentDidMount event.
 * @property {string} [className=''] - React prop.
 * @property {string} [children=null] - React prop.
 */

/**
 * @classdesc A beautiful form component.
 */
class Form extends React.Component<Props> {
    // TODO: PASSWORDS DIFFERENCE COLORING SUPPORT? DATA COLLECTION FILTERS: toLowercase ALL, GET EPOCH FROM DATES, ETC...

    static defaultProps = {
        onValidationResult: null,
        onMount: null,
        className: '',
        style: {},
        children: null
    };

    registeredInputs: {[string]: InputRenderer};
    validationResult: boolean;

    contextValue: {
        onMount: Function,
        onValidationResult: Function
    };

    /**
     * @description Constructor.
     * @param {formPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        // TODO: CREATE SCAN REPORT STATIC METHOD? TO NORMALIZE REPORT?

        super(props);

        this.registeredInputs = {};
        this.validationResult = false;

        // BIND METHODS
        (this: Function).inputMountHandler = this.inputMountHandler.bind(this);
        (this: Function).inputValidationResultHandler = this.inputValidationResultHandler.bind(
            this
        );
        (this: Function).validateForm = this.validateForm.bind(this);
        (this: Function).warnInvalids = this.warnInvalids.bind(this);
        (this: Function).getInputsByName = this.getInputsByName.bind(this);

        this.contextValue = {
            onMount: this.inputMountHandler,
            onValidationResult: this.inputValidationResultHandler
        };
    }

    componentDidMount() {
        // EXPOSE INSTANCE
        this.props.onMount && this.props.onMount(this);
    }

    /**
     * @instance
     * @description Handler to register input in the form component.
     * @param {InputRenderer} input - Input instance.
     * @returns {void} Void.
     */
    inputMountHandler(input: InputRenderer) {
        // TODO: DEFINE GROUPS SYSTEM? MAYBE NOT NECESSARY

        if (this.getInputsByName(input.props.name).length !== 0) {
            log.warning(
                'inputValidationHandler()',
                'DUPLICATE NAME DETECTED'
            )();
        }

        this.registeredInputs[input.id] = input;
    }

    /**
     * @instance
     * @description Handler to track inputs validations.
     * @param {string} id - Input id.
     * @returns {void} Void.
     */
    inputValidationResultHandler(id: string) {
        if (!this.registeredInputs[id]) {
            log.error(
                'inputValidationHandler()',
                'INPUT IS NOT REGISTERED. ABORTING'
            )();
            return;
        }

        this.validateForm();
    }

    validateForm() {
        const dataPackage = {};
        const validationReports = {};

        this.validationResult = true;
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }

            const input = this.registeredInputs[i];

            // CHECK MATCH
            if (input.props.match) {
                if (!input.value.length) {
                    input.setValidation(null);
                } else {
                    input.setValidation(
                        this.getInputsByName(input.props.match).every(
                            (matchedInput) => matchedInput.value === input.value
                        )
                    );
                }
            }

            // CHECK VALIDITY
            if (
                input.validationResult === false ||
                (input.validationResult === null &&
                    input.value.length === 0 &&
                    input.props.mandatory)
            ) {
                this.validationResult = false;
            }

            // COLLECT DATA
            dataPackage[input.props.name] = input.value; // TODO: FIX! MAKE IT READABLE? EASY TO DIGEST. SUPPORT GROUPS. CASE DUPLICATE NAMES?
            validationReports[input.props.name] = input.validationReport; // TODO: FIX! MAKE IT READABLE? EASY TO DIGEST. SUPPORT GROUPS. CASE DUPLICATE NAMES?
        }

        this.props.onValidationResult &&
            this.props.onValidationResult(
                this.validationResult,
                dataPackage,
                validationReports
            );
    }

    warnInvalids() {
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            const input = this.registeredInputs[i];
            // CHECK VALIDITY
            if (
                input.validationResult === false ||
                (input.validationResult === null &&
                    input.value.length === 0 &&
                    input.props.mandatory)
            ) {
                input.warn();
            }
        }
    }

    /**
     * @instance
     * @description Search registered inputs and returns matched name inputs.
     * @param {string} name - Input name.
     * @returns {Array<InputRenderer>} Found inputs array.
     */
    getInputsByName(name: string): Array<InputRenderer> {
        const output = [];
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            if (this.registeredInputs[i].props.name === name) {
                output.push(this.registeredInputs[i]);
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
            style,
            onValidationResult,
            onMount,
            ...others
        } = this.props;
        return (
            <form {...others} className={className} style={style}>
                <InputContext.Provider value={this.contextValue}>
                    {children}
                </InputContext.Provider>
            </form>
        );
    }
}

export {Form};
