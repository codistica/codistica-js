/** @flow */

/** @module react/hocs/with-overscroll-monitor */

import {eventListenerObjectSupport} from '@codistica/browser';
import React from 'react';
import type {AbstractComponent, Config} from 'react';
import {overscrollMonitor} from '../modules/overscroll-monitor.js';

type Props = {
    isolate?: boolean,
    children: any,
    forwardedRef: any
};

type DefaultProps = {
    isolate: false,
    children: null,
    forwardedRef: null
};

/**
 * @typedef withOverscrollMonitorPropsType
 * @property {boolean} [isolate=false] - Isolate component element scrolling events. Do not allow propagation to other elements.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 */

/**
 * @description Creates a higher order component with overscroll handling capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOverscrollMonitor<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            isolate: false,
            children: null,
            forwardedRef: null
        };

        componentRef: any;
        boundHandler: (...args: Array<any>) => any;

        /**
         * @description Constructor.
         * @param {withOverscrollMonitorPropsType} [props] - Component props.
         */
        constructor(props: Props) {
            super(props);

            this.componentRef = null;

            /**
             * @function boundHandler
             * @description Overscroll blocker event handler for HOC.
             * @param {Event} e - Event object.
             * @returns {void} Void.
             */
            this.boundHandler = function boundHandler(e: {[string]: any}) {
                return overscrollMonitor.overscrollBlocker(e, props.isolate);
            };

            // BIND METHODS
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD?
            overscrollMonitor.mount(this);
            this.componentRef.addEventListener(
                'touchstart',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
            this.componentRef.addEventListener(
                'touchmove',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
            this.componentRef.addEventListener(
                'touchend',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
            this.componentRef.addEventListener(
                'wheel',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentWillUnmount() {
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD?
            overscrollMonitor.unmount(this);
            this.componentRef.removeEventListener(
                'touchstart',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
            this.componentRef.removeEventListener(
                'touchmove',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
            this.componentRef.removeEventListener(
                'touchend',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
            this.componentRef.removeEventListener(
                'wheel',
                this.boundHandler,
                eventListenerObjectSupport.passive === true
                    ? {passive: false}
                    : false
            );
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
            const {isolate, children, ...other} = this.props;
            return (
                <Component {...other} ref={this.setComponentRef}>
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

export {withOverscrollMonitor};
