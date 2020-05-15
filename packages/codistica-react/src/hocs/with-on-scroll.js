/** @flow */

/** @module react/hocs/with-on-scroll */

// TODO: WORK IN PROGRESS.

import React from 'react';
import type {AbstractComponent, Config} from 'react';

type Props = {
    onScroll: null | ((...args: Array<any>) => any),
    children: any,
    forwardedRef: any
};

type DefaultProps = {
    onScroll: null,
    children: null,
    forwardedRef: null
};

/**
 * @typedef withOnScrollPropsType
 * @property {Function} [onScroll=null] - Callback for scroll event.
 * @property {*} [children=null] - React prop.
 * @property {*} [forwardedRef=null] - React prop.
 */

/**
 * @description Creates a higher order component with dragging capabilities.
 * @param {(Object<string,*>|string)} Component - React component.
 * @returns {Object<string,*>} Created higher order component.
 */
function withOnScroll<ComponentConfig: {}>(
    Component: AbstractComponent<any> | string
): AbstractComponent<ComponentConfig & Config<Props, DefaultProps>> {
    /**
     * @classdesc Higher order component.
     */
    class HOC extends React.Component<Props> {
        static defaultProps: DefaultProps = {
            onScroll: null,
            children: null,
            forwardedRef: null
        };

        componentRef: any;

        /**
         * @description Constructor.
         * @param {withOnScrollPropsType} [props] - Component props.
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
            const {onScroll, children, forwardedRef, ...other} = this.props;
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

export {withOnScroll};
