/** @flow */

/** @module react/hocs/on-drag-hoc */

import {eventListenerObjectSupport} from '@codistica/browser';
import {log} from '@codistica/core';
import React from 'react';

// TODO: ADD DAMPING OPTION (FUNCTION)
// TODO: ADD MOMENTUM OPTION (COEFFICIENT)
// TODO: ADD THRESHOLD TO GRAB OPTION (TIME)

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function onDragHOC(Component: Object | string) {
    type HOCProps = {
        children: any,
        style: Object,
        isolate: boolean,
        onDragStart: Function,
        onDrag: Function,
        onDragEnd: Function,
        forwardedRef: Function
    };

    type State = {
        isDragging: boolean,
        isGrabbed: boolean
    };

    /**
     * @typedef onDragHOCPropsType
     * @property {*} [children=null] - React prop.
     * @property {Object<string,*>} [style={}] - React prop.
     * @property {boolean} [isolate=false] - Isolate component dragging events. Do not allow propagation to other elements.
     * @property {Function} [onDragStart=null] - Callback for dragStart event.
     * @property {Function} [onDrag=null] - Callback for drag event.
     * @property {Function} [onDragEnd=null] - Callback for dragEnd event.
     * @property {Function} [forwardedRef=null] - React prop.
     */

    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<HOCProps, State> {
        static defaultProps = {
            children: null,
            style: {},
            isolate: false,
            onDragStart: null,
            onDrag: null,
            onDragEnd: null,
            forwardedRef: null
        };

        componentRef: Object;
        touchIdentifier: number | null;
        xPos: number;
        yPos: number;

        /**
         * @description Constructor.
         * @param {onDragHOCPropsType} [props] - Component props.
         */
        constructor(props: HOCProps) {
            super(props);

            this.componentRef = null;
            this.touchIdentifier = null;
            this.xPos = 0;
            this.yPos = 0;

            this.state = {
                isDragging: false,
                isGrabbed: false
            };

            // BIND METHODS
            (this: Function).onStart = this.onStart.bind(this);
            (this: Function).onEnd = this.onEnd.bind(this);
            (this: Function).onMove = this.onMove.bind(this);
            (this: Function).setComponentRef = this.setComponentRef.bind(this);
        }

        componentDidMount() {
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD? CAN BREAK IF PROPS CHAIN IS INTERRUPTED
            this.componentRef.addEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.addEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.addEventListener(
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
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD? CAN BREAK IF PROPS CHAIN IS INTERRUPTED
            this.componentRef.removeEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.removeEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.captureEvt === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.removeEventListener(
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
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD? CAN BREAK IF PROPS CHAIN IS INTERRUPTED

            if (
                (e.type === 'mousedown' && e.button === 0) ||
                (e.type === 'touchstart' && e.touches.length === 1)
            ) {
                log.debug('onStart()', 'DRAG STARTED')();

                this.componentRef.addEventListener(
                    'touchmove',
                    this.onMove,
                    eventListenerObjectSupport.captureEvt === true
                        ? {capture: true}
                        : true
                );
                window.addEventListener(
                    'mousemove',
                    this.onMove,
                    eventListenerObjectSupport.captureEvt === true
                        ? {capture: true}
                        : true
                );

                this.setState({
                    isGrabbed: true
                });

                if (e.type === 'mousedown') {
                    this.xPos = e.clientX;
                    this.yPos = e.clientY;
                } else {
                    this.touchIdentifier = e.touches[0].identifier;
                    this.xPos = e.touches[0].screenX;
                    this.yPos = e.touches[0].screenY;
                }

                if (typeof this.props.onDragStart === 'function') {
                    this.props.onDragStart();
                }

                if (this.props.isolate && e.type === 'touchstart') {
                    e.stopPropagation();
                    e.cancelable && e.preventDefault();
                }
            }
        }

        /**
         * @instance
         * @description Handler for end event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onEnd(e: Object) {
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD? CAN BREAK IF PROPS CHAIN IS INTERRUPTED

            if (
                this.state.isGrabbed &&
                ((e.type === 'mouseup' && e.button === 0) ||
                    (e.type === 'touchend' &&
                        Array.from(e.changedTouches).some(
                            (elem) => elem.identifier === this.touchIdentifier
                        )))
            ) {
                log.debug('onEnd()', 'DRAG ENDED')();

                this.componentRef.removeEventListener(
                    'touchmove',
                    this.onMove,
                    eventListenerObjectSupport.captureEvt === true
                        ? {capture: true}
                        : true
                );
                window.removeEventListener(
                    'mousemove',
                    this.onMove,
                    eventListenerObjectSupport.captureEvt === true
                        ? {capture: true}
                        : true
                );

                this.setState({
                    isDragging: false,
                    isGrabbed: false
                });

                if (e.type === 'touchend') {
                    this.touchIdentifier = null;
                }

                if (typeof this.props.onDragEnd === 'function') {
                    this.props.onDragEnd();
                }
            }
        }

        /**
         * @instance
         * @description Handler for move event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onMove(e: Object) {
            if (
                this.state.isGrabbed &&
                (e.type === 'mousemove' ||
                    e.touches.length === 1 ||
                    this.state.isDragging)
            ) {
                this.setState({
                    isDragging: true
                });
                if (typeof this.props.onDrag === 'function') {
                    if (e.type === 'mousemove') {
                        this.props.onDrag({
                            deltaX: e.clientX - this.xPos,
                            deltaY: e.clientY - this.yPos
                        });
                        this.xPos = e.clientX;
                        this.yPos = e.clientY;
                    } else {
                        this.props.onDrag({
                            deltaX: e.touches[0].screenX - this.xPos,
                            deltaY: e.touches[0].screenY - this.yPos
                        });
                        this.xPos = e.touches[0].screenX;
                        this.yPos = e.touches[0].screenY;
                    }
                }
            }
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
                onDrag,
                onDragStart,
                onDragEnd,
                children,
                forwardedRef,
                isolate,
                style,
                ...others
            } = this.props;
            const {isGrabbed} = this.state;
            return (
                <Component
                    {...others}
                    style={{...style, cursor: isGrabbed ? 'grabbing' : 'grab'}}
                    ref={this.setComponentRef}>
                    {children}
                </Component>
            );
        }
    }

    return (React: Function).forwardRef((props: Object, ref: Function) => {
        return <HOC {...props} forwardedRef={ref} />;
    });
}

export {onDragHOC};
