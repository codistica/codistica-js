/** @flow */

/** @module react/hocs/with-tooltip */

import React from 'react';
import type {ComponentType} from 'react';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import classNames from './index.module.scss';

/**
 * @description Creates a higher order component with customizable tooltip capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withTooltip(Component: ComponentType<any> | string) {
    type HOCProps = {
        tooltipRenderFn: Function,
        children: any,
        forwardedRef: Function,
        className: string
    };

    /**
     * @typedef withTooltipPropsType
     * @property {Function} [tooltipRenderFn=null] - Tooltip render prop.
     * @property {*} [children=null] - React prop.
     * @property {Function} [forwardedRef=null] - React prop.
     * @property {string} [className=''] - React prop.
     */

    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<HOCProps> {
        static defaultProps = {
            tooltipRenderFn: null,
            children: null,
            forwardedRef: null,
            className: ''
        };

        componentRef: any;

        /**
         * @description Constructor.
         * @param {withTooltipPropsType} [props] - Component props.
         */
        constructor(props: HOCProps) {
            super(props);

            this.componentRef = null;

            // BIND METHODS
            (this: any).setComponentRef = this.setComponentRef.bind(this);
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
                tooltipRenderFn,
                children,
                forwardedRef,
                className,
                ...other
            } = this.props;

            const rootClassNames = mergeClassNames(className, classNames.root);

            return (
                <Component
                    {...other}
                    ref={this.setComponentRef}
                    tabIndex={0}
                    className={rootClassNames}>
                    <span className={classNames.tooltip}>
                        {tooltipRenderFn ? tooltipRenderFn() : null}
                    </span>
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

export {withTooltip};
