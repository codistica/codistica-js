/** @flow */

/** @module react/hocs/with-on-drag */

import {eventListenerObjectSupport} from '@codistica/browser';
import {log} from '@codistica/core';
import React from 'react';
import type {AbstractComponent, Config} from 'react';
import {mergeStyles} from '../modules/merge-styles.js';

// TODO: ADD DAMPING OPTION (FUNCTION)
// TODO: ADD MOMENTUM OPTION (COEFFICIENT)
// TODO: ADD THRESHOLD TO GRAB OPTION (TIME)

type Props = {
    isolate: boolean,
    onDragStart: null | ((...args: Array<any>) => any),
    onDrag: null | ((...args: Array<any>) => any),
    onDragEnd: null | ((...args: Array<any>) => any),
    children: any,
    forwardedRef: any,
    style: {[string]: any}
};

type DefaultProps = {
    isolate: false,
    onDragStart: null,
    onDrag: null,
    onDragEnd: null,
    children: null,
    forwardedRef: null,
    style: {}
};

type State = {
    isDragging: boolean,
    isGrabbed: boolean
};

/**
 * @typedef withOnDragPropsType
 * @property {boolean} [isolate=false] - Isolate component dragging events. Do not allow propagation to other elements.
 * @property {Function} [onDragStart=null] - Callback for dragStart event.
 * @property {Function} [onDrag=null] - Callback for drag event.
 * @property {Function} [onDragEnd=null] - Callback for dragEnd event.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 * @property {Object<string,string>} [style={}] - React prop.
 */

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOnDrag<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props, State> {
        static defaultProps: DefaultProps = {
            isolate: false,
            onDragStart: null,
            onDrag: null,
            onDragEnd: null,
            children: null,
            forwardedRef: null,
            style: {}
        };

        componentRef: any;
        touchIdentifier: number | null;
        xPos: number;
        yPos: number;

        /**
         * @description Constructor.
         * @param {withOnDragPropsType} [props] - Component props.
         */
        constructor(props: Props) {
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
            (this: any).onStart = this.onStart.bind(this);
            (this: any).onEnd = this.onEnd.bind(this);
            (this: any).onMove = this.onMove.bind(this);
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD?
            this.componentRef.addEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.addEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.addEventListener(
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
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD?
            this.componentRef.removeEventListener(
                'touchstart',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.removeEventListener(
                'mousedown',
                this.onStart,
                eventListenerObjectSupport.capture === true
                    ? {capture: true}
                    : true
            );
            this.componentRef.removeEventListener(
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
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD?

            if (
                (e.type === 'mousedown' && e.button === 0) ||
                (e.type === 'touchstart' && e.touches.length === 1)
            ) {
                log.debug('onStart()', 'DRAG STARTED')();

                this.componentRef.addEventListener(
                    'touchmove',
                    this.onMove,
                    eventListenerObjectSupport.capture === true
                        ? {capture: true}
                        : true
                );
                window.addEventListener(
                    'mousemove',
                    this.onMove,
                    eventListenerObjectSupport.capture === true
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
         * @description Callback for end event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onEnd(e: {[string]: any}) {
            // TODO: ATTACH TO REACT EVENTS IN RENDER INSTEAD?

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
                    eventListenerObjectSupport.capture === true
                        ? {capture: true}
                        : true
                );
                window.removeEventListener(
                    'mousemove',
                    this.onMove,
                    eventListenerObjectSupport.capture === true
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
         * @description Callback for move event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        onMove(e: {[string]: any}) {
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
                onDrag,
                onDragStart,
                onDragEnd,
                children,
                forwardedRef,
                isolate,
                style,
                ...other
            } = this.props;
            const {isGrabbed} = this.state;
            return (
                <Component
                    {...other}
                    ref={this.setComponentRef}
                    style={mergeStyles(style, {
                        cursor: isGrabbed ? 'grabbing' : 'grab'
                    })}>
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

export {withOnDrag};
