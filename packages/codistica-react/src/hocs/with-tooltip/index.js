/** @flow */

/** @module react/hocs/with-tooltip */

import React from 'react';
import type {AbstractComponent, Config} from 'react';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import componentClassNames from './index.module.scss';

type Props = {
    tooltipRenderFn: null | ((...args: Array<any>) => any),
    children: any,
    forwardedRef: any,
    className: string
};

type DefaultProps = {
    tooltipRenderFn: null,
    children: null,
    forwardedRef: null,
    className: ''
};

/**
 * @typedef withTooltipPropsType
 * @property {Function} [tooltipRenderFn=null] - Tooltip render prop.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 * @property {string} [className=''] - React prop.
 */

/**
 * @description Creates a higher order component with customizable tooltip capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withTooltip<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
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
        constructor(props: Props) {
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

            const rootClassNames = mergeClassNames(
                className,
                componentClassNames.root
            );

            return (
                <Component
                    {...other}
                    ref={this.setComponentRef}
                    tabIndex={0}
                    className={rootClassNames}>
                    <span className={componentClassNames.tooltip}>
                        {tooltipRenderFn ? tooltipRenderFn() : null}
                    </span>
                    {children}
                </Component>
            );
        }
    }

    return React.forwardRef<ComponentConfig & Config<Props, DefaultProps>, HOC>(
        (props, ref) => {
            return <HOC {...props} forwardedRef={ref} />;
        }
    );
}

export {withTooltip};
