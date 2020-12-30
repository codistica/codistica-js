/** @flow */

import {log} from '@codistica/core';
import React, {createContext} from 'react';
import resetClassNames from '../css/reset.module.scss';
import {getRefHandler} from '../modules/get-ref-handler.js';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';
import type {InputRenderer, ValidationObject} from './input-renderer.js';

type DataPayload = {[string]: string | Array<string>};

type FormValidationObjectType = {[string]: ValidationObject};

type OnValidationHandler = (
    validationResult: boolean,
    dataPayload: DataPayload,
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

const FormContext: {[string]: any} = createContext({
    formInstance: null
});

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
    dataPayload: DataPayload;
    formValidationObject: FormValidationObjectType;

    linkedInputsMap: Map<string, Set<string>>;

    formRef: {
        current: any
    };

    FormContextValue: {
        formInstance: Form
    };

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

        this.FormContextValue = {
            formInstance: this
        };
    }

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount(this);
        }
    }

    registerInput(input: InputRenderer) {
        if (this.getInputByName(input.props.name)) {
            log.warning('registerInput()', 'INPUT ALREADY REGISTERED')();
        }
        this.registeredInputs[input.id] = input;
    }

    unregisterInput(input: InputRenderer) {
        delete this.registeredInputs[input.id];
    }

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

    unlinkInput(inputName: string) {
        this.linkedInputsMap.forEach((linkedInputsSet, currentInputName) => {
            if (currentInputName !== inputName) {
                linkedInputsSet.delete(inputName);
            }
        });
        this.linkedInputsMap.delete(inputName);
    }

    validateLinkedInputs(inputName: string, ignore?: Set<string>) {
        const ignoreSet = ignore || new Set();
        const linkedInputsSet = this.linkedInputsMap.get(inputName);

        if (linkedInputsSet) {
            if (!ignoreSet.size) {
                // DO NOT VALIDATE AGAIN FIRST REQUESTER INPUT
                ignoreSet.add(inputName);
            }

            linkedInputsSet.forEach((linkedInputName) => {
                const linkedInput = this.getInputByName(linkedInputName);

                if (linkedInput && !ignoreSet.has(linkedInputName)) {
                    ignoreSet.add(linkedInputName);

                    linkedInput.validateInput();

                    this.validateLinkedInputs(
                        linkedInput.props.name,
                        ignoreSet
                    );
                }
            });
        }
    }

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

    validateForm() {
        this.validationResult = true;
        this.dataPayload = {};

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
            const groupName = (input.props.name.match(/[^:]+(?=:)/) || [])[0];
            if (groupName) {
                if (Array.isArray(this.dataPayload[groupName])) {
                    this.dataPayload[groupName].push(input.getFormValue());
                } else {
                    this.dataPayload[groupName] = [input.getFormValue()];
                }
            } else {
                this.dataPayload[input.props.name] = input.getFormValue();
            }

            this.formValidationObject[input.props.name] =
                input.validationObject;
        }

        if (this.props.onValidationResult) {
            this.props.onValidationResult(
                this.validationResult,
                this.dataPayload,
                this.formValidationObject
            );
        }
    }

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
            if (!input.isInteracted) {
                input.isInteracted = true;
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

    clear(inputName?: string) {
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

    getInputElementByName(inputName: string): HTMLInputElement | null {
        return (
            this.formRef.current &&
            this.formRef.current.querySelector(`input[name=${inputName}]`)
        );
    }

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

    submit(handler: OnValidationHandler) {
        for (const i in this.registeredInputs) {
            if (
                !Object.prototype.hasOwnProperty.call(this.registeredInputs, i)
            ) {
                continue;
            }
            const input = this.registeredInputs[i];

            // INDICATE THAT THERE HAS BEEN INTERACTION
            if (!input.isInteracted) {
                input.isInteracted = true;
                input.validateInput();
            }
        }

        handler(
            this.validationResult,
            this.dataPayload,
            this.formValidationObject
        );
    }

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
                resetClassNames.greedy,
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
                <FormContext.Provider value={this.FormContextValue}>
                    {children}
                </FormContext.Provider>
            </form>
        );
    }
}

export {Form, FormContext};
export type {FormValidationObjectType};
