/** @flow */

import React from 'react';
import type {ComponentType} from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    component: ComponentType<any> | string,
    title: string,
    disabled: boolean,
    href: null | string,
    onClick: null | ((...args: Array<any>) => any),
    onClickEnabled: null | ((...args: Array<any>) => any),
    onClickDisabled: null | ((...args: Array<any>) => any),
    onTouchStart: null | ((...args: Array<any>) => any),
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
        root?: {[string]: any},
        button?: {[string]: any},
        buttonEnabled?: {[string]: any},
        buttonDisabled?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string,
        button?: string,
        buttonEnabled?: string,
        buttonDisabled?: string
    }
};

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
        component: 'button',
        title: '',
        disabled: false,
        href: null,
        onClick: null,
        onClickEnabled: null,
        onClickDisabled: null,
        onTouchStart: null,
        style: {},
        className: '',
        customStyles: {},
        customClassNames: {},
        globalTheme: 'default'
    };

    constructor(props: Props) {
        super(props);

        // BIND METHODS
        (this: any).onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e: {[string]: any}) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(e);
        }
        if (this.props.disabled) {
            if (typeof this.props.onClickDisabled === 'function') {
                this.props.onClickDisabled(e);
            }
        } else {
            if (typeof this.props.onClickEnabled === 'function') {
                this.props.onClickEnabled(e);
            }
        }
    }

    render() {
        const {
            component: Component,
            title,
            disabled,
            href,
            onTouchStart,
            onClickEnabled,
            onClickDisabled,
            className,
            style,
            customStyles,
            customClassNames,
            globalTheme,
            ...other
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
                [resetClassNames.greedy, !href],
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
                      resetClassNames.greedy,
                      globalClassNames.root,
                      customClassNames.root,
                      className
                  )
                : undefined
        };

        const ButtonComponent = (
            <Component
                {...other}
                type={'button'}
                onClick={this.onClickHandler}
                onTouchStart={(e) => {
                    if (onTouchStart) {
                        onTouchStart(e);
                    }
                }}
                style={mergedStyles.button}
                className={mergedClassNames.button}>
                {title}
            </Component>
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
