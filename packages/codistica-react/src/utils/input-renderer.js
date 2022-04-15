/** @flow */

// TODO: MAKE IT POSSIBLE TO SPECIFY A KEY FOR RETRIEVING VALUE FROM event.target OBJECT ('value', 'files', ETC.) OR TO USE A RETRIEVER FUNCTION.

// TODO: RENAME asyncValidator TO asyncCallbackValidator AND CREATE callbackValidator.
// TODO: CREATE regExpValidator

// TODO: ADD SUPPORT FOR SERVER SIDE VALIDATION INTEGRATION.
// TODO: CHECK/IMPROVE ALL VARIABLE/TYPES NAMES IN ALL FORM/INPUT FLOW.
// TODO: CHECK/IMPROVE ALL JSDOC IN ALL FORM/INPUT FLOW.

// TODO: ADD SUPPORT FOR PASSING VALIDATION INFORMATION TO INPUT IN A PROP (TO BE MERGED AS IF THEY WERE VALIDATOR OUTPUTS) (CREATE/MODIFY/IMPROVE NEEDED UTILITIES) (STATIC VERSION OF invalidate, validate, disable AND defer? RETURNING VALIDATOR OUTPUT).
// TODO: SAME LOGIC FOR SERVER VALIDATION. RECEIVE AN OBJECT WITH OUTPUTS, WITH OPTION TO SET MESSAGES AND THEN PASS IT TO FORM AND FORM WILL USE INPUTS INSTANCES TO INJECT VALIDATION INFORMATION LIKE ABOVE (MAKE IT PERSIST UNTIL NEW SERVER SIDE OBJECT IS PASSED OR TO DISAPPEAR ON INPUT CHANGE BASED ON OPTION).

// TODO: ACCEPT CUSTOM COLORS IN MUI INPUTS (PASS THROUGH useStyles?)

// TODO: ADD SUPPORT FOR MULTIPLE INPUTS AND SINGLE VALIDATION? LINKED VALIDATIONS? LIKE FOR CREDIT CARD EXPIRATION DATE.

// TODO: PASS hasFocus INFORMATION IN API.

// TODO: CREATE HOOK AND HOC? (inputManagerRenderer, useInputManager, withInputManager) (COMMON InputManager CLASS? HOW TO USE CONTEXT?)

// TODO: PASS NON STRINGIFIED VALUE TO VALIDATORS AS SECOND ARGUMENT.

// TODO: ADD SUPPORT FOR async STRINGIFIERS (EX. FOR FILES).

// TODO: ALLOW INPUTS TO BE CONTROLLED FROM THE OUTSIDE VIA value PROP. ADD controlled PROP OR SIMILAR TO DISABLE INTERNAL CONTROL?

// TODO: ADD api PROP TO BE PASSED A ref OR callback? JUST LIKE REACT ref.

import {objectUtils, stringify} from '@codistica/core';
import React from 'react';
import type {Node} from 'react';
import {InputPluginManager} from '../classes/input-plugin-manager.js';
import type {
    InputPluginType,
    RunValidatorsOutputType
} from '../classes/input-plugin-manager.js';
import {InputValidatorPluginUtils} from '../classes/input-validator-plugin-utils.js';
import type {
    ResultType,
    ReportType,
    MessageType,
    DataType
} from '../classes/input-validator-plugin-utils.js';
import {uniqueID} from '../modules/unique-id.js';
import {FormContext} from './form.js';

type ValidationObject = {
    result: ResultType,
    reports: {[string]: ReportType},
    messages: Array<MessageType>,
    data: {[string]: DataType}
};

type StatusType =
    | 'valid'
    | 'invalid'
    | 'highlight'
    | 'warning'
    | 'missing'
    | 'standBy'
    | null;

type InputProps = {
    id: string,
    name: string,
    value: any,
    onKeyDown: (...args: Array<any>) => any,
    onChange: (...args: Array<any>) => any,
    onBlur: (...args: Array<any>) => any
};

type InputRendererAPI = {
    status: StatusType,
    validationObject: ValidationObject,
    setNewValue: (value: string) => any,
    setIsInteracted: (value: boolean) => any
};

type InputRenderFn = (
    inputProps: InputProps,
    inputRendererAPI: InputRendererAPI
) => Node;

type Stringifier = (any, 'validation' | 'form') => string | any;

type InputRendererPropsType = {
    name: string,
    value: string,
    voidValue: string | null,
    booleanInput: boolean | null,
    mandatory: boolean,
    keepMissingStatus: boolean,
    runFiltersBeforeValidators: boolean,
    match: string | null,
    errorMessages: {
        mandatory?: string | null,
        match?: string | null
    },
    plugins: InputPluginType,
    stringifier: null | Stringifier,
    deferValidation: boolean,
    onValidationResult: null | ((...args: Array<any>) => any),
    onKeyDown: null | ((...args: Array<any>) => any),
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    inputRenderFn: null | InputRenderFn
};

type State = {
    value: any,
    status: StatusType,
    overrideStatus: StatusType | false
};

class InputRenderer extends React.Component<InputRendererPropsType, State> {
    static contextType = FormContext;

    static defaultProps = {
        value: '',
        voidValue: '',
        booleanInput: null,
        mandatory: true,
        keepMissingStatus: false,
        runFiltersBeforeValidators: false,
        match: null,
        errorMessages: {
            mandatory: null,
            match: null
        },
        plugins: [],
        stringifier: stringify,
        deferValidation: true,
        onValidationResult: null,
        onKeyDown: null,
        onChange: null,
        onBlur: null
    };

    id: string;

    isInteracted: boolean;
    isVoid: boolean | null;
    isDeferred: boolean | null;
    isStandby: boolean | null;
    isMissing: boolean | null;
    isMatched: boolean | null;

    inputPluginManager: InputPluginManager;
    validatorsOutput: RunValidatorsOutputType;
    validationObject: ValidationObject;
    attachedPromises: Set<Promise<boolean>>;

    inputChangeTracker: string;

    constructor(props: InputRendererPropsType) {
        super(props);

        this.id = uniqueID.getID();

        this.isInteracted = false;

        this.isVoid = null;
        this.isDeferred = null;
        this.isStandby = null;
        this.isMissing = null;
        this.isMatched = null;

        this.inputPluginManager = new InputPluginManager();
        this.validatorsOutput = {};
        this.validationObject = {
            result: null,
            reports: {},
            messages: [],
            data: {}
        };
        this.attachedPromises = new Set();

        this.inputChangeTracker = props.value;

        this.state = {
            status: null,
            value: props.value,
            overrideStatus: false
        };

        this.inputPluginManager.loadPlugins(props.plugins);

        // BIND METHODS
        (this: any).setNewValue = this.setNewValue.bind(this);
        (this: any).setIsInteracted = this.setIsInteracted.bind(this);
        (this: any).getValidationValue = this.getValidationValue.bind(this);
        (this: any).getFormValue = this.getFormValue.bind(this);
        (this: any).validateInput = this.validateInput.bind(this);
        (this: any).updateStatus = this.updateStatus.bind(this);
        (this: any).highlight = this.highlight.bind(this);
        (this: any).warn = this.warn.bind(this);
        (this: any).clear = this.clear.bind(this);
        (this: any).emulateChange = this.emulateChange.bind(this);
        (this: any).onKeyDownHandler = this.onKeyDownHandler.bind(this);
        (this: any).onChangeHandler = this.onChangeHandler.bind(this);
        (this: any).onBlurHandler = this.onBlurHandler.bind(this);
    }

    componentDidMount() {
        // REGISTER INPUT
        if (this.context.formInstance) {
            this.context.formInstance.registerInput(this);
        }

        // VALIDATE INITIAL VALUE
        this.validateInput();

        // LINK INPUTS FOR SUCCESSIVE VALIDATIONS
        if (this.props.match && this.context.formInstance) {
            this.context.formInstance.linkInputs(
                this.props.name,
                this.props.match.replace(/^!/, '')
            );
        }
    }

    componentWillUnmount() {
        // UNLINK INPUT
        if (this.props.match && this.context.formInstance) {
            this.context.formInstance.unlinkInput(this.props.name);
        }

        // UNREGISTER INPUT
        if (this.context.formInstance) {
            this.context.formInstance.unregisterInput(this);
        }

        // RELEASE ID
        uniqueID.releaseID(this.id);
    }

    setNewValue(value: string) {
        // SET NEW VALUE
        this.setState({value}, () => {
            // VALIDATE NEW VALUE
            this.validateInput();

            // REQUEST LINKED INPUTS VALIDATION
            if (this.context.formInstance) {
                this.context.formInstance.validateLinkedInputs(this.props.name);
            }
        });
    }

    setIsInteracted(value: boolean) {
        this.isInteracted = !!value;
    }

    getValidationValue() {
        if (this.props.stringifier) {
            return this.props.stringifier(this.state.value, 'validation');
        } else if (typeof this.state.value === 'string') {
            return this.state.value;
        } else {
            return '';
        }
    }

    getFormValue() {
        if (this.props.stringifier) {
            return this.props.stringifier(this.state.value, 'form');
        } else {
            return this.state.value;
        }
    }

    checkMandatory() {
        this.isVoid = this.state.value === this.props.voidValue;
        return this.props.mandatory && this.isVoid;
    }

    validateInput(useLastValidatorsOutput?: boolean) {
        this.isDeferred = this.props.deferValidation && !this.isInteracted;
        this.isStandby = false;

        this.isMissing = this.checkMandatory();
        this.isMatched =
            this.context.formInstance &&
            this.context.formInstance.checkMatch(this.props.name);

        // RESET VALIDATION OBJECT
        this.validationObject.result = null;
        this.validationObject.reports = {};
        this.validationObject.messages = [];
        this.validationObject.data = {};

        if (this.isMissing) {
            // RESULT
            this.validationObject.result = false;
            // MESSAGES
            if (!this.isDeferred && this.props.errorMessages.mandatory) {
                this.validationObject.messages = [
                    InputValidatorPluginUtils.createMessageObject(
                        this.props.errorMessages.mandatory
                    )
                ];
            }
        } else if (this.isMatched === false) {
            // RESULT
            this.validationObject.result = false;
            // MESSAGES
            if (!this.isDeferred && this.props.errorMessages.match) {
                this.validationObject.messages = [
                    InputValidatorPluginUtils.createMessageObject(
                        this.props.errorMessages.match
                    )
                ];
            }
        } else {
            if (!useLastValidatorsOutput) {
                const validationValue = this.props.runFiltersBeforeValidators
                    ? this.inputPluginManager.runFilters(
                          this.getValidationValue()
                      )
                    : this.getValidationValue();
                // RUN VALIDATORS
                this.validatorsOutput =
                    this.inputPluginManager.runValidators(validationValue);
            }

            for (const validatorName in this.validatorsOutput) {
                if (
                    !Object.hasOwnProperty.call(
                        this.validatorsOutput,
                        validatorName
                    )
                ) {
                    continue;
                }

                const validatorOutput = this.validatorsOutput[validatorName];

                // RESULT
                if (this.validationObject.result === null) {
                    this.validationObject.result = validatorOutput.result;
                } else if (
                    this.validationObject.result === true &&
                    validatorOutput.result !== null
                ) {
                    this.validationObject.result = validatorOutput.result;
                }

                // REPORTS
                this.validationObject.reports[validatorName] =
                    validatorOutput.report;

                // MESSAGES
                this.validationObject.messages = this.validationObject.messages
                    .concat(
                        objectUtils.getValuesArray(validatorOutput.messages)
                    )
                    .sort(
                        (msgA, msgB) =>
                            (msgA.options.sortKey || 0) -
                            (msgB.options.sortKey || 0)
                    );

                // DATA
                this.validationObject.data[validatorName] =
                    validatorOutput.data;

                // PROMISES
                objectUtils
                    .getValuesArray(validatorOutput.promises)
                    .forEach((promise) => {
                        if (promise.isPending && promise.isPending()) {
                            this.isStandby = true;
                            if (!this.attachedPromises.has(promise)) {
                                this.attachedPromises.add(promise);
                                promise.then((shouldValidate) => {
                                    this.attachedPromises.delete(promise);
                                    if (shouldValidate) {
                                        this.validateInput(true);
                                    }
                                });
                            }
                        }
                    });
            }

            if (this.isStandby) {
                this.validationObject.result = false;
            }
        }

        if (this.context.formInstance) {
            this.context.formInstance.validateForm();
        }

        this.updateStatus();

        // EMIT VALIDATION RESULT
        if (this.props.onValidationResult) {
            this.props.onValidationResult({
                result: this.validationObject.result,
                reports: this.validationObject.reports,
                messages: this.validationObject.messages,
                data: this.validationObject.data
            });
        }
    }

    updateStatus() {
        if (this.isStandby) {
            this.setState({
                status: 'standBy'
            });
        } else if (this.isDeferred) {
            this.setState({
                status: null
            });
        } else if (this.isMissing) {
            this.setState({
                status:
                    (!this.props.deferValidation || this.isInteracted) &&
                    !this.props.keepMissingStatus
                        ? 'invalid'
                        : 'missing'
            });
        } else if (this.validationObject.result === null) {
            this.setState({
                status:
                    this.props.mandatory !== null && !this.isVoid
                        ? 'valid'
                        : null
            });
        } else {
            this.setState({
                status: this.validationObject.result ? 'valid' : 'invalid'
            });
        }
    }

    highlight(duration?: number) {
        if (!this.state.overrideStatus) {
            this.setState({
                overrideStatus: 'highlight'
            });
            setTimeout(() => {
                if (this.state.overrideStatus === 'highlight') {
                    this.setState({
                        overrideStatus: false
                    });
                }
            }, duration || 1000);
        }
    }

    warn(duration?: number) {
        if (!this.state.overrideStatus) {
            this.setState({
                overrideStatus: 'warning'
            });
            setTimeout(() => {
                if (this.state.overrideStatus === 'warning') {
                    this.setState({
                        overrideStatus: false
                    });
                }
            }, duration || 1000);
        }
    }

    clear() {
        this.isInteracted = false;
        this.inputChangeTracker = this.props.value;
        this.setNewValue(this.props.value);
    }

    emulateChange(inputElement: HTMLInputElement, value: string) {
        const valueSetter = (
            Object.getOwnPropertyDescriptor(inputElement, 'value') || {}
        ).set;

        const prototypeValueSetter = (
            Object.getOwnPropertyDescriptor(
                Object.getPrototypeOf(inputElement),
                'value'
            ) || {}
        ).set;

        if (
            valueSetter &&
            valueSetter !== prototypeValueSetter &&
            prototypeValueSetter
        ) {
            prototypeValueSetter.call(inputElement, value);
        } else if (valueSetter) {
            valueSetter.call(inputElement, value);
        }

        inputElement.dispatchEvent(new Event('change', {bubbles: true}));
    }

    onKeyDownHandler(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onKeyDown === 'function') {
            this.props.onKeyDown(e);
        }

        if (e.target.type === 'checkbox' || e.target.type === 'radio') {
            return;
        }

        if (
            !e.target.tagName ||
            e.target.tagName.toLowerCase() !== 'input' ||
            e.metaKey ||
            e.ctrlKey ||
            e.altKey
        ) {
            return;
        }

        if (e.cancelable) {
            // RUN BLOCKERS
            if (this.inputPluginManager.runBlockers(e)) {
                e.preventDefault();
                this.highlight();
            }
        }
    }

    onChangeHandler(e: any) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }

        let newValue = null;
        let targetType = null;
        let isTargetChecked = null;

        if (objectUtils.isPureObject(e) && e.target) {
            newValue = e.target.value;
            targetType = e.target.type;
            isTargetChecked = e.target.checked;
        } else {
            newValue = e;
        }

        // INDICATE THAT THERE HAS BEEN INTERACTION
        this.isInteracted = true;

        if (
            typeof this.props.booleanInput === 'boolean'
                ? this.props.booleanInput
                : targetType === 'checkbox'
        ) {
            this.setNewValue(isTargetChecked ? 'true' : 'false');
        } else {
            this.setNewValue(newValue);
        }
    }

    onBlurHandler(e: {[string]: any}) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onBlur === 'function') {
            this.props.onBlur(e);
        }

        // INDICATE THAT THERE HAS BEEN INTERACTION
        if (!this.isInteracted) {
            this.isInteracted = true;
            if (this.props.deferValidation) {
                this.validateInput();
            }
        }

        // IMITATE onChange EVENT REAL SPECIFICATION BEHAVIOR
        if (e.target.value !== this.inputChangeTracker) {
            // RESET inputChangeTracker
            this.inputChangeTracker = e.target.value;

            if (e.target.type === 'checkbox' || e.target.type === 'radio') {
                return;
            }

            // RUN FILTERS
            const newValue = this.inputPluginManager.runFilters(e.target.value);

            if (newValue !== e.target.value) {
                // UPDATE inputChangeTracker
                this.inputChangeTracker = newValue;

                // EMULATE INPUT CHANGE
                this.emulateChange(e.target, newValue);

                this.highlight();
            }
        }
    }

    render() {
        const {
            name,
            value,
            voidValue,
            booleanInput,
            mandatory,
            keepMissingStatus,
            runFiltersBeforeValidators,
            match,
            errorMessages,
            plugins,
            stringifier,
            deferValidation,
            onValidationResult,
            onKeyDown,
            onChange,
            onBlur,
            inputRenderFn,
            ...other
        } = this.props;

        const {
            id,
            validationObject,
            setNewValue,
            setIsInteracted,
            onKeyDownHandler,
            onChangeHandler,
            onBlurHandler
        } = this;

        return (
            inputRenderFn &&
            inputRenderFn(
                {
                    ...other,
                    id,
                    name,
                    value: this.state.value,
                    onKeyDown: onKeyDownHandler,
                    onChange: onChangeHandler,
                    onBlur: onBlurHandler
                },
                {
                    status: this.state.overrideStatus || this.state.status,
                    validationObject,
                    setNewValue,
                    setIsInteracted
                }
            )
        );
    }
}

export {FormContext, InputRenderer};
export type {
    ValidationObject,
    StatusType,
    InputRendererPropsType,
    InputPluginType
};
