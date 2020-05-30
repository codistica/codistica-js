/** @flow */

/** @module react/components/form */

// TODO: ADD SUBMISSION PLUGINS SUPPORT. (TO CREATE PASSWORD HASHES, ETC). SECURE INFORMATION SEND (PAYMENT, SENSITIVE DATA, ETC).
// TODO: PASSWORDS DIFFERENCE COLORING SUPPORT? DATA COLLECTION FILTERS: toLowercase ALL, GET EPOCH FROM DATES, ETC...
// TODO: CREATE SCAN REPORT STATIC METHOD? TO NORMALIZE REPORT?

import {log} from '@codistica/core';
import React from 'react';
import resetClassNames from '../css/reset.module.scss';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';
import {InputContext} from './input-renderer.js';
import type {InputRenderer} from './input-renderer.js';

type Props = {
    onValidationResult: (...args: Array<any>) => any,
    onMount: (...args: Array<any>) => any,
    children: any,
    style: {[string]: any},
    className: string,
    customStyles: {
        root: {[string]: any}
    },
    customClassNames: {
        root: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string
    }
};

/**
 * @typedef formPropsType
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onMount=null] - Callback for componentDidMount event.
 * @property {*} [children=null] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @classdesc A beautiful form component.
 */
class Form extends React.Component<Props> {
    static globalStyles: GlobalStyles = {
        default: {
            root: {}
        }
    };

    static globalClassNames: GlobalClassNames = {
        default: {
            root: ''
        }
    };

    static defaultProps = {
        onValidationResult: null,
        onMount: null,
        children: null,
        style: {},
        className: '',
        customStyles: {},
        customClassNames: {},
        globalTheme: 'default'
    };

    registeredInputs: {[string]: InputRenderer};
    validationResult: boolean;

    contextValue: {
        onMount: (...args: Array<any>) => any,
        onValidationResult: (...args: Array<any>) => any
    };

    /**
     * @description Constructor.
     * @param {formPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.registeredInputs = {};
        this.validationResult = false;

        // BIND METHODS
        (this: any).inputMountHandler = this.inputMountHandler.bind(this);
        (this: any).inputValidationResultHandler = this.inputValidationResultHandler.bind(
            this
        );
        (this: any).validateForm = this.validateForm.bind(this);
        (this: any).warnInvalids = this.warnInvalids.bind(this);
        (this: any).getInputsByName = this.getInputsByName.bind(this);

        this.contextValue = {
            onMount: this.inputMountHandler,
            onValidationResult: this.inputValidationResultHandler
        };
    }

    /**
     * @instance
     * @description React lifecycle.
     * @returns {void} Void.
     */
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

    /**
     * @instance
     * @description Validates entire form based on inputs state.
     * @returns {void} Void.
     */
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
            dataPackage[input.props.name] = input.value; // TODO: FIX! MAKE IT READABLE? EASY TO DIGEST. CASE DUPLICATE NAMES?
            validationReports[input.props.name] = input.validationReport; // TODO: FIX! MAKE IT READABLE? EASY TO DIGEST. CASE DUPLICATE NAMES?
        }

        this.props.onValidationResult &&
            this.props.onValidationResult(
                this.validationResult,
                dataPackage,
                validationReports
            );
    }

    /**
     * @instance
     * @description Triggers warning highlighting on invalid inputs.
     * @returns {void} Void.
     */
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
            onValidationResult,
            onMount,
            children,
            style,
            className,
            customStyles,
            customClassNames,
            globalTheme,
            ...other
        } = this.props;

        const globalStyles = globalTheme
            ? Form.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? Form.globalClassNames[globalTheme] || {}
            : {};

        const mergedStyles = {
            root: mergeStyles(globalStyles.root, customStyles.root, style)
        };

        const mergedClassNames = {
            root: mergeClassNames(
                resetClassNames.root,
                globalClassNames.root,
                customClassNames.root,
                className
            )
        };

        return (
            <form
                {...other}
                style={mergedStyles.root}
                className={mergedClassNames.root}>
                <InputContext.Provider value={this.contextValue}>
                    {children}
                </InputContext.Provider>
            </form>
        );
    }
}

export {Form};