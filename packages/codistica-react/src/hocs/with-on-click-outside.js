/** @flow */

/** @module react/hocs/with-on-click-outside */

import {eventListenerObjectSupport} from '@codistica/browser';
import React from 'react';
import type {AbstractComponent, Config} from 'react';

type Props = {
    onClickOutside: null | ((...args: Array<any>) => any),
    children: any,
    forwardedRef: any
};

type DefaultProps = {
    onClickOutside: null,
    children: null,
    forwardedRef: null
};

/**
 * @typedef withOnClickOutsidePropsType
 * @property {Function} [onClickOutside=null] - Callback for clickOutside event.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 */

/**
 * @description Creates a higher order component with clickOutside event support.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOnClickOutside<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            onClickOutside: null,
            children: null,
            forwardedRef: null
        };

        componentRef: any;
        isOutside: boolean;

        /**
         * @description Constructor.
         * @param {withOnClickOutsidePropsType} [props] - Component props.
         */
        constructor(props: Props) {
            super(props);

            this.componentRef = null;
            this.isOutside = false;

            // BIND METHODS
            (this: any).onStart = this.onStart.bind(this);
            (this: any).onEnd = this.onEnd.bind(this);
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            window.addEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            window.addEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            window.addEventListener(
                'touchend',
                this.onEnd,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            window.addEventListener(
                'mouseup',
                this.onEnd,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentWillUnmount() {
            window.removeEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            window.removeEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            window.removeEventListener(
                'touchend',
                this.onEnd,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            window.removeEventListener(
                'mouseup',
                this.onEnd,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
        }

        /**
         * @instance
         * @description Callback for start event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onStart(e: {[string]: any}) {
            if (e.type === 'touchstart') {
                if (e.touches.length !== 1) {
                    return;
                }
            }
            this.isOutside =
                this.componentRef && !this.componentRef.contains(e.target);
        }

        /**
         * @instance
         * @description Callback for end event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onEnd(e: {[string]: any}) {
            let target = null;
            if (e.type === 'touchend') {
                if (e.touches.length === 1) {
                    this.isOutside = false;
                    return;
                }
                target = document.elementFromPoint(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                );
            } else {
                target = e.target;
            }
            if (
                this.isOutside &&
                this.componentRef &&
                !this.componentRef.contains(target)
            ) {
                this.props.onClickOutside && this.props.onClickOutside(e);
            }
            this.isOutside = false;
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
                onClickOutside,
                children,
                forwardedRef,
                ...other
            } = this.props;
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

export {withOnClickOutside};
