/** @flow */

/** @module react/hocs/with-on-pull */

// TODO: WORK IN PROGRESS.

import React from 'react';
import type {AbstractComponent, Config} from 'react';

type Props = {
    onPull: null | ((...args: Array<any>) => any),
    children: any,
    forwardedRef: any
};

type DefaultProps = {
    onPull: null,
    children: null,
    forwardedRef: null
};

/**
 * @typedef withOnPullPropsType
 * @property {Function} [onPull=null] - Callback for pull event.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 */

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOnPull<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            onPull: null,
            children: null,
            forwardedRef: null
        };

        componentRef: any;

        /**
         * @description Constructor.
         * @param {withOnPullPropsType} [props] - Component props.
         */
        constructor(props: Props) {
            super(props);

            this.componentRef = null;

            // BIND METHODS
            (this: any).setComponentRef = this.setComponentRef.bind(this);
        }

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentDidMount() {}

        /**
         * @instance
         * @description React lifecycle.
         * @returns {void} Void.
         */
        componentWillUnmount() {}

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
            const {onPull, children, forwardedRef, ...other} = this.props;
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

export {withOnPull};
