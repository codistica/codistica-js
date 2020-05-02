/** @flow */

/** @module react/hocs/on-pull-hoc */

// TODO: WORK IN PROGRESS.

import React from 'react';
import type {ComponentType} from 'react';
// import {eventListenerObjectSupport} from '@codistica/browser';

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function onPullHOC(Component: ComponentType<any> | string) {
    type HOCProps = {
        children: any,
        onPull: Function,
        forwardedRef: Function
    };

    /**
     * @typedef onPullHOCPropsType
     * @property {*} [children=null] - React prop.
     * @property {Function} [onPull=null] - Callback for pull event.
     * @property {Function} [forwardedRef=null] - React prop.
     */

    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<HOCProps> {
        static defaultProps = {
            children: null,
            onPull: null,
            forwardedRef: null
        };

        componentRef: any;

        /**
         * @description Constructor.
         * @param {onPullHOCPropsType} [props] - Component props.
         */
        constructor(props: HOCProps) {
            super(props);

            this.componentRef = null;

            // BIND METHODS
            (this: Function).setComponentRef = this.setComponentRef.bind(this);
        }

        componentDidMount() {}

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
            const {onPull, children, forwardedRef, ...others} = this.props;
            return (
                <Component {...others} ref={this.setComponentRef}>
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

export {onPullHOC};
