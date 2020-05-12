/** @flow */

/** @module react/hocs/with-on-scroll */

// TODO: WORK IN PROGRESS.

import React from 'react';
import type {ComponentType} from 'react';
// import {eventListenerObjectSupport} from '@codistica/browser';

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOnScroll(Component: ComponentType<any> | string) {
    type HOCProps = {
        onScroll: Function,
        children: any,
        forwardedRef: Function
    };

    /**
     * @typedef withOnScrollPropsType
     * @property {*} [children=null] - React prop.
     * @property {Function} [onPull=null] - Callback for pull event.
     * @property {Function} [forwardedRef=null] - React prop.
     */

    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<HOCProps> {
        static defaultProps = {
            onScroll: null,
            children: null,
            forwardedRef: null
        };

        componentRef: any;

        /**
         * @description Constructor.
         * @param {withOnScrollPropsType} [props] - Component props.
         */
        constructor(props: HOCProps) {
            super(props);

            this.componentRef = null;

            // BIND METHODS
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {}

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentWillUnmount() {}

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
            const {onScroll, children, forwardedRef, ...other} = this.props;
            return (
                <Component {...other} ref={this.setComponentRef}>
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

export {withOnScroll};
