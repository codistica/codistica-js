/** @flow */

/** @module react/components/button */

import classnames from 'classnames/dedupe';
import React from 'react';
import styles from './index.module.scss';

type Props = {
    className: string,
    text: string,
    dark: boolean,
    disabled: boolean,
    onClick: Function,
    onClickDisabled: Function
};

/**
 * @typedef buttonPropsType
 * @property {string} [className=''] - React prop.
 * @property {string} [text=''] - Button text.
 * @property {boolean} [dark=false] - Use dark theme.
 * @property {boolean} [disabled=false] - Button is disabled.
 * @property {Function} [onClick=null] - Callback for click event.
 * @property {Function} [onClickDisabled=null] - Callback for click event when button is disabled.
 */

/**
 * @classdesc A simple button component.
 */
class Button extends React.Component<Props> {
    static defaultProps = {
        className: '',
        text: '',
        dark: false,
        disabled: false,
        onClick: null,
        onClickDisabled: null
    };

    /**
     * @description Constructor.
     * @param {buttonPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        // BIND METHODS
        (this: Function).onClick = this.onClick.bind(this);
    }

    /**
     * @instance
     * @description Handler for click event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onClick(e: Object) {
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
     * @returns {React.Component} React component.
     */
    render() {
        const {
            dark,
            text,
            className,
            disabled,
            onClickDisabled,
            ...others
        } = this.props;
        const mainClassName = classnames(
            {[className]: className},
            {[styles.button]: true},
            {[styles.dark]: dark},
            {[styles.light]: !dark},
            {[styles.disabled]: disabled}
        );
        return (
            <button
                {...others}
                className={mainClassName}
                type={'button'}
                onClick={this.onClick}>
                {text}
            </button>
        );
    }
}

export {Button};
