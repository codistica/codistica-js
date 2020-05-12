/** @flow */

/** @module react/components/dot-navigation */

import React from 'react';
import resetClassName from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import classNames from './index.module.scss';

type Props = {
    quantity: number,
    dotIndex: number,
    size: string,
    direction: 'row' | 'column',
    auto: boolean,
    onSwitch: Function,
    waitForCallback: boolean,
    customStyles: {
        root?: {[string]: string},
        dot?: {[string]: string},
        dotActive?: {[string]: string},
        dotInactive?: {[string]: string}
    },
    customClassNames: {
        root?: string,
        dot?: string,
        dotActive?: string,
        dotInactive?: string
    }
};

type State = {
    autoPosition: number
};

/**
 * @typedef dotNavigationPropsType
 * @property {number} [quantity=0] - Number of dots.
 * @property {number} [dotIndex=0] - Active dot index.
 * @property {string} [size='15px'] - Dot diameter in pixels.
 * @property {string} [direction='row'] - Dots direction.
 * @property {boolean} [auto=true] - Automatically change active dot index on switch.
 * @property {Function} [onSwitch=null] - Callback for switch event.
 * @property {boolean} [waitForCallback=false] - Disable dot navigation until onSwitch callback is executed.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @classdesc A generic dot navigation component.
 */
class DotNavigation extends React.Component<Props, State> {
    static defaultProps = {
        quantity: 0,
        dotIndex: 0,
        size: '15px',
        direction: 'row',
        auto: true,
        onSwitch: null,
        waitForCallback: false,
        customStyles: {},
        customClassNames: {}
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
        (this: any).onSwitchHandler = this.onSwitchHandler.bind(this);
    }

    /**
     * @instance
     * @description Callback for switch event.
     * @param {number} index - Triggering dot index.
     * @returns {void} Void.
     */
    onSwitchHandler(index: number) {
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
            dotIndex,
            quantity,
            direction,
            size,
            customStyles,
            customClassNames
        } = this.props;
        const {autoPosition} = this.state;

        const rootStyles = mergeStyles(customStyles.root, {
            flexDirection: direction
        });

        const dotActiveStyles = mergeStyles(
            customStyles.dot,
            customStyles.dotActive,
            {
                height: size,
                width: size
            }
        );

        const dotInactiveStyles = mergeStyles(
            customStyles.dot,
            customStyles.dotInactive,
            {
                height: size,
                width: size
            }
        );

        const rootClassNames = mergeClassNames(
            resetClassName.root,
            classNames.root
        );

        const dotActiveClassNames = mergeClassNames(
            classNames.dotActive,
            customClassNames.dot,
            customClassNames.dotActive
        );

        const dotInactiveClassNames = mergeClassNames(
            classNames.dotInactive,
            customClassNames.dot,
            customClassNames.dotInactive
        );

        return (
            <span style={rootStyles} className={rootClassNames}>
                {(() => {
                    let i = 0;
                    let output = [];
                    const currentPosition = auto ? autoPosition : dotIndex;
                    for (i = 0; i < quantity; i++) {
                        const isActiveDot = i === currentPosition;
                        output.push(
                            <span
                                key={i}
                                onClick={this.onSwitchHandler.bind(this, i)}
                                style={
                                    isActiveDot
                                        ? dotActiveStyles
                                        : dotInactiveStyles
                                }
                                className={
                                    isActiveDot
                                        ? dotActiveClassNames
                                        : dotInactiveClassNames
                                }
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
