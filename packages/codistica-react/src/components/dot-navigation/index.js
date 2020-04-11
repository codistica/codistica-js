/** @flow */

/** @module react/components/dot-navigation */

import classnames from 'classnames/dedupe';
import React from 'react';
import Styles from './index.module.scss';

type Props = {
    style: Object,
    className: string,
    quantity: number,
    dotIndex: number,
    size: string,
    direction: 'row' | 'column',
    auto: boolean,
    onSwitch: Function,
    waitForCallback: boolean
};

type State = {
    autoPosition: number
};

/**
 * @typedef dotNavigationPropsType
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {number} [quantity=0] - Number of dots.
 * @property {number} [dotIndex=0] - Active dot index.
 * @property {string} [size='15px'] - Dot diameter in pixels.
 * @property {string} [direction='row'] - Dots direction.
 * @property {boolean} [auto=true] - Automatically change active dot index on switch.
 * @property {Function} [onSwitch=null] - Callback for switch event.
 * @property {boolean} [waitForCallback=false] - Disable dot navigation until onSwitch callback is executed.
 */

/**
 * @classdesc A generic dot navigation component.
 */
class DotNavigation extends React.Component<Props, State> {
    static defaultProps = {
        style: {},
        className: '',
        quantity: 0,
        dotIndex: 0,
        size: '15px',
        direction: 'row',
        auto: true,
        onSwitch: null,
        waitForCallback: false
    };

    stop: boolean;

    /**
     * @description Constructor.
     * @param {dotNavigationPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.stop = false;

        this.state = {
            autoPosition: props.dotIndex
        };

        // BIND METHODS
        (this: Function).onSwitch = this.onSwitch.bind(this);
    }

    /**
     * @instance
     * @description Handler for switch event.
     * @param {number} index - Triggering dot index.
     * @returns {void} Void.
     */
    onSwitch(index: number) {
        if (!this.stop) {
            if (typeof this.props.onSwitch === 'function') {
                if (this.props.waitForCallback) {
                    this.stop = true;
                }
                this.props.onSwitch(index, () => {
                    this.stop = false;
                });
            }
            this.setState({
                autoPosition: index
            });
        }
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            auto,
            onSwitch,
            dotIndex,
            quantity,
            className,
            direction,
            size,
            style,
            ...others
        } = this.props;
        const {autoPosition} = this.state;
        const mainClassName = classnames(
            {[className]: className},
            {[Styles._main]: true},
            {[Styles._scope]: true}
        );
        return (
            <span
                {...others}
                className={mainClassName}
                style={{...style, flexDirection: direction}}>
                {(() => {
                    let i = 0;
                    let output = [];
                    for (i = 0; i < quantity; i++) {
                        output.push(
                            <span
                                key={i}
                                className={
                                    i === (auto ? autoPosition : dotIndex)
                                        ? Styles.active
                                        : Styles.inactive
                                }
                                style={{height: size, width: size}}
                                onClick={this.onSwitch.bind(this, i)}
                            />
                        );
                    }
                    return output;
                })()}
            </span>
        );
    }
}

export {DotNavigation};
