/** @flow */

/** @module react/hocs/with-on-scroll-action */

import {eventListenerObjectSupport, elementUtils} from '@codistica/browser';
import {createHeartbeatTimeout} from '@codistica/core';
import React from 'react';
import type {AbstractComponent, Config} from 'react';

type Props = {
    onScrollAction: null | ((...args: Array<any>) => any),
    passive: boolean,
    endThreshold: number,
    children: any,
    forwardedRef: any
};

type DefaultProps = {
    onScrollAction: null,
    passive: boolean,
    endThreshold: number,
    children: null,
    forwardedRef: null
};

/**
 * @typedef withOnScrollActionPropsType
 * @property {boolean} [passive=true] - Event passive flag.
 * @property {number} [endThreshold=100] - Event cessation threshold.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 */

/**
 * @description Creates a higher order component with overscroll blocking capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOnScrollAction<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            onScrollAction: null,
            passive: true,
            endThreshold: 100,
            children: null,
            forwardedRef: null
        };

        componentRef: any;
        eventOptions: {passive: boolean} | boolean;
        sourceEventPriority: {
            x: Map<string | null, number>,
            y: Map<string | null, number>
        };
        emissionEventPriority: {
            x: Map<string | null, number>,
            y: Map<string | null, number>
        };
        heartbeats: {[string]: (...args: Array<any>) => any};
        source: {x: null | number, y: null | number};
        delta: {x: number, y: number};
        reachedLimit: {
            x: boolean,
            y: boolean,
            current: null | string
        };
        scrollPos: {x: number, y: number};
        touchPos: {x: number, y: number};

        /**
         * @description Constructor.
         * @param {withOnScrollActionPropsType} [props] - Component props.
         */
        constructor(props: Props) {
            super(props);

            this.componentRef = null;

            this.eventOptions = eventListenerObjectSupport.passive
                ? {passive: props.passive}
                : false;

            const defaultEventPriority = [
                ['scroll', 0],
                ['touchmove', 1],
                ['wheel', 2],
                ['keydown', 3],
                [null, 4]
            ];

            this.sourceEventPriority = {
                x: new Map(defaultEventPriority),
                y: new Map(defaultEventPriority)
            };

            this.emissionEventPriority = {
                x: new Map(defaultEventPriority),
                y: new Map(defaultEventPriority)
            };

            this.heartbeats = {
                x: createHeartbeatTimeout(),
                y: createHeartbeatTimeout(),
                emission: createHeartbeatTimeout()
            };

            this.source = {
                x: null,
                y: null
            };

            this.delta = {
                x: 0,
                y: 0
            };

            this.reachedLimit = {
                x: false,
                y: false,
                current: null
            };

            this.scrollPos = {
                x: 0,
                y: 0
            };

            this.touchPos = {
                x: 0,
                y: 0
            };

            // BIND METHODS
            (this: any).handler = this.handler.bind(this);
            (this: any).dispatch = this.dispatch.bind(this);
            (this: any).getSourcePriority = this.getSourcePriority.bind(this);
            (this: any).getEmissionPriority =
                this.getEmissionPriority.bind(this);
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            this.scrollPos = {
                x: this.componentRef.scrollLeft,
                y: this.componentRef.scrollTop
            };

            this.componentRef.addEventListener(
                'scroll',
                this.handler,
                this.eventOptions
            );
            this.componentRef.addEventListener(
                'touchstart',
                this.handler,
                this.eventOptions
            );
            this.componentRef.addEventListener(
                'touchmove',
                this.handler,
                this.eventOptions
            );
            this.componentRef.addEventListener(
                'touchend',
                this.handler,
                this.eventOptions
            );
            this.componentRef.addEventListener(
                'wheel',
                this.handler,
                this.eventOptions
            );
            this.componentRef.addEventListener(
                'keydown',
                this.handler,
                this.eventOptions
            );
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentWillUnmount() {
            this.componentRef.removeEventListener(
                'scroll',
                this.handler,
                this.eventOptions
            );
            this.componentRef.removeEventListener(
                'touchstart',
                this.handler,
                this.eventOptions
            );
            this.componentRef.removeEventListener(
                'touchmove',
                this.handler,
                this.eventOptions
            );
            this.componentRef.removeEventListener(
                'touchend',
                this.handler,
                this.eventOptions
            );
            this.componentRef.removeEventListener(
                'wheel',
                this.handler,
                this.eventOptions
            );
            this.componentRef.removeEventListener(
                'keydown',
                this.handler,
                this.eventOptions
            );
        }

        /**
         * @instance
         * @description Callback for scrollAction event.
         * @param {Object<string,*>} e - Triggering event.
         * @returns {void} Void.
         */
        handler(e: {[string]: any}) {
            const newDelta = {
                x: 0,
                y: 0
            };

            // NORMALIZE EVENT
            switch (e.type) {
                case 'scroll':
                    newDelta.x =
                        this.componentRef.scrollLeft - this.scrollPos.x;
                    newDelta.y = this.componentRef.scrollTop - this.scrollPos.y;
                    this.scrollPos.x = this.componentRef.scrollLeft;
                    this.scrollPos.y = this.componentRef.scrollTop;
                    break;
                case 'touchstart':
                    this.touchPos.x = e.touches[0].screenX;
                    this.touchPos.y = e.touches[0].screenY;
                    return;
                case 'touchmove':
                    newDelta.x = this.touchPos.x - e.touches[0].screenX;
                    newDelta.y = this.touchPos.y - e.touches[0].screenY;
                    this.touchPos.x = e.touches[0].screenX;
                    this.touchPos.y = e.touches[0].screenY;
                    break;
                case 'touchend':
                    this.touchPos.x = 0;
                    this.touchPos.y = 0;
                    return;
                case 'wheel':
                    newDelta.x = e.deltaX;
                    newDelta.y = e.deltaY;
                    break;
                case 'keydown':
                    if (e.which === 37) {
                        newDelta.x = -20;
                    } else if (e.which === 38) {
                        newDelta.y = -20;
                    } else if (e.which === 39) {
                        newDelta.x = 20;
                    } else if (e.which === 40) {
                        newDelta.y = 20;
                    } else {
                        // NO ARROW PRESSED
                        return;
                    }
                    break;
                default:
                    // NO VALID EVENT
                    return;
            }

            // DETECT SCROLL LIMITS
            switch (
                elementUtils.whichScrollLimitReached(
                    this.componentRef,
                    newDelta.x,
                    newDelta.y
                )
            ) {
                case 'top':
                    this.reachedLimit.current = 'top';
                    this.reachedLimit.y = true;
                    break;
                case 'right':
                    this.reachedLimit.current = 'right';
                    this.reachedLimit.x = true;
                    break;
                case 'left':
                    this.reachedLimit.current = 'left';
                    this.reachedLimit.x = true;
                    break;
                case 'bottom':
                    this.reachedLimit.current = 'bottom';
                    this.reachedLimit.y = true;
                    break;
                default:
                    this.reachedLimit.current = null;
                    this.reachedLimit.x = false;
                    this.reachedLimit.y = false;
                    break;
            }

            /**
             * @description Process axis deltas.
             * @param {string} axis - Axis to be processed.
             * @returns {void} Void.
             */
            const processAxis = (axis) => {
                if (
                    this.getSourcePriority(e.type, axis) <=
                        this.getSourcePriority(this.source[axis], axis) ||
                    !this.source[axis]
                ) {
                    // UPDATE DELTA
                    this.delta[axis] = newDelta[axis];

                    // UPDATE SOURCE
                    this.source[axis] = e.type;
                    this.heartbeats[axis](() => {
                        // WHEN EVENT ENDS
                        if (this.source[axis] === e.type) {
                            // RESET DELTA
                            this.delta[axis] = 0;
                            // RESET SOURCE
                            this.source[axis] = null;
                        }
                    }, this.props.endThreshold);

                    if (this.reachedLimit[axis]) {
                        // REDUCE SCROLL PRIORITY EVENTS WHEN SCROLL LIMIT IS REACHED
                        this.sourceEventPriority[axis].set('scroll', 5);
                    } else {
                        // REESTABLISH NORMAL PRIORITY
                        this.sourceEventPriority[axis].set('scroll', 0);
                    }
                }
            };

            if (newDelta.x) {
                processAxis('x');
            }

            if (newDelta.y) {
                processAxis('y');
            }

            this.dispatch(e);
        }

        /**
         * @instance
         * @description Event dispatcher.
         * @param {Object<string,*>} e - Event object.
         * @returns {void} Void.
         */
        dispatch(e: {[string]: any}) {
            let emit = false;

            const derivedEvent = {
                cancelable: false,
                target: e.target,
                currentTarget: e.currentTarget,
                sourceX: this.source.x,
                sourceY: this.source.y,
                deltaX: this.delta.x,
                deltaY: this.delta.y,
                reachedLimit: this.reachedLimit.current
            };

            if (
                Math.max(
                    this.getEmissionPriority(e.type, 'x'),
                    this.getEmissionPriority(e.type, 'y')
                ) <=
                Math.min(
                    this.getEmissionPriority(this.source.x, 'x'),
                    this.getEmissionPriority(this.source.y, 'y')
                )
            ) {
                emit = true;
            }

            this.heartbeats.emission(
                () => {
                    // RESET DELTA
                    this.delta.x = 0;
                    this.delta.y = 0;

                    // EMISSION FALLBACK WHEN EXPECTED EVENT DOES NOT ARRIVE
                    if (this.props.onScrollAction) {
                        this.props.onScrollAction(derivedEvent);
                    }
                },
                this.props.endThreshold,
                emit
            );

            if (emit) {
                // RESET DELTA
                this.delta.x = 0;
                this.delta.y = 0;

                // EMIT WHEN EXPECTED EVENT ARRIVE
                if (this.props.onScrollAction) {
                    this.props.onScrollAction(derivedEvent);
                }
            }
        }

        /**
         * @instance
         * @description Returns specified event source priority.
         * @param {*} eventType - Event type.
         * @param {string} axis - Axis.
         * @returns {number} Event priority.
         */
        getSourcePriority(eventType: any, axis: string): number {
            const eventPriority = this.sourceEventPriority[axis].get(eventType);
            return typeof eventPriority === 'number' ? eventPriority : 6;
        }

        /**
         * @instance
         * @description Returns specified event emission priority.
         * @param {*} eventType - Event type.
         * @param {string} axis - Axis.
         * @returns {number} Event priority.
         */
        getEmissionPriority(eventType: any, axis: string): number {
            const eventPriority =
                this.emissionEventPriority[axis].get(eventType);
            return typeof eventPriority === 'number' ? eventPriority : 6;
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
                children,
                onScrollAction,
                passive,
                endThreshold,
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

export {withOnScrollAction};
