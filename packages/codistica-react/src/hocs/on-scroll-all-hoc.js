/** @flow */

/** @module react/hocs/on-scroll-all-hoc */

// TODO: WORK IN PROGRESS.

import React from 'react';
// import {eventListenerObjectSupport} from '@codistica/browser';

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function onScrollAllHOC(Component: Object | string) {
    type HOCProps = {
        children: any,
        onScrollAll: Function,
        forwardedRef: Function
    };

    /**
     * @typedef onScrollAllHOCPropsType
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
            onScrollAll: null,
            forwardedRef: null
        };

        componentRef: Object;

        /**
         * @description Constructor.
         * @param {onScrollAllHOCPropsType} [props] - Component props.
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
        setComponentRef(ref: Object) {
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
         * @returns {React.Component} React component.
         */
        render() {
            const {onScrollAll, children, forwardedRef, ...others} = this.props;
            return (
                <Component {...others} ref={this.setComponentRef}>
                    {children}
                </Component>
            );
        }
    }

    return (React: Function).forwardRef((props: Object, ref: Function) => {
        return <HOC {...props} forwardedRef={ref} />;
    });
}

export {onScrollAllHOC};
