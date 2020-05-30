/** @flow */

/** @module react/hocs/with-overscroll-blocker */

import {
    eventListenerObjectSupport,
    OverscrollBlocker
} from '@codistica/browser';
import React from 'react';
import type {AbstractComponent, Config} from 'react';

const eventOptions = eventListenerObjectSupport.passive
    ? {passive: false}
    : undefined;

type Props = {
    blockX: boolean,
    blockY: boolean,
    contentAware: boolean,
    children: any,
    forwardedRef: any
};

type DefaultProps = {
    blockX: boolean,
    blockY: boolean,
    contentAware: boolean,
    children: null,
    forwardedRef: null
};

/**
 * @typedef withOverscrollBlockerPropsType
 * @property {boolean} [blockX=true] - Block overscroll on X axis.
 * @property {boolean} [blockY=true] - Block overscroll on Y axis.
 * @property {boolean} [contentAware=false] - Traverse DOM searching for other scrollable elements to take into consideration.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 */

/**
 * @description Creates a higher order component with overscroll blocking capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOverscrollBlocker<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            blockX: true,
            blockY: true,
            contentAware: false,
            children: null,
            forwardedRef: null
        };

        componentRef: any;
        overscrollBlocker: OverscrollBlocker;
        touchPos: {
            x: number,
            y: number
        };
        isMultiTouch: boolean;

        /**
         * @description Constructor.
         * @param {withOverscrollBlockerPropsType} [props] - Component props.
         */
        constructor(props: Props) {
            super(props);

            this.componentRef = null;

            this.overscrollBlocker = new OverscrollBlocker({
                blockX: props.blockX,
                blockY: props.blockY
            });

            this.touchPos = {
                x: 0,
                y: 0
            };

            this.isMultiTouch = false;

            // BIND METHODS
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            this.componentRef.addEventListener(
                'touchstart',
                this.overscrollBlocker.handler,
                eventOptions
            );
            this.componentRef.addEventListener(
                'touchmove',
                this.overscrollBlocker.handler,
                eventOptions
            );
            this.componentRef.addEventListener(
                'touchend',
                this.overscrollBlocker.handler,
                eventOptions
            );
            this.componentRef.addEventListener(
                'wheel',
                this.overscrollBlocker.handler,
                eventOptions
            );
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentWillUnmount() {
            this.componentRef.removeEventListener(
                'touchstart',
                this.overscrollBlocker.handler,
                eventOptions
            );
            this.componentRef.removeEventListener(
                'touchmove',
                this.overscrollBlocker.handler,
                eventOptions
            );
            this.componentRef.removeEventListener(
                'touchend',
                this.overscrollBlocker.handler,
                eventOptions
            );
            this.componentRef.removeEventListener(
                'wheel',
                this.overscrollBlocker.handler,
                eventOptions
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
            const {
                children,
                blockX,
                blockY,
                contentAware,
                forwardedRef,
                ...other
            } = this.props;
            this.overscrollBlocker.options.blockX = blockX;
            this.overscrollBlocker.options.blockY = blockY;
            this.overscrollBlocker.options.contentAware = contentAware;
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

export {withOverscrollBlocker};
