/** @flow */

/** @module react/classes/overscroll-monitor */

import {eventListenerObjectSupport} from '@codistica/browser';
import React from 'react';
import type {ComponentType} from 'react';

type HOCProps = {
    isolate: boolean,
    children: any,
    forwardedRef: Function
};

/**
 * @typedef overscrollMonitorOptionsType
 * @property {boolean} [killPropagated=false] - Kills all propagated scrolling events.
 */

/**
 * @typedef overscrollMonitorHOCPropsType
 * @property {boolean} [isolate=false] - Isolate component element scrolling events. Do not allow propagation to other elements.
 * @property {Object<string,*>} [children=null] - React prop.
 * @property {Function} [forwardedRef=null] - React prop.
 */

/**
 * @classdesc Utility class to prevent elements overscroll and scroll events propagation.
 */
class OverscrollMonitor {
    killPropagated: boolean;
    touchPoint: number;
    multiTouch: boolean | null;
    hocsNumber: number;

    /**
     * @description Constructor.
     * @param {overscrollMonitorOptionsType} [options] - Overscroll handling options.
     */
    constructor(options: {killPropagated: boolean}) {
        if (typeof options !== 'object') {
            options = {
                killPropagated: false
            };
        } else {
            if (typeof options.killPropagated !== 'boolean') {
                options.killPropagated = false;
            }
        }

        this.killPropagated = options.killPropagated;

        this.touchPoint = 0;
        this.multiTouch = null;
        this.hocsNumber = 0;

        // BIND METHODS
        (this: Function).mount = this.mount.bind(this);
        (this: Function).unmount = this.unmount.bind(this);
        (this: Function).eventKiller = this.eventKiller.bind(this);
        (this: Function).overscrollBlocker = this.overscrollBlocker.bind(this);
        (this: Function).HOC = this.HOC.bind(this);
    }

    mount() {
        window.addEventListener(
            'touchstart',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
        window.addEventListener(
            'touchmove',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
        window.addEventListener(
            'touchend',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
        window.addEventListener(
            'wheel',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
    }

    unmount() {
        window.removeEventListener(
            'touchstart',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
        window.removeEventListener(
            'touchmove',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
        window.removeEventListener(
            'touchend',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
        window.removeEventListener(
            'wheel',
            this.eventKiller,
            eventListenerObjectSupport.passiveEvt === true
                ? {passive: false}
                : false
        );
    }

    /**
     * @instance
     * @description Calls preventDefault() on passed event if current configuration requires it.
     * @param {Object<string,*>} e - Scrolling event.
     * @returns {void} Void.
     */
    eventKiller(e: {[string]: any}) {
        // IMPORTANT. KILL PROPAGATED EVENTS
        if (this.killPropagated && e.cancelable) {
            e.preventDefault();
        }
    }

    /**
     * @instance
     * @description Scrolling events handler for overscroll detection and prevention.
     * @param {Object<string,*>} e - Scrolling event.
     * @param {overscrollMonitorHOCPropsType} props - HOC Props.
     * @returns {void} Void.
     */
    overscrollBlocker(e: {[string]: any}, props: HOCProps) {
        // TODO: OPTION TO RESPECT BROWSER BEHAVIOUR AT LIMITS
        // TODO: OPTION TO ALLOW BODY SCROLLING (APPLY HANDLERS TO BODY (OR documentElement?)) (safePageScroll?)
        // TODO: FORCE SCROLL STOP WHEN #document TARGET? FIXING HEIGHT OR SETTING overflow: hidden. WITH OPTION IN HOC
        // TODO: DO NOT PREVENT WHEN ALREADY NOT PREVENTED IN STACK
        // TODO: AUTOMATICALLY ADD CSS TO ELEMENT? FOR SCROLL?
        // TODO: FIX SCROLL WHEN ZOOMED. MAYBE IS A BROWSER PROBLEM

        let scrolledHeight = e.currentTarget.scrollTop;
        let scrollableHeight = e.currentTarget.scrollHeight;
        let scrollViewHeight = e.currentTarget.clientHeight;
        let deltaScroll = 0;
        let canScroll = true;
        let computedStyle = {};

        // ISOLATE EVENTS FROM THE REST OF THE DOCUMENT (DO NOT ALLOW PROPAGATION TO window)
        if (props && props.isolate) {
            e.stopPropagation();
        }

        // SAVE TOUCH STARTING POSITION
        if (e.type === 'touchstart') {
            this.touchPoint = e.touches[0].screenY;
            this.multiTouch = e.touches.length > 1;
            e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING // TODO: REMOVE?
            return;
        } else if (e.type === 'touchend') {
            this.multiTouch = e.touches.length > 1;
            e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING // TODO: REMOVE?
            return;
        }

        // DO NOT INTERFERE WITH MULTI TOUCH GESTURES
        if (this.multiTouch === true) {
            return;
        }

        // DETECT EVENT TYPE AND GET DELTA SCROLL
        if (
            e.type === 'wheel' ||
            e.type === 'mousewheel' ||
            e.type === 'DOMMouseScroll'
        ) {
            // GET DELTA SCROLL
            // INVERT TO BE COHERENT WITH DOM SIGNS
            deltaScroll = e.deltaY * -1;
        } else if (e.type === 'touchmove') {
            // CALCULATE DELTA SCROLL
            deltaScroll = e.touches[0].screenY - this.touchPoint;
            // UPDATE TOUCH POINT
            this.touchPoint = e.touches[0].screenY;
        }

        computedStyle = window.getComputedStyle(e.currentTarget);
        if (
            computedStyle.overflowY === 'hidden' ||
            (computedStyle.overflowY === 'visible' &&
                computedStyle.overflowX === 'visible') ||
            scrollViewHeight === scrollableHeight
        ) {
            canScroll = false;
        }

        if (e.cancelable) {
            if (
                scrolledHeight <= 0 &&
                (Math.sign(deltaScroll) === 1 || deltaScroll === 0)
            ) {
                // CASE: AT TOP AND PULL DOWN
                e.preventDefault();
            } else if (
                scrolledHeight + scrollViewHeight >= scrollableHeight &&
                (Math.sign(deltaScroll) === -1 || deltaScroll === 0)
            ) {
                // CASE: AT BOTTOM AND PULL UP
                e.preventDefault();
            } else if (!canScroll) {
                // CASE: NON SCROLLABLE ELEMENT
                e.preventDefault();
            }
        }
    }

    /**
     * @instance
     * @description Creates a higher order component with overscroll handling capabilities.
     * @param {(Object<string,*>|string)} Component - React component.
     * @returns {Object<string,*>} Created higher order component.
     */
    HOC(Component: ComponentType<any> | string) {
        const that = this; // ALLOW THIS METHOD RETURNED HOCs TO BE TIED TO THE CLASS INSTANCE :)

        /**
         * @classdesc Higher order component.
         */
        class _HOC extends React.Component<HOCProps> {
            static defaultProps = {
                isolate: false,
                children: null,
                forwardedRef: null
            };

            componentRef: any;
            boundHandler: Function;

            /**
             * @description Constructor.
             * @param {overscrollMonitorHOCPropsType} [props] - Component props.
             */
            constructor(props) {
                super(props);

                this.componentRef = null;

                /**
                 * @function boundHandler
                 * @description Overscroll blocker event handler for HOC.
                 * @param {Event} e - Event object.
                 * @returns {void} Void.
                 */
                this.boundHandler = function boundHandler(e: {[string]: any}) {
                    return that.overscrollBlocker(e, props);
                };

                // BIND METHODS
                (this: Function).setComponentRef = this.setComponentRef.bind(
                    this
                );
            }

            componentDidMount() {
                // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD? CAN BREAK IF PROPS CHAIN IS INTERRUPTED
                if (that.hocsNumber === 0) {
                    that.mount();
                }
                that.hocsNumber++;
                this.componentRef.addEventListener(
                    'touchstart',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
                this.componentRef.addEventListener(
                    'touchmove',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
                this.componentRef.addEventListener(
                    'touchend',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
                this.componentRef.addEventListener(
                    'wheel',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
            }

            componentWillUnmount() {
                // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD? CAN BREAK IF PROPS CHAIN IS INTERRUPTED
                that.hocsNumber--;
                if (that.hocsNumber === 0) {
                    that.unmount();
                }
                this.componentRef.removeEventListener(
                    'touchstart',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
                this.componentRef.removeEventListener(
                    'touchmove',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
                this.componentRef.removeEventListener(
                    'touchend',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
                        ? {passive: false}
                        : false
                );
                this.componentRef.removeEventListener(
                    'wheel',
                    this.boundHandler,
                    eventListenerObjectSupport.passiveEvt === true
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
                const {children, forwardedRef, isolate, ...others} = this.props;
                return (
                    <Component {...others} ref={this.setComponentRef}>
                        {children}
                    </Component>
                );
            }
        }

        return (React: Function).forwardRef((props, ref) => {
            return <_HOC {...props} forwardedRef={ref} />;
        });
    }
}

export {OverscrollMonitor};
