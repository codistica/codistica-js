/** @flow */

import {eventListenerObjectSupport, viewportMonitor} from '@codistica/browser';
import {numberUtils} from '@codistica/core';
import {default as hoistNonReactStatics} from 'hoist-non-react-statics';
import React, {forwardRef, useEffect, useRef} from 'react';
import type {ComponentType} from 'react';
import {getDisplayName} from '../modules/get-display-name.js';
import {getRefHandler} from '../modules/get-ref-handler.js';

// TODO: TYPES (SEE HOC TYPING FROM JSS REPO AND COMPONENT THROUGH HOC TYPING).
// TODO: ADD OPTION TO EXECUTE HANDLER ONCE ON MOUNT. CHECK OTHER COMPONENTS/HOCS/HOOKS IN THIS LIBRARY THAT COULD DO THE SAME.

type Props = {
    children: any,
    onView: null | ((...args: Array<any>) => any)
};

type Context = {|
    instanceCount: number,
    handlers: Set<(...args: Array<any>) => any>,
    isAttached: boolean,
    ticking: boolean,
    lastEvent: {[string]: any} | null
|};

const eventOptions = eventListenerObjectSupport.capture
    ? {capture: true}
    : true;

const context: Context = {
    instanceCount: 0,
    handlers: new Set(),
    isAttached: false,
    ticking: false,
    lastEvent: null
};

function globalHandler(e) {
    context.lastEvent = e;
    if (!context.ticking) {
        requestAnimationFrame(() => {
            Array.from(context.handlers.values()).forEach((handler) =>
                handler(context.lastEvent)
            );
            context.ticking = false;
        });
        context.ticking = true;
    }
}

function setup(handler) {
    context.handlers.add(handler);
    if (!context.isAttached) {
        context.isAttached = true;
        window.addEventListener('scroll', globalHandler, eventOptions);
    }
}

function cleanUp(handler) {
    context.handlers.delete(handler);
    if (!context.handlers.size && context.isAttached) {
        window.removeEventListener('scroll', globalHandler, eventOptions);
        context.isAttached = false;
    }
}

function withOnView(trackOutside?: boolean) {
    return function withOnViewHOC(InnerComponent: ComponentType<any> | string) {
        const HOC = forwardRef((props: Props, ref) => {
            const {children, onView, ...other} = props;

            const componentRef = useRef(null);

            useEffect(() => {
                const handler = function handler(e) {
                    if (
                        onView &&
                        componentRef.current &&
                        e.target.contains(componentRef.current)
                    ) {
                        const elemRect =
                            componentRef.current.getBoundingClientRect();
                        const viewWidth = viewportMonitor.getViewportWidth();
                        const viewHeight = viewportMonitor.getViewportHeight();

                        const hiddenXLeft = numberUtils.clamp(
                            -elemRect.left,
                            0,
                            elemRect.width
                        );
                        const hiddenXRight = numberUtils.clamp(
                            elemRect.right - viewWidth,
                            0,
                            elemRect.width
                        );

                        const hiddenYTop = numberUtils.clamp(
                            -elemRect.top,
                            0,
                            elemRect.height
                        );
                        const hiddenYBottom = numberUtils.clamp(
                            elemRect.bottom - viewHeight,
                            0,
                            elemRect.height
                        );

                        const shownX =
                            ((elemRect.width - hiddenXLeft - hiddenXRight) /
                                elemRect.width) *
                            100;
                        const shownY =
                            ((elemRect.height - hiddenYTop - hiddenYBottom) /
                                elemRect.height) *
                            100;

                        const isInView = !!(shownX && shownY);

                        if (!trackOutside && !isInView) {
                            return;
                        }

                        const pathX = numberUtils.clamp(
                            100 -
                                (elemRect.right /
                                    (viewWidth + elemRect.width)) *
                                    100,
                            0,
                            100
                        );
                        const pathY = numberUtils.clamp(
                            100 -
                                (elemRect.bottom /
                                    (viewHeight + elemRect.height)) *
                                    100,
                            0,
                            100
                        );

                        const edgeX = (pathX - 50) * -2;
                        const edgeY = (pathY - 50) * 2;

                        const elemCenterX = elemRect.left + elemRect.width / 2;
                        const elemCenterY = elemRect.top + elemRect.height / 2;
                        const viewCenterX = viewWidth / 2;
                        const viewCenterY = viewHeight / 2;
                        const centerX = (1 - elemCenterX / viewCenterX) * -100;
                        const centerY = (1 - elemCenterY / viewCenterY) * 100;

                        onView({
                            isInView,
                            centerX,
                            centerY,
                            shownX,
                            shownY,
                            pathX,
                            pathY,
                            edgeX,
                            edgeY
                        });
                    }
                };

                setup(handler);

                return () => cleanUp(handler);
            }, [onView]);

            return InnerComponent ? (
                <InnerComponent
                    {...other}
                    ref={getRefHandler(ref, componentRef)}>
                    {children}
                </InnerComponent>
            ) : (
                children || null
            );
        });

        HOC.displayName = `withOnView(${getDisplayName(InnerComponent)})`;

        return hoistNonReactStatics(HOC, InnerComponent);
    };
}

export {withOnView};
