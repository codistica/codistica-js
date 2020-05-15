/** @flow */

/** @module react/components/button */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    title: string,
    disabled: boolean,
    href: string,
    onClick: (...args: Array<any>) => any,
    onClickDisabled: (...args: Array<any>) => any,
    onTouchStart: (...args: Array<any>) => any,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any},
        button?: {[string]: any},
        buttonEnabled?: {[string]: any},
        buttonDisabled?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        button?: string,
        buttonEnabled?: string,
        buttonDisabled?: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any},
        button: {[string]: any},
        buttonEnabled: {[string]: any},
        buttonDisabled: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string,
        button: string,
        buttonEnabled: string,
        buttonDisabled: string
    }
};

/**
 * @typedef buttonPropsType
 * @property {string} [title=''] - Button title.
 * @property {boolean} [disabled=false] - Button is disabled.
 * @property {Function} [onClick=null] - Callback for click event.
 * @property {Function} [onClickDisabled=null] - Callback for clickDisabled event.
 * @property {Function} [onTouchStart=null] - Callback for touchStart event.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @classdesc A simple button component.
 */
class Button extends React.Component<Props> {
    static globalStyles: GlobalStyles = {
        default: {
            root: {},
            button: {},
            buttonEnabled: {},
            buttonDisabled: {}
        }
    };

    static globalClassNames: GlobalClassNames = {
        default: {
            root: '',
            button: '',
            buttonEnabled: '',
            buttonDisabled: ''
        }
    };

    static defaultProps = {
        title: '',
        disabled: false,
        href: null,
        onClick: null,
        onClickDisabled: null,
        onTouchStart: null,
        style: {},
        className: '',
        customStyles: {},
        customClassNames: {},
        globalTheme: 'default'
    };

    /**
     * @description Constructor.
     * @param {buttonPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        // BIND METHODS
        (this: any).onClickHandler = this.onClickHandler.bind(this);
    }

    /**
     * @instance
     * @description Callback for click event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onClickHandler(e: {[string]: any}) {
        if (this.props.disabled) {
            if (typeof this.props.onClickDisabled === 'function') {
                this.props.onClickDisabled(e);
            }
        } else {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(e);
            }
        }
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            title,
            disabled,
            href,
            onTouchStart,
            className,
            style,
            customStyles,
            customClassNames,
            globalTheme
        } = this.props;

        const globalStyles = globalTheme
            ? Button.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? Button.globalClassNames[globalTheme] || {}
            : {};

        const mergedStyles = {
            button: mergeStyles(
                [globalStyles.root, !href],
                globalStyles.button,
                [globalStyles.buttonDisabled, disabled],
                [globalStyles.buttonEnabled, !disabled],
                [customStyles.root, !href],
                customStyles.button,
                [customStyles.buttonDisabled, disabled],
                [customStyles.buttonEnabled, !disabled],
                [style, !href]
            ),
            anchor: href
                ? mergeStyles(globalStyles.root, customStyles.root, style)
                : undefined
        };

        const mergedClassNames = {
            button: mergeClassNames(
                [resetClassNames.root, !href],
                [componentClassNames.buttonEnabled, !disabled],
                [componentClassNames.buttonDisabled, disabled],
                [globalClassNames.root, !href],
                globalClassNames.button,
                [globalClassNames.buttonDisabled, disabled],
                [globalClassNames.buttonEnabled, !disabled],
                [customClassNames.root, !href],
                customClassNames.button,
                [customClassNames.buttonDisabled, disabled],
                [customClassNames.buttonEnabled, !disabled],
                [className, !href]
            ),
            anchor: href
                ? mergeClassNames(
                      resetClassNames.root,
                      globalClassNames.root,
                      customClassNames.root,
                      className
                  )
                : undefined
        };

        const ButtonComponent = (
            <button
                type={'button'}
                onClick={this.onClickHandler}
                onTouchStart={(e) => {
                    onTouchStart && onTouchStart(e);
                }}
                style={mergedStyles.button}
                className={mergedClassNames.button}>
                {title}
            </button>
        );

        return href ? (
            <a
                tabIndex={-1}
                href={href}
                target={'_blank'}
                rel={'noopener noreferrer'}
                style={mergedStyles.anchor}
                className={mergedClassNames.anchor}>
                {ButtonComponent}
            </a>
        ) : (
            ButtonComponent
        );
    }
}

export {Button};
