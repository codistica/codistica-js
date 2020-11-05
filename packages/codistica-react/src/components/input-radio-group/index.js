/** @flow */

/** @module react/components/input-radio-group */

import React from 'react';
import {default as uniqueId} from 'react-html-id';
import resetClassNames from '../../css/reset.module.scss';
import {withSophistication} from '../../hocs/with-sophistication.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import type {PluginType, StatusType} from '../../utils/input-renderer.js';
import componentClassNames from './index.module.scss';
import {styles} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

// TODO: ADD SUPPORT FOR DOUBLE CLICK (TOUCH) TO UNCHECK. ADD SUPPORT FOR INITIALLY CHECKED
// TODO: ALLOW SELECTING BY CLICKING ON 'LABEL' (TITLE) TO MATCH NATIVE BEHAVIOUR.

type CommonProps = {
    name: string,
    label: string,
    radios: {[string]: string},
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InputRadioGroupInternalProps = {
    ...CommonProps,
    id: string,
    value: string,
    status: StatusType,
    getSophistication: (...args: Array<any>) => {[string]: string}
};

/**
 * @typedef inputRadioGroupInternalPropsType
 * @property {string} id - Input ID.
 * @property {string} [value=''] - Input value.
 * @property {('valid'|'invalid'|'highlight'|'warning'|'missing'|'standBy'|null)} status - Input status.
 */

const InputRadioGroupInternal = withSophistication(
    styles,
    true
)(
    /**
     * @classdesc A beautiful radio input component (Internal).
     */
    class InputRadioGroupInternal extends React.Component<InputRadioGroupInternalProps> {
        nextUniqueId: (...args: Array<any>) => any;

        /**
         * @description Constructor.
         * @param {(inputRadioGroupPropsType|inputRadioGroupInternalPropsType)} [props] - Component props.
         */
        constructor(props: InputRadioGroupInternalProps) {
            super(props);

            uniqueId.enableUniqueIds(this);
        }

        /**
         * @instance
         * @description React render method.
         * @returns {Object<string,*>} React component.
         */
        render() {
            const {
                name,
                label,
                radios,
                value,
                status,
                style,
                className,
                customStyles,
                customClassNames,
                customColors,
                globalTheme,
                onChange,
                onBlur,
                getSophistication
            } = this.props;

            const globalStyles = globalTheme
                ? InputRadioGroup.globalStyles[globalTheme] || {}
                : {};

            const globalClassNames = globalTheme
                ? InputRadioGroup.globalClassNames[globalTheme] || {}
                : {};

            const globalColors = globalTheme
                ? InputRadioGroup.globalColors[globalTheme] || {}
                : {};

            const jssClassNames = getSophistication({
                status,
                customColors: {
                    ...globalColors,
                    ...customColors
                },
                customStyles
            });

            const mergedStyles = {
                root: mergeStyles(globalStyles.root, customStyles.root, style),
                inputRow: mergeStyles(
                    globalStyles.inputRow,
                    customStyles.inputRow
                ),
                title: mergeStyles(globalStyles.title, customStyles.title),
                inputWrapper: mergeStyles(
                    globalStyles.inputWrapper,
                    customStyles.inputWrapper
                )
            };

            const mergedClassNames = {
                root: mergeClassNames(
                    resetClassNames.root,
                    componentClassNames.root,
                    globalClassNames.root,
                    customClassNames.root,
                    className
                ),
                inputRow: mergeClassNames(
                    componentClassNames.inputRow,
                    globalClassNames.inputRow,
                    customClassNames.inputRow
                ),
                input: mergeClassNames(
                    componentClassNames.input,
                    jssClassNames.input
                ),
                label: mergeClassNames(
                    [
                        componentClassNames.blink,
                        status === 'highlight' || status === 'warning'
                    ],
                    componentClassNames.label,
                    jssClassNames.label
                ),
                title: mergeClassNames(
                    componentClassNames.title,
                    globalClassNames.title,
                    customClassNames.title
                ),
                inputWrapper: mergeClassNames(
                    componentClassNames.inputWrapper,
                    globalClassNames.inputWrapper,
                    customClassNames.inputWrapper
                )
            };

            return (
                <span
                    style={mergedStyles.root}
                    className={mergedClassNames.root}>
                    {(() => {
                        let index = 0;
                        let subId = '';
                        let output = [];
                        for (const i in radios) {
                            if (
                                !Object.prototype.hasOwnProperty.call(radios, i)
                            ) {
                                continue;
                            }
                            subId = this.nextUniqueId();
                            output.push(
                                <span
                                    key={index}
                                    style={mergedStyles.inputRow}
                                    className={mergedClassNames.inputRow}>
                                    <span
                                        style={mergedStyles.inputWrapper}
                                        className={
                                            mergedClassNames.inputWrapper
                                        }>
                                        <input
                                            id={subId}
                                            type={'radio'}
                                            name={name}
                                            value={i}
                                            checked={value === i}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={mergedClassNames.input}
                                        />
                                        <label
                                            htmlFor={subId}
                                            className={mergedClassNames.label}>
                                            {label || name}
                                        </label>
                                    </span>
                                    <span
                                        style={mergedStyles.title}
                                        className={mergedClassNames.title}>
                                        {radios[i]}
                                    </span>
                                </span>
                            );
                            index++;
                        }
                        return output;
                    })()}
                </span>
            );
        }
    }
);

type InputRadioGroupProps = {
    ...CommonProps,
    mandatory: boolean,
    keepMissingStatus: boolean,
    match: string | null,
    errorMessages: {
        mandatory?: string | null,
        match?: string | null
    },
    plugins: PluginType,
    deferValidation: boolean,
    onValidationResult: null | ((...args: Array<any>) => any)
};

type GlobalStyles = {
    [string]: CustomStyles
};

type GlobalClassNames = {
    [string]: CustomClassNames
};

type GlobalColors = {
    [string]: CustomColors
};

/**
 * @typedef inputRadioGroupErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [mandatory=null] - Mandatory error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [match=null] - Match error message.
 */

/**
 * @typedef inputRadioGroupPropsType
 * @property {string} name - Input name.
 * @property {string} [label=''] - Input label.
 * @property {Object<string,*>} [radios={}] - Radios descriptor.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {boolean} [keepMissingStatus=false] - Keep missing status after user interaction.
 * @property {(string|null)} [match=null] - Name of input that has to be matched to correctly validate.
 * @property {inputRadioGroupErrorMessagesType} [errorMessages] - Validation error messages.
 * @property {*} [plugins=[]] - Input plugins.
 * @property {boolean} [deferValidation=true] - Defer input validation until there is an interaction.
 * @property {Function} [onValidationResult=null] - Callback for validationResult event.
 * @property {Function} [onChange=null] - Callback for change event.
 * @property {Function} [onBlur=null] - Callback for blur event.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {Object<string,*>} [customColors=null] - Custom colors prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A beautiful radio input component.
 * @param {inputRadioGroupPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function InputRadioGroup(props: InputRadioGroupProps) {
    const {
        name,
        mandatory,
        keepMissingStatus,
        match,
        errorMessages,
        plugins,
        deferValidation,
        onValidationResult,
        onChange,
        onBlur,
        ...other
    } = props;
    return (
        <InputRenderer
            name={name}
            value={''}
            mandatory={mandatory}
            keepMissingStatus={keepMissingStatus}
            match={match}
            errorMessages={errorMessages}
            plugins={plugins}
            deferValidation={deferValidation}
            onValidationResult={onValidationResult}
            onChange={onChange}
            onBlur={onBlur}
            inputRenderFn={(inputProps, inputRendererAPI) => {
                return (
                    <InputRadioGroupInternal
                        {...other}
                        name={inputProps.name}
                        id={inputProps.id}
                        value={inputProps.value}
                        onChange={inputProps.onChange}
                        onBlur={inputProps.onBlur}
                        status={inputRendererAPI.status}
                    />
                );
            }}
        />
    );
}

InputRadioGroup.defaultProps = {
    label: '',
    radios: {},
    mandatory: true,
    keepMissingStatus: false,
    match: null,
    plugins: [],
    errorMessages: {
        mandatory: null,
        match: null
    },
    deferValidation: true,
    onValidationResult: null,
    onChange: null,
    onBlur: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    customColors: {},
    globalTheme: 'default'
};

InputRadioGroup.globalStyles = ({
    default: {
        root: {},
        inputRow: {},
        title: {},
        inputWrapper: {}
    }
}: GlobalStyles);

InputRadioGroup.globalClassNames = ({
    default: {
        root: '',
        inputRow: '',
        title: '',
        inputWrapper: ''
    }
}: GlobalClassNames);

InputRadioGroup.globalColors = ({
    default: {}
}: GlobalColors);

export {InputRadioGroup};
