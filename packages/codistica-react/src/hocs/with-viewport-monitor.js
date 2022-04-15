/** @flow */

/** @module react/hocs/with-viewport-monitor */

// TODO: ADD OPTION TO ONLY REPLACE STYLES AFTER VIEWPORT CHANGE ENDED.
// TODO: MAKE THIS WORK WITH react-spring?
// TODO: ADD OPTION TO BLOCK INTERACTIONS WHILE VIEWPORT IS CHANGING?

import {viewportMonitor} from '@codistica/browser';
import {objectUtils} from '@codistica/core';
import React from 'react';
import type {AbstractComponent, Config} from 'react';

type Props = {
    children: any,
    forwardedRef: any,
    style: {[string]: any}
};

type DefaultProps = {
    children: null,
    forwardedRef: null,
    style: {}
};

/**
 * @typedef withViewportMonitorPropsType
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description Creates a higher order component with viewport units auto-correction capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withViewportMonitor<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            children: null,
            forwardedRef: null,
            style: {}
        };

        /**
         * @description Constructor.
         * @param {withViewportMonitorPropsType} [props] - Component props.
         */
        constructor(props: Props) {
            super(props);

            // BIND METHODS
            (this: any).onViewportChangeHandler =
                this.onViewportChangeHandler.bind(this);
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            viewportMonitor.on('shift', this.onViewportChangeHandler); // TODO: DETACH ON UNMOUNT?
        }

        /**
         * @instance
         * @description Callback for viewportChange event.
         * @returns {void} Void.
         */
        onViewportChangeHandler() {
            this.forceUpdate();
        }

        /**
         * @description Replace viewport units in incoming styles.
         * @param {Object<string,*>} styleObj - React style object.
         * @returns {Object<string,*>} Resulting style object.
         */
        static replaceStyles(styleObj: {[string]: any}) {
            // TODO: MOVE METHOD TO ViewportMonitor CLASS?
            // TODO: IMPROVE. AVOID REGEXP REPLACEMENT. WHAT HAPPENS IF STYLE ALREADY HAS calc()?
            // TODO: IT IS PREFERABLE TO REPLACE ALREADY CALCULATED VALUE (NO MATTER WHERE IT IS). (CHECK calc() USAGES EVERYWHERE)
            // TODO: REMOVE OBJECT UTILS. DO A SIMPLE SHALLOW SCAN/CLONE OPERATION.
            return objectUtils.forEachSync(
                objectUtils.deepClone(styleObj),
                (elem, API) => {
                    let newValue = elem;
                    if (typeof elem === 'string') {
                        if (viewportMonitor.deltaVh !== 0) {
                            newValue = newValue.replace(
                                /(?<val>[\d.]+)vh/g,
                                `calc($<val>vh * ${viewportMonitor.ratioVh})`
                            );
                        }
                        if (viewportMonitor.deltaVw !== 0) {
                            newValue = newValue.replace(
                                /(?<val>[\d.]+)vw/g,
                                `calc($<val>vw * ${viewportMonitor.ratioVw})`
                            );
                        }
                        if (newValue !== elem) {
                            API.replaceValue(newValue);
                        }
                    }
                }
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
        }

        /**
         * @instance
         * @description React render method.
         * @returns {Object<string,*>} React component.
         */
        render() {
            const {children, forwardedRef, style, ...other} = this.props;
            return (
                <Component
                    {...other}
                    ref={this.setComponentRef}
                    style={HOC.replaceStyles(style)}>
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

export {withViewportMonitor};
