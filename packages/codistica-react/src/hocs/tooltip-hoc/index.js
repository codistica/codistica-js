/** @flow */

/** @module react/hocs/tooltip-hoc */

import classnames from 'classnames/dedupe';
import React from 'react';
import type {ComponentType} from 'react';
import styles from './index.module.scss';

/**
 * @description Creates a higher order component with customizable tooltip capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function tooltipHOC(Component: ComponentType<any> | string) {
    type HOCProps = {
        children: any,
        className: string,
        tooltipText: string,
        forwardedRef: Function
    };

    /**
     * @typedef tooltipHOCPropsType
     * @property {*} [children=null] - React prop.
     * @property {string} [className=''] - React prop.
     * @property {string} [tooltipText=''] - Tooltip text.
     * @property {Function} [forwardedRef=null] - React prop.
     */

    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<HOCProps> {
        static defaultProps = {
            children: null,
            className: '',
            tooltipText: '',
            forwardedRef: null
        };

        componentRef: any;

        /**
         * @description Constructor.
         * @param {tooltipHOCPropsType} [props] - Component props.
         */
        constructor(props: HOCProps) {
            super(props);

            this.componentRef = null;

            // BIND METHODS
            (this: Function).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description Save and pass component reference.
         * @param {Object<string,*>} ref - Component reference.
         * @returns {void} Void.
         */
        setComponentRef(ref: any) {
            // FORWARD REF
            const {forwardedRef} = this.props;
            if (typeof forwardedRef === 'function') {
                forwardedRef(ref);
            } else if (
                typeof forwardedRef === 'object' &&
                forwardedRef !== null &&
                typeof forwardedRef.current !== 'undefined'
            ) {
                forwardedRef.current = ref;
            }
            // SAVE REF
            this.componentRef = ref;
        }

        /**
         * @instance
         * @description React render method.
         * @returns {Object<string,*>} React component.
         */
        render() {
            const {
                children,
                className,
                tooltipText,
                forwardedRef,
                ...others
            } = this.props;
            const mainClassName = classnames(
                {[className]: !!className},
                {[styles.container]: true}
            );
            return (
                <Component
                    {...others}
                    className={mainClassName}
                    ref={this.setComponentRef}
                    tabIndex={0}>
                    <span className={styles.tooltip}>{tooltipText}</span>
                    {children}
                </Component>
            );
        }
    }

    return (React: Function).forwardRef(
        (props: {[string]: any}, ref: Function) => {
            return <HOC {...props} forwardedRef={ref} />;
        }
    );
}

export {tooltipHOC};
