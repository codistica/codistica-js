/** @flow */

import {eventListenerObjectSupport} from '@codistica/browser';
import {conditionalTimeout} from '@codistica/core';
import {default as hoistNonReactStatics} from 'hoist-non-react-statics';
import React, {useRef, useCallback, useEffect, forwardRef} from 'react';
import type {ComponentType} from 'react';
import {getDisplayName} from '../modules/get-display-name.js';
import {getRefHandler} from '../modules/get-ref-handler.js';

// TODO: TYPES (SEE HOC TYPING FROM JSS REPO AND COMPONENT THROUGH HOC TYPING).
// TODO: SEE Impetus.js CODE FOR VELOCITIES CALCULATION. USE requestAnimationFrame? ACCUMULATE TRACKING POINTS? CHECK.

type Options = {
    isolateTouch?: boolean
};

type Props = {
    onDragStart: null | ((...args: Array<any>) => any),
    onDrag: null | ((...args: Array<any>) => any),
    onDragEnd: null | ((...args: Array<any>) => any),
    grabThreshold: null | number,
    children: any
};

function withOnDrag(options?: Options) {
    const {isolateTouch} = options || {};

    const eventOptions = eventListenerObjectSupport.capture
        ? {capture: true, passive: !isolateTouch}
        : true;

    return function withOnDragHOC(InnerComponent: ComponentType<any> | string) {
        const HOC = forwardRef((props: Props, ref) => {
            const {
                onDrag,
                onDragStart,
                onDragEnd,
                grabThreshold,
                children,
                ...other
            } = props;

            const componentRef = useRef(null);

            const touchIdentifierRef = useRef(null);

            const posXRef = useRef(0);
            const posYRef = useRef(0);

            const timeoutRef = useRef(null);
            const isDraggingRef = useRef(false);
            const isGrabbedRef = useRef(false);

            const velocityRef = useRef({
                velocityX: 0,
                velocityY: 0,
                deltaX: 0,
                deltaY: 0,
                nowX: 0,
                nowY: 0
            });

            const onMoveHandler = useCallback(
                (e: {[string]: any}) => {
                    if (
                        timeoutRef.current &&
                        e.target !== componentRef.current
                    ) {
                        timeoutRef.current.clear();
                    }

                    if (
                        isGrabbedRef.current &&
                        (e.type === 'mousemove' ||
                            e.touches.length === 1 ||
                            isDraggingRef.current)
                    ) {
                        isDraggingRef.current = true;

                        let deltaX = 0;
                        let deltaY = 0;

                        if (e.type === 'mousemove') {
                            deltaX = e.clientX - posXRef.current;
                            deltaY = e.clientY - posYRef.current;
                            posXRef.current = e.clientX;
                            posYRef.current = e.clientY;
                        } else {
                            deltaX = e.touches[0].screenX - posXRef.current;
                            deltaY = e.touches[0].screenY - posYRef.current;
                            posXRef.current = e.touches[0].screenX;
                            posYRef.current = e.touches[0].screenY;
                        }

                        velocityRef.current.deltaX += deltaX;
                        velocityRef.current.deltaY += deltaY;

                        const now = Date.now();

                        const deltaNowX = now - velocityRef.current.nowX;
                        const deltaNowY = now - velocityRef.current.nowY;

                        if (deltaNowX && velocityRef.current.deltaX) {
                            velocityRef.current.velocityX =
                                (velocityRef.current.deltaX / deltaNowX) * 1000;
                            velocityRef.current.deltaX = 0;
                            velocityRef.current.nowX = now;
                        }

                        if (deltaNowY && velocityRef.current.deltaY) {
                            velocityRef.current.velocityY =
                                (velocityRef.current.deltaY / deltaNowY) * 1000;
                            velocityRef.current.deltaY = 0;
                            velocityRef.current.nowY = now;
                        }

                        const velocity = Math.sqrt(
                            velocityRef.current.velocityX ** 2 +
                                velocityRef.current.velocityY ** 2
                        );

                        if (onDrag) {
                            onDrag({
                                deltaX,
                                deltaY,
                                velocity,
                                velocityX: velocityRef.current.velocityX,
                                velocityY: velocityRef.current.velocityY
                            });
                        }
                    }
                },
                [onDrag]
            );

            const onStartHandler = useCallback(
                (e: {[string]: any}) => {
                    if (
                        (e.type === 'mousedown' && e.button === 0) ||
                        (e.type === 'touchstart' && e.touches.length === 1)
                    ) {
                        timeoutRef.current = conditionalTimeout(
                            grabThreshold,
                            () => {
                                if (!componentRef.current) {
                                    return;
                                }

                                isGrabbedRef.current = true;

                                if (e.type === 'mousedown') {
                                    posXRef.current = e.clientX;
                                    posYRef.current = e.clientY;
                                } else {
                                    touchIdentifierRef.current =
                                        e.touches[0].identifier;
                                    posXRef.current = e.touches[0].screenX;
                                    posYRef.current = e.touches[0].screenY;
                                }

                                const now = Date.now();

                                if (!velocityRef.current.nowX) {
                                    velocityRef.current.nowX = now;
                                }

                                if (!velocityRef.current.nowY) {
                                    velocityRef.current.nowY = now;
                                }

                                if (onDragStart) {
                                    onDragStart();
                                }

                                if (isolateTouch && e.type === 'touchstart') {
                                    if (e.cancelable) {
                                        e.preventDefault();
                                    }
                                }
                            },
                            grabThreshold
                        );
                    }
                },
                [grabThreshold, onDragStart]
            );

            const onEndHandler = useCallback(
                (e: {[string]: any}) => {
                    if (timeoutRef.current) {
                        timeoutRef.current.clear();
                    }

                    if (
                        isGrabbedRef.current &&
                        ((e.type === 'mouseup' && e.button === 0) ||
                            (e.type === 'touchend' &&
                                Array.from(e.changedTouches).some(
                                    (elem) =>
                                        elem.identifier ===
                                        touchIdentifierRef.current
                                )))
                    ) {
                        if (!componentRef.current) {
                            return;
                        }

                        isDraggingRef.current = false;
                        isGrabbedRef.current = false;

                        if (e.type === 'touchend') {
                            touchIdentifierRef.current = null;
                        }

                        velocityRef.current = {
                            deltaX: 0,
                            deltaY: 0,
                            velocityX: 0,
                            velocityY: 0,
                            nowX: 0,
                            nowY: 0
                        };

                        if (onDragEnd) {
                            onDragEnd();
                        }
                    }
                },
                [onDragEnd]
            );

            useEffect(() => {
                if (!componentRef.current) {
                    return () => {};
                }

                const element = componentRef.current;

                element.addEventListener(
                    'touchstart',
                    onStartHandler,
                    eventOptions
                );
                element.addEventListener(
                    'mousedown',
                    onStartHandler,
                    eventOptions
                );

                element.addEventListener(
                    'touchmove',
                    onMoveHandler,
                    eventOptions
                );
                window.addEventListener(
                    'mousemove',
                    onMoveHandler,
                    eventOptions
                );

                element.addEventListener(
                    'touchend',
                    onEndHandler,
                    eventOptions
                );
                window.addEventListener('mouseup', onEndHandler, eventOptions);

                return () => {
                    element.removeEventListener(
                        'touchstart',
                        onStartHandler,
                        eventOptions
                    );
                    element.removeEventListener(
                        'mousedown',
                        onStartHandler,
                        eventOptions
                    );

                    element.removeEventListener(
                        'touchmove',
                        onMoveHandler,
                        eventOptions
                    );
                    window.removeEventListener(
                        'mousemove',
                        onMoveHandler,
                        eventOptions
                    );

                    element.removeEventListener(
                        'touchend',
                        onEndHandler,
                        eventOptions
                    );
                    window.removeEventListener(
                        'mouseup',
                        onEndHandler,
                        eventOptions
                    );
                };
            }, [onEndHandler, onMoveHandler, onStartHandler]);

            return (
                <InnerComponent
                    {...other}
                    ref={getRefHandler(componentRef, ref)}>
                    {children}
                </InnerComponent>
            );
        });

        HOC.displayName = `withOnDrag(${getDisplayName(InnerComponent)})`;

        return hoistNonReactStatics(HOC, InnerComponent);
    };
}

export {withOnDrag};
