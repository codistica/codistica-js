/** @flow */

/** @module react/components/input-checkbox */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {InputRenderer} from '../../utils/input-renderer.js';
import type {PluginType, StatusType} from '../../utils/input-renderer.js';
import componentClassNames from './index.module.scss';
import {sophistication} from './index.sophistication.js';
import type {
    CustomStyles,
    CustomClassNames,
    CustomColors
} from './index.sophistication.js';

// TODO: ALLOW CHECKING BY CLICKING ON 'LABEL' (TITLE) TO MATCH NATIVE BEHAVIOUR.

type CommonProps = {
    name: string,
    label: string,
    checked: boolean,
    onChange: null | ((...args: Array<any>) => any),
    onBlur: null | ((...args: Array<any>) => any),
    style: {[string]: any},
    className: string,
    customStyles: CustomStyles,
    customClassNames: CustomClassNames,
    customColors: CustomColors,
    globalTheme: 'default' | string | null
};

type InputCheckboxInternalProps = {
    ...CommonProps,
    id: string,
    status: StatusType
};

/**
 * @typedef inputCheckboxInternalPropsType
 * @property {string} id - Input ID.
 * @property {('valid'|'invalid'|'highlight'|'warning'|'missing'|'standBy'|null)} status - Input status.
 */

/**
 * @classdesc A beautiful checkbox input component (Internal).
 */
class InputCheckboxInternal extends React.Component<InputCheckboxInternalProps> {
    /**
     * @description Constructor.
     * @param {(inputCheckboxPropsType|inputCheckboxInternalPropsType)} [props] - Component props.
     */
    constructor(props: InputCheckboxInternalProps) {
        super(props);

        sophistication.setup(this);
    }

    /**
     * @instance
     * @description React lifecycle.
     * @returns {void} Void.
     */
    componentWillUnmount() {
        sophistication.destroy(this);
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            id,
            name,
            label,
            checked,
            status,
            style,
            className,
            customStyles,
            customClassNames,
            customColors,
            globalTheme,
            onChange,
            onBlur
        } = this.props;

        const globalStyles = globalTheme
            ? InputCheckbox.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? InputCheckbox.globalClassNames[globalTheme] || {}
            : {};

        const globalColors = globalTheme
            ? InputCheckbox.globalColors[globalTheme] || {}
            : {};

        const jssClassNames = sophistication.getClassNames(this, {
            status,
            customColors: {
                ...globalColors,
                ...customColors
            },
            customStyles
        });

        const mergedStyles = {
            root: mergeStyles(globalStyles.root, customStyles.root, style)
        };

        const mergedClassNames = {
            root: mergeClassNames(
                resetClassNames.root,
                componentClassNames.root,
                globalClassNames.root,
                customClassNames.root,
                className
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
            )
        };

        return (
            <span style={mergedStyles.root} className={mergedClassNames.root}>
                <input
                    type={'checkbox'}
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={mergedClassNames.input}
                />
                <label htmlFor={id} className={mergedClassNames.label}>
                    {label || name}
                </label>
            </span>
        );
    }
}

type InputCheckboxProps = {
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

/**
 * @typedef inputCheckboxErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [mandatory=null] - Mandatory error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [match=null] - Match error message.
 */

/**
 * @typedef inputCheckboxPropsType
 * @property {string} name - Input name.
 * @property {string} [label=''] - Input label.
 * @property {boolean} [checked=null] - Input checked attribute.
 * @property {boolean} [mandatory=false] - Input mandatory flag.
 * @property {boolean} [keepMissingStatus=false] - Keep missing status after user interaction.
 * @property {(string|null)} [match=null] - Name of input that has to be matched to correctly validate.
 * @property {inputCheckboxErrorMessagesType} [errorMessages] - Validation error messages.
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
 * @description A beautiful checkbox input component.
 * @param {inputCheckboxPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function InputCheckbox(props: InputCheckboxProps) {
    const {
        name,
        checked,
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
            value={checked ? 'true' : 'false'}
            voidValue={'false'}
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
                    <InputCheckboxInternal
                        {...other}
                        name={inputProps.name}
                        id={inputProps.id}
                        checked={inputProps.value === 'true'}
                        onChange={inputProps.onChange}
                        onBlur={inputProps.onBlur}
                        status={inputRendererAPI.status}
                    />
                );
            }}
        />
    );
}

InputCheckbox.defaultProps = {
    label: '',
    checked: false,
    mandatory: true,
    keepMissingStatus: false,
    match: null,
    errorMessages: {
        mandatory: null,
        match: null
    },
    plugins: [],
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

InputCheckbox.globalStyles = {
    default: {
        root: {},
        img: {}
    }
};

InputCheckbox.globalClassNames = {
    default: {
        root: '',
        img: ''
    }
};

InputCheckbox.globalColors = {
    default: {}
};

export {InputCheckbox};
