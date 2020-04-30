/** @flow */

/** @module react/hocs/on-click-outside-hoc */

import {eventListenerObjectSupport} from '@codistica/browser';
import React from 'react';

// TODO: CORRECTLY ANNOTATE RETURNED ELEMENT

/**
 * @description Creates a higher order component with clickOutside event support.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function onClickOutsideHOC(Component: Object | string) {
    type HOCProps = {
        children: any,
        onClickOutside: Function,
        forwardedRef: Function
    };

    /**
     * @typedef onClickOutsideHOCPropsType
     * @property {*} [children=null] - React prop.
     * @property {Function} [onClickOutside=null] - Callback for clickOutside event.
     * @property {Function} [forwardedRef=null] - React prop.
     */

    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<HOCProps> {
        static defaultProps = {
            children: null,
            onClickOutside: null,
            forwardedRef: null
        };

        componentRef: Object;
        isOutside: boolean;

        /**
         * @description Constructor.
         * @param {onClickOutsideHOCPropsType} [props] - Component props.
         */
        constructor(props: HOCProps) {
            super(props);

            this.componentRef = null;
            this.isOutside = false;

            // BIND METHODS
            (this: Function).onStart = this.onStart.bind(this);
            (this: Function).onEnd = this.onEnd.bind(this);
            (this: Function).setComponentRef = this.setComponentRef.bind(this);
        }

        componentDidMount() {
            window.addEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            window.addEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            window.addEventListener(
                'touchend',
                this.onEnd,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            window.addEventListener(
                'mouseup',
                this.onEnd,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
        }

        componentWillUnmount() {
            window.removeEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            window.removeEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            window.removeEventListener(
                'touchend',
                this.onEnd,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            window.removeEventListener(
                'mouseup',
                this.onEnd,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
        }

        /**
         * @instance
         * @description Handler for start event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onStart(e: Object) {
            if (e.type === 'touchstart') {
                e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING
                if (e.touches.length !== 1) {
                    return;
                }
            }
            this.isOutside =
                this.componentRef && !this.componentRef.contains(e.target);
        }

        /**
         * @instance
         * @description Handler for end event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onEnd(e: Object) {
            let target = null;
            if (e.type === 'touchend') {
                e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING
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
                this.props.onClickOutside(e);
            }
            this.isOutside = false;
        }

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
            const {
                onClickOutside,
                children,
                forwardedRef,
                ...others
            } = this.props;
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

export {onClickOutsideHOC};
