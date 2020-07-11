/** @flow */

/** @module react/utils/form */

// TODO: ADD SUPPORT FOR SERVER SIDE VALIDATION INTEGRATION.

// TODO: CHECK/IMPROVE ALL VARIABLE/TYPES NAMES IN ALL FORM/INPUT FLOW.
// TODO: CHECK/IMPROVE ALL JSDOC IN ALL FORM/INPUT FLOW.

import {log} from '@codistica/core';
import React from 'react';
import resetClassNames from '../css/reset.module.scss';
import {getRefHandler} from '../modules/get-ref-handler.js';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';
import {InputContext} from './input-renderer.js';
import type {InputRenderer, ValidationObject} from './input-renderer.js';

type FormValidationObjectType = {[string]: ValidationObject};

type OnValidationHandler = (
    validationResult: boolean,
    dataPayload: {[string]: string},
    formValidationObject: FormValidationObjectType
) => void;

type Props = {
    onValidationResult: null | OnValidationHandler,
    onMount: null | ((...args: Array<any>) => any),
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
        root?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string
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
    dataPayload: {[string]: string};
    formValidationObject: FormValidationObjectType;

    linkedInputsMap: Map<string, Set<string>>;

    formRef: {
        current: any
    };

    inputContextValue: {
        formInstance: Form
    };

    /**
     * @description Constructor.
     * @param {formPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.registeredInputs = {};

        this.validationResult = false;
        this.dataPayload = {};
        this.formValidationObject = {};

        this.linkedInputsMap = new Map();

        this.formRef = {
            current: null
        };

        // BIND METHODS
        (this: any).registerInput = this.registerInput.bind(this);
        (this: any).unregisterInput = this.unregisterInput.bind(this);
        (this: any).linkInputs = this.linkInputs.bind(this);
        (this: any).unlinkInput = this.unlinkInput.bind(this);
        (this: any).validateLinkedInputs = this.validateLinkedInputs.bind(this);
        (this: any).checkMatch = this.checkMatch.bind(this);
        (this: any).validateForm = this.validateForm.bind(this);
        (this: any).warnInvalids = this.warnInvalids.bind(this);
        (this: any).clear = this.clear.bind(this);
        (this: any).getInputElementByName = this.getInputElementByName.bind(
            this
        );
        (this: any).getInputByName = this.getInputByName.bind(this);

        this.inputContextValue = {
            formInstance: this
        };
    }

    /**
     * @instance
     * @description React lifecycle.
     * @returns {void} Void.
     */
    componentDidMount() {
        this.props.onMount && this.props.onMount(this);
    }

    /**
     * @instance
     * @description Register input in the form component.
     * @param {InputRenderer} input - Input instance.
     * @returns {void} Void.
     */
    registerInput(input: InputRenderer) {
        if (this.getInputByName(input.props.name)) {
            log.warning('registerInput()', 'INPUT ALREADY REGISTERED')();
        }
        this.registeredInputs[input.id] = input;
    }

    /**
     * @instance
     * @description Unregister input from the form component.
     * @param {InputRenderer} input - Input instance.
     * @returns {void} Void.
     */
    unregisterInput(input: InputRenderer) {
        delete this.registeredInputs[input.id];
    }

    /**
     * @instance
     * @description Link inputs for parallel validation.
     * @param {...string} inputsNames - Inputs names.
     * @returns {void} Void.
     */
    linkInputs(...inputsNames: Array<string>) {
        inputsNames.forEach((inputNameA, indexA) => {
            const linkedInputsSet =
                this.linkedInputsMap.get(inputNameA) || new Set();
            inputsNames.forEach((inputNameB, indexB) => {
                if (indexB !== indexA) {
                    linkedInputsSet.add(inputNameB);
                }
            });
            this.linkedInputsMap.set(inputNameA, linkedInputsSet);
        });
    }

    /**
     * @instance
     * @description Unlink inputs.
     * @param {string} inputName - Input name.
     * @returns {void} Void.
     */
    unlinkInput(inputName: string) {
        this.linkedInputsMap.forEach((linkedInputsSet, currentInputName) => {
            if (currentInputName !== inputName) {
                linkedInputsSet.delete(inputName);
            }
        });
        this.linkedInputsMap.delete(inputName);
    }

    /**
     * @instance
     * @description Trigger linked inputs validation.
     * @param {string} inputName - Input name.
     * @returns {void} Void.
     */
    validateLinkedInputs(inputName: string) {
        const linkedInputsSet = this.linkedInputsMap.get(inputName);
        if (linkedInputsSet) {
            linkedInputsSet.forEach((linkedInputName) => {
                const linkedInput = this.getInputByName(linkedInputName);
                if (linkedInput) {
                    linkedInput.validateInput();
                }
            });
        }
    }

    /**
     * @instance
     * @description Checks input based on its matching rules prop.
     * @param {string} inputName - Input name.
     * @returns {(boolean|null)} Result.
     */
    checkMatch(inputName: string) {
        let result = null;
        const input = this.getInputByName(inputName);
        if (input && input.props.match) {
            const matchProp = input.props.match;
            const matchName = matchProp.replace(/^!/, '');
            const invert = matchProp.startsWith('!');
            const matchedInput = this.getInputByName(matchName);
            if (matchedInput) {
                if (invert) {
                    return matchedInput.state.value !== input.state.value;
                }
                return matchedInput.state.value === input.state.value;
            }
        }
        return result;
    }

    /**
     * @instance
     * @description Validates entire form based on registered inputs data.
     * @returns {void} Void.
     */
    validateForm() {
        this.validationResult = true;

        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }

            const input = this.registeredInputs[i];

            // CHECK VALIDITY
            if (input.validationObject.result === false) {
                this.validationResult = false;
            }

            // COLLECT INPUT INFORMATION
            this.dataPayload[input.props.name] = input.state.value;
            this.formValidationObject[input.props.name] =
                input.validationObject;
        }

        this.props.onValidationResult &&
            this.props.onValidationResult(
                this.validationResult,
                this.dataPayload,
                this.formValidationObject
            );
    }

    /**
     * @instance
     * @description Triggers warning highlighting on invalid inputs.
     * @returns {void} Void.
     */
    warnInvalids() {
        let focused = false;

        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            const input = this.registeredInputs[i];

            // INDICATE THAT THERE HAS BEEN INTERACTION
            if (!input.hasInteracted) {
                input.hasInteracted = true;
                input.validateInput();
            }

            // CHECK VALIDITY
            if (input.validationObject.result === false) {
                if (!focused) {
                    // FOCUS FIRST INVALID INPUT
                    const inputElement = this.getInputElementByName(
                        input.props.name
                    );
                    if (inputElement) {
                        inputElement.focus();
                        focused = true;
                    }
                }
                input.warn();
            }
        }
    }

    /**
     * @instance
     * @description Clears form or single input if specified.
     * @param {string} inputName - Name of input to be cleared.
     * @returns {void} Void.
     */
    clear(inputName: string) {
        if (inputName) {
            const input = this.getInputByName(inputName);
            if (input) {
                input.clear();
            }
            return;
        }

        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            this.registeredInputs[i].clear();
        }
    }

    /**
     * @instance
     * @description Searches input element by name.
     * @param {string} inputName - Input name.
     * @returns {(HTMLInputElement|null)} Found inputs array.
     */
    getInputElementByName(inputName: string): HTMLInputElement | null {
        return (
            this.formRef.current &&
            this.formRef.current.querySelector(`input[name=${inputName}]`)
        );
    }

    /**
     * @instance
     * @description Search registered inputs and returns first matched name input or null.
     * @param {string} inputName - Input name.
     * @returns {(InputRenderer|null)} Found input or null.
     */
    getInputByName(inputName: string): InputRenderer | null {
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            if (this.registeredInputs[i].props.name === inputName) {
                return this.registeredInputs[i];
            }
        }
        return null;
    }

    /**
     * @instance
     * @description Form submission utility.
     * @param {Function} handler - Submission handler.
     * @returns {void} Void.
     */
    submit(handler: OnValidationHandler) {
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            const input = this.registeredInputs[i];

            // INDICATE THAT THERE HAS BEEN INTERACTION
            if (!input.hasInteracted) {
                input.hasInteracted = true;
                input.validateInput();
            }
        }

        handler(
            this.validationResult,
            this.dataPayload,
            this.formValidationObject
        );
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
                ref={getRefHandler(this.formRef)}
                style={mergedStyles.root}
                className={mergedClassNames.root}>
                <InputContext.Provider value={this.inputContextValue}>
                    {children}
                </InputContext.Provider>
            </form>
        );
    }
}

export {Form};
export type {FormValidationObjectType};
