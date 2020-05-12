/** @flow */

/** @module react/components/button */

import React from 'react';
import resetClassName from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import classNames from './index.module.scss';

type Props = {
    title: string,
    disabled: boolean,
    href: string,
    onClick: Function,
    onClickDisabled: Function,
    onTouchStart: Function,
    customStyles: {
        button?: {[string]: string},
        buttonEnabled?: {[string]: string},
        buttonDisabled?: {[string]: string}
    },
    customClassNames: {
        button?: string,
        buttonEnabled?: string,
        buttonDisabled?: string
    }
};

/**
 * @typedef buttonPropsType
 * @property {string} [title=''] - Button title.
 * @property {boolean} [disabled=false] - Button is disabled.
 * @property {Function} [onClick=null] - Callback for click event.
 * @property {Function} [onClickDisabled=null] - Callback for clickDisabled event.
 * @property {Function} [onTouchStart=null] - Callback for touchStart event.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @classdesc A simple button component.
 */
class Button extends React.Component<Props> {
    static defaultProps = {
        title: '',
        disabled: false,
        href: null,
        onClick: null,
        onClickDisabled: null,
        onTouchStart: null,
        customStyles: {},
        customClassNames: {}
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
            customStyles,
            customClassNames
        } = this.props;

        const buttonStyles = mergeStyles(
            customStyles.button,
            disabled ? customStyles.buttonDisabled : customStyles.buttonEnabled
        );

        const anchorClassNames = mergeClassNames({
            [resetClassName.root]: href
        });

        const buttonClassNames = mergeClassNames(
            {
                [resetClassName.root]: !href,
                [classNames.buttonEnabled]: !disabled,
                [classNames.buttonDisabled]: disabled
            },
            customClassNames.button,
            {
                [customClassNames.buttonEnabled || '']: !disabled
            },
            {
                [customClassNames.buttonDisabled || '']: disabled
            }
        );

        const ButtonComponent = (
            <button
                type={'button'}
                onClick={this.onClickHandler}
                onTouchStart={(e) => {
                    onTouchStart && onTouchStart(e);
                }}
                style={buttonStyles}
                className={buttonClassNames}>
                {title}
            </button>
        );

        return href ? (
            <a
                tabIndex={-1}
                href={href}
                target={'_blank'}
                rel={'noopener noreferrer'}
                className={anchorClassNames}>
                {ButtonComponent}
            </a>
        ) : (
            ButtonComponent
        );
    }
}

export {Button};
