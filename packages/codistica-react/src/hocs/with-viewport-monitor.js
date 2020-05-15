/** @flow */

/** @module react/hocs/with-viewport-monitor */

import {objectUtils} from '@codistica/core';
import React from 'react';
import type {AbstractComponent, Config} from 'react';
import {viewportMonitor} from '../modules/viewport-monitor.js';

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

type State = {
    viewportStyle: {[string]: any}
};

/**
 * @typedef withViewportMonitorPropsType
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 * @property {Object<string,string>} [style={}] - React prop.
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
    class HOC extends React.Component<Props, State> {
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
            (this: any).onViewportChange = this.onViewportChange.bind(this);
            (this: any).setComponentRef = this.setComponentRef.bind(this);

            this.state = {
                viewportStyle: HOC.replaceUnits(props.style)
            };
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {
            viewportMonitor.on('shift', this.onViewportChange); // TODO: DETACH ON UNMOUNT?
        }

        /**
         * @instance
         * @description Callback for viewportChange event.
         * @returns {void} Void.
         */
        onViewportChange() {
            this.setState({
                viewportStyle: HOC.replaceUnits(this.props.style)
            });
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
            const {viewportStyle} = this.state;
            return (
                <Component
                    {...other}
                    ref={this.setComponentRef}
                    style={viewportStyle}>
                    {children}
                </Component>
            );
        }

        /**
         * @description Replace units in incoming styles.
         * @param {Object<string,*>} props - Incoming react props.
         * @returns {Object<string,*>} State update object.
         */
        static getDerivedStateFromProps(props: Props) {
            return {
                viewportStyle: HOC.replaceUnits(props.style)
            };
        }

        /**
         * @description Replace viewport units in incoming styles.
         * @param {Object<string,*>} styleObj - React style object.
         * @returns {Object<string,*>} Resulting style object.
         */
        static replaceUnits(styleObj: {[string]: any}) {
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
    }

    return React.forwardRef<ComponentConfig & Config<Props, DefaultProps>, HOC>(
        (props, ref) => {
            return <HOC {...props} forwardedRef={ref} />;
        }
    );
}

export {withViewportMonitor};
