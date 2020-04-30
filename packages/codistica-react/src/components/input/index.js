/** @flow */

/** @module react/components/input */

import {eventUtils, arrayUtils} from '@codistica/core';
import classnames from 'classnames/dedupe';
import React from 'react';
import uniqueId from 'react-html-id';
import styles from './index.module.scss';

type Preset = {
    validators?: Validator | Array<Validator>,
    filters?: Filter | Array<Filter>,
    blockers?: Blocker | Array<Blocker>
};
type Validator = Function | RegExp | string;
type Filter = Function;
type Blocker = Function;

// TODO: SPLIT IN InputRadio, InputCheckbox and InputText THAT EXTENDS InputCore! TO SHORTEN FILE AND SIMPLIFY RENDER METHOD.

// TODO: SUPPORT FOR any TYPE value IN PROPS?
// TODO: RADIOS: ADD SUPPORT FOR DOUBLE CLICK (TOUCH) TO UNCHECK. ADD SUPPORT FOR INITIALLY CHECKED (IN radioButtons?)
// TODO: IMPROVE FOCUS WHEN INPUT HAS VALUE
// TODO: IMPROVE radio TITLES SYSTEM. MAKE A LITTLE MORE CUSTOMIZABLE?
// TODO: MAKE label = name WHEN NOT SPECIFIED?

type Props = {
    name: string,
    label: string,
    type: string,
    value: string,
    checked: boolean | null,
    radioButtons: Object,
    placeholder: string,
    style: Object,
    containerStyle: Object,
    className: string,
    containerClassName: string,
    onRegistration: Function,
    onKeyDown: Function,
    onInput: Function,
    onChangeFixed: Function,
    onChange: Function,
    onBlur: Function,
    onAPI: Function,
    onValidationResult: Function,
    presets: Preset | Array<Preset>,
    validators: Validator | Array<Validator>,
    filters: Filter | Array<Filter>,
    blockers: Blocker | Array<Blocker>
};

type State = {
    id: string,
    name: string,
    value: string,
    isType: boolean,
    isRadio: boolean,
    isCheckbox: boolean,
    isChecked: boolean | null,
    isValid: boolean | null,
    isWarning: boolean,
    isHighlight: boolean
};

// TODO: DOCUMENT FUNCTIONS?
type InputAPI = {
    state: State,
    setValidation: Function,
    overrideValidation: Function,
    blinkHighlight: Function,
    blinkWarning: Function
};

const InputContext: Object = React.createContext({
    onRegistration: null,
    onValidationResult: null
});

// TODO: CREATE THEMES. RESET BROWSERS AUTOFILL STYLES!
/**
 * @typedef inputPropsType
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [type='text'] - Input type.
 * @property {string} [value=''] - Input value.
 * @property {(boolean|null)} [checked=null] - Input checked attribute.
 * @property {Object<string,*>} [radioButtons={}] - Radio buttons object.
 * @property {string} [placeholder=''] - Input placeholder.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {Object<string,*>} [containerStyle={}] - Style to be applied to container element.
 * @property {string} [className=''] - React prop.
 * @property {string} [containerClassName=''] - ClassName to be applied to container element.
 * @property {Function} [onRegistration=null] - Callback for registration event.
 * @property {Function} [onKeyDown=null] - Callback for key down event.
 * @property {Function} [onInput=null] - Callback for input event.
 * @property {Function} [onChangeFixed=null] - Callback for fixed change event.
 * @property {Function} [onChange=null] - Callback for change event.
 * @property {Function} [onBlur=null] - Callback for blur event.
 * @property {Function} [onAPI=null] - Callback for API event.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Array<*>} [presets=[]] - Input validation presets array.
 * @property {Array<*>} [validator=[]] - Input validators array.
 * @property {Array<*>} [filters=[]] - Input filters array.
 * @property {Array<*>} [blockers=[]] - Input blockers array.
 */

/**
 * @classdesc A draggable component.
 */
class Input extends React.Component<Props, State> {
    static contextType = InputContext;

    static defaultProps = {
        name: '',
        label: '',
        type: 'text',
        value: '',
        checked: null,
        radioButtons: {},
        placeholder: '',
        style: {},
        containerStyle: {},
        className: '',
        containerClassName: '',
        onRegistration: null,
        onKeyDown: null,
        onInput: null,
        onChangeFixed: null,
        onChange: null,
        onBlur: null,
        onAPI: null,
        onValidationResult: null,
        presets: [],
        validators: [],
        filters: [],
        blockers: []
    };

    nextUniqueId: Function;
    changeTracker: string;
    externalValidation: boolean | null | typeof undefined;
    externalOverrideValidation: boolean | null | typeof undefined;
    isValidating: boolean;
    inputRef: Object;
    API: Object;
    presets: Array<Preset>;
    validators: Array<Validator>;
    filters: Array<Filter>;
    blockers: Array<Blocker>;

    // TODO: ADD CLEAR INPUT BUTTON AND SHOW PASSWORD BUTTON OPTIONS (WITH FOCUS SUPPORT). SUPPORT FOR interpretation TOOLTIP?
    /**
     * @description Constructor.
     * @param {inputPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        /**
         * @function normalizePlugin
         * @description Normalizes received plugin structure.
         * @param {*} input - Input.
         * @returns {Array<*>} Output.
         */
        const normalizePlugin = function normalizePlugin(input: any) {
            return Array.isArray(input) ? arrayUtils.flatten(input) : [input];
        };

        const isType = props.type !== 'checkbox' && props.type !== 'radio';
        const isRadio = props.type === 'radio';
        const isCheckbox = props.type === 'checkbox';
        const value = isType
            ? props.value
            : isRadio
            ? ''
            : props.checked
            ? props.value
            : '';

        uniqueId.enableUniqueIds(this);

        this.changeTracker = value;
        this.externalValidation = undefined;
        this.externalOverrideValidation = undefined;
        this.isValidating = false;
        this.inputRef = {};

        this.state = {
            id: this.nextUniqueId(),
            name: props.name,
            value: value,
            isType: isType,
            isRadio: isRadio,
            isCheckbox: isCheckbox,
            isChecked: isCheckbox ? props.checked || false : null,
            isValid: null,
            isWarning: false,
            isHighlight: false
        };

        // BIND METHODS
        (this: Function).onKeyDown = this.onKeyDown.bind(this);
        (this: Function).onInput = this.onInput.bind(this);
        (this: Function).onChangeFixed = this.onChangeFixed.bind(this);
        (this: Function).onChange = this.onChange.bind(this);
        (this: Function).onBlur = this.onBlur.bind(this);
        (this: Function).setValue = this.setValue.bind(this);
        (this: Function).setValidation = this.setValidation.bind(this);
        (this: Function).overrideValidation = this.overrideValidation.bind(
            this
        );
        (this: Function).validateInput = this.validateInput.bind(this);
        (this: Function).blinkHighlight = this.blinkHighlight.bind(this);
        (this: Function).blinkWarning = this.blinkWarning.bind(this);
        (this: Function).setInputRef = this.setInputRef.bind(this);

        this.API = {
            state: this.state,
            setValidation: this.setValidation,
            overrideValidation: this.overrideValidation,
            blinkHighlight: this.blinkHighlight,
            blinkWarning: this.blinkWarning
        };

        this.presets = [];
        this.validators = [];
        this.filters = [];
        this.blockers = [];

        // LOAD PRESETS
        this.presets = this.presets.concat(normalizePlugin(props.presets));
        this.presets.forEach((preset: Preset) => {
            if (typeof preset === 'object' && preset !== null) {
                if (typeof preset.validators !== 'undefined') {
                    this.validators = this.validators.concat(
                        normalizePlugin(preset.validators)
                    );
                }
                if (typeof preset.filters !== 'undefined') {
                    this.filters = this.filters.concat(
                        normalizePlugin(preset.filters)
                    );
                }
                if (typeof preset.blockers !== 'undefined') {
                    this.blockers = this.blockers.concat(
                        normalizePlugin(preset.blockers)
                    );
                }
            }
        });

        // GET VALIDATORS
        this.validators = this.validators.concat(
            normalizePlugin(props.validators)
        );
        this.validators = this.validators.map((validator) => {
            let response = null;
            if (typeof validator === 'function') {
                response = validator('');
                if (
                    typeof response === 'function' ||
                    typeof response === 'string' ||
                    response instanceof RegExp
                ) {
                    return response;
                } else {
                    return validator;
                }
            } else {
                return validator;
            }
        });

        // GET FILTERS
        this.filters = this.filters.concat(normalizePlugin(props.filters));
        this.filters = this.filters.map((filter) => {
            let response = null;
            if (typeof filter === 'function') {
                response = filter('');
                if (typeof response === 'function') {
                    return response;
                } else {
                    return filter;
                }
            } else {
                return filter;
            }
        });

        // GET BLOCKERS
        this.blockers = this.blockers.concat(normalizePlugin(props.blockers));
        this.blockers = this.blockers.map((blocker) => {
            let response = null;
            if (typeof blocker === 'function') {
                response = blocker(eventUtils.getMockEvent());
                if (typeof response === 'function') {
                    return response;
                } else {
                    return blocker;
                }
            } else {
                return blocker;
            }
        });

        // TODO: WARN ABOUT NOT VALID PROPS FOR SELECTED type
        // TODO: ERROR IF isRadio AND NO NAME?
        // TODO: WARN IF value AND radioButtons
    }

    componentDidMount() {
        // EXPOSE API
        if (typeof this.props.onAPI === 'function') {
            this.props.onAPI(this.API);
        }

        // REGISTER INPUT
        if (typeof this.context.onRegistration === 'function') {
            this.context.onRegistration(this.state.id, this.API);
        }
        if (typeof this.props.onRegistration === 'function') {
            this.props.onRegistration(this.state.id, this.API);
        }

        // VALIDATE INITIAL VALUE
        this.validateInput();
    }

    /**
     * @instance
     * @description Handler for keyDown event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onKeyDown(e: Object) {
        const isPrintable = e.key && e.key.length === 1;

        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onKeyDown === 'function') {
            this.props.onKeyDown(e);
        }

        if (this.state.isType) {
            if (e.cancelable) {
                // CALL BLOCKERS
                this.blockers.forEach((elem) => {
                    if (typeof elem === 'function') {
                        if (
                            isPrintable &&
                            elem({
                                target: {
                                    selectionStart: e.target.selectionStart,
                                    selectionEnd: e.selectionEnd,
                                    value: e.target.value
                                },
                                key: e.key
                            })
                        ) {
                            e.preventDefault();
                        }
                    }
                });

                if (e.defaultPrevented) {
                    this.blinkHighlight();
                }
            }
        }
    }

    /**
     * @instance
     * @description Handler for input event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onInput(e: Object) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onInput === 'function') {
            this.props.onInput(e);
        }

        if (this.state.isType) {
            // UPDATE INPUT
            this.setValue(e.target.value);
        }
    }

    /**
     * @instance
     * @description Handler for change fixed event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChangeFixed(e: Object) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChangeFixed === 'function') {
            this.props.onChangeFixed(e);
        }

        if (this.state.isType) {
            // CALL FILTERS
            e.target.value = this.filters.reduce((acc, elem) => {
                let result = null;
                if (typeof elem === 'function') {
                    result = elem(acc);
                    if (typeof result === 'string') {
                        return result;
                    } else {
                        return acc;
                    }
                } else {
                    return acc;
                }
            }, e.target.value);

            // UPDATE INPUT
            this.setValue(e.target.value, true);
        }
    }

    /**
     * @instance
     * @description Handler for change event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChange(e: Object) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onChange === 'function') {
            this.props.onChange();
        }

        if (!this.state.isType) {
            // UPDATE INPUT
            if (this.state.isRadio) {
                this.setValue(e.target.value);
            } else {
                this.setState({isChecked: e.target.checked}); // TODO: GOES HERE? MERGE WITH setValue()?
                this.setValue(e.target.checked ? this.props.value : '');
            }
        }
    }

    /**
     * @instance
     * @description Handler for blur event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onBlur(e: Object) {
        // CHAIN PASSED EVENT HANDLER IF NECESSARY
        if (typeof this.props.onBlur === 'function') {
            this.props.onBlur();
        }

        // EMULATE REAL onChange EVENT BEHAVIOUR
        if (e.target.value !== this.changeTracker) {
            this.onChangeFixed(
                eventUtils.getMockEvent({
                    ...e,
                    type: 'change'
                })
            );

            // RESET changeTracker
            this.changeTracker = e.target.value;
        }
    }

    /**
     * @instance
     * @description Set input value.
     * @param {string} value - New value.
     * @param {boolean} [blink] - Blink input after setting value.
     * @returns {void} Void.
     */
    setValue(value: string, blink?: boolean) {
        if (value !== this.state.value) {
            // SET NEW VALUE
            this.setState({value});
            // BLINK IF REQUESTED
            blink && this.blinkHighlight();
            // VALIDATE NEW VALUE
            this.validateInput(value);
        }
    }

    /**
     * @instance
     * @description Set input validation result.
     * @param {(boolean|null)} result - Validation result to be set.
     * @returns {void} Void.
     */
    setValidation(result: boolean | null) {
        if (result !== this.externalValidation) {
            this.externalValidation = result;
            this.validateInput();
        }
    }

    /**
     * @instance
     * @description Override input validation result.
     * @param {(boolean|null)} result - Validation result to be set.
     * @returns {void} Void.
     */
    overrideValidation(result: boolean | null) {
        if (result !== this.externalOverrideValidation) {
            this.externalOverrideValidation = result;
            this.validateInput();
        }
    }

    /**
     * @instance
     * @description Run input validation process.
     * @param {string} [value] - Value to be used for validation. Value saved in state is used by default.
     * @returns {void} Void.
     */
    validateInput(value?: string) {
        let isValid = null;
        let validationResult = null;
        let validationReport = [];

        value = typeof value === 'string' ? value : this.state.value;

        if (this.isValidating) {
            return;
        }

        this.isValidating = true;

        // CALL VALIDATORS
        if (value.length !== 0 && this.validators.length !== 0) {
            validationResult = this.validators.every((elem) => {
                let result = null;
                let report = null;
                if (typeof elem === 'function') {
                    ({result, report} = elem(value));
                    validationReport.push(report);
                    return result;
                } else if (typeof elem === 'string') {
                    return elem === value;
                } else if (
                    elem instanceof RegExp &&
                    typeof value === 'string'
                ) {
                    return elem.test(value);
                } else {
                    return true;
                }
            });
        }

        // EMIT VALIDATION RESULT
        if (typeof this.context.onValidationResult === 'function') {
            this.context.onValidationResult(this.state.id, value, {
                validationResult,
                validationReport
            });
        }
        if (typeof this.props.onValidationResult === 'function') {
            this.props.onValidationResult(this.state.id, value, {
                validationResult,
                validationReport
            });
        }

        // VALIDATION PRIORITY LOGIC
        if (typeof this.externalOverrideValidation !== 'undefined') {
            isValid = this.externalOverrideValidation;
        } else {
            if (typeof this.externalValidation !== 'undefined') {
                isValid =
                    (validationResult !== null ? validationResult : true) &&
                    this.externalValidation;
            } else {
                isValid = validationResult;
            }
        }

        this.setState({
            isValid: isValid
        });

        this.isValidating = false;
    }

    blinkHighlight() {
        if (!this.state.isWarning && !this.state.isHighlight) {
            this.setState({
                isHighlight: true
            });
            setTimeout(() => {
                this.setState({
                    isHighlight: false
                });
            }, 900);
        }
    }

    blinkWarning() {
        if (!this.state.isWarning && !this.state.isHighlight) {
            this.setState({
                isWarning: true
            });
            setTimeout(() => {
                this.setState({
                    isWarning: false
                });
            }, 900);
        }
    }

    /**
     * @instance
     * @description Save component reference.
     * @param {Object<string,*>} ref - Component reference.
     * @param {string} id - Input id.
     * @returns {void} Void.
     */
    setInputRef(ref: Object, id: string) {
        this.inputRef[id] = ref;
    }

    /**
     * @instance
     * @description React render method.
     * @returns {React.Component} React component.
     */
    render() {
        const {
            label,
            type,
            radioButtons,
            placeholder,
            style,
            containerStyle,
            className,
            containerClassName,
            onRegistration,
            onChangeFixed,
            onAPI,
            onValidationResult,
            presets,
            validators,
            filters,
            blockers,
            ...others
        } = this.props;

        const {
            id,
            name,
            value,
            isType,
            isRadio,
            isChecked,
            isValid,
            isHighlight,
            isWarning
        } = this.state;

        const mainClassName = classnames(styles.main);

        const inputClassName = classnames(
            {[styles._valid]: isValid},
            {[styles._invalid]: isValid !== null && !isValid},
            {[styles._isHighlight]: isHighlight},
            {[styles._isWarning]: isWarning}
        );

        const classNames = {
            isType: {
                main: classnames(
                    containerClassName,
                    mainClassName,
                    styles.typeInput
                ),
                input: classnames(className, inputClassName)
            },
            isRadio: {
                main: classnames(
                    containerClassName,
                    mainClassName,
                    styles.radioGroupContainer
                ),
                inputParent: classnames(className, styles.nonTypeInput),
                input: inputClassName
            },
            isCheckbox: {
                main: classnames(className, mainClassName, styles.nonTypeInput),
                input: inputClassName
            }
        };

        // UPDATE API STATE
        this.API.state = this.state;

        if (isType) {
            return (
                <span style={containerStyle} className={classNames.isType.main}>
                    <input
                        {...others}
                        ref={(ref) => {
                            this.setInputRef(ref, id);
                        }}
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        style={style}
                        className={classNames.isType.input}
                        onKeyDown={this.onKeyDown}
                        onInput={this.onInput}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                    />
                    <label htmlFor={id}>{label}</label>
                </span>
            );
        } else {
            if (isRadio) {
                return (
                    <span
                        style={containerStyle}
                        className={classNames.isRadio.main}>
                        {(() => {
                            let index = 0;
                            let subId = '';
                            let output = [];
                            for (const i in radioButtons) {
                                if (
                                    !Object.prototype.hasOwnProperty.call(
                                        radioButtons,
                                        i
                                    )
                                ) {
                                    continue;
                                }
                                subId = this.nextUniqueId();
                                output.push(
                                    <span
                                        className={styles.radioWrapper}
                                        key={index}>
                                        <span
                                            style={style}
                                            className={
                                                classNames.isRadio.inputParent
                                            }>
                                            <input
                                                {...others}
                                                ref={(ref) => {
                                                    this.setInputRef(
                                                        ref,
                                                        subId
                                                    );
                                                }}
                                                id={subId}
                                                type={type}
                                                name={name}
                                                value={i}
                                                checked={value === i}
                                                className={
                                                    classNames.isRadio.input
                                                }
                                                onChange={this.onChange}
                                            />
                                            <label htmlFor={subId}>
                                                {label}
                                            </label>
                                        </span>
                                        <span className={styles.radioTitle}>
                                            {radioButtons[i]}
                                        </span>
                                    </span>
                                );
                                index++;
                            }
                            return output;
                        })()}
                    </span>
                );
            } else {
                return (
                    <span style={style} className={classNames.isCheckbox.main}>
                        <input
                            {...others}
                            ref={(ref) => {
                                this.setInputRef(ref, id);
                            }}
                            id={id}
                            type={type}
                            name={name}
                            value={value}
                            checked={isChecked}
                            className={classNames.isCheckbox.input}
                            onChange={this.onChange}
                        />
                        <label htmlFor={id}>{label}</label>
                    </span>
                );
            }
        }
    }
}

export type {InputAPI};
export {InputContext, Input};
