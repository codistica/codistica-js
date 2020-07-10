/** @flow */

/** @module react/components/dot-navigation */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    quantity: number,
    dotIndex: number,
    size: string,
    direction: 'row' | 'column',
    auto: boolean,
    onSwitch: (...args: Array<any>) => any,
    waitForCallback: boolean,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any},
        dot?: {[string]: any},
        dotActive?: {[string]: any},
        dotInactive?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        dot?: string,
        dotActive?: string,
        dotInactive?: string
    },
    globalTheme: 'default' | string | null
};

type State = {
    autoPosition: number
};

type GlobalStyles = {
    [string]: {
        root?: {[string]: any},
        dot?: {[string]: any},
        dotActive?: {[string]: any},
        dotInactive?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string,
        dot?: string,
        dotActive?: string,
        dotInactive?: string
    }
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
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @classdesc A generic dot navigation component.
 */
class DotNavigation extends React.Component<Props, State> {
    static globalStyles: GlobalStyles = {
        default: {
            root: {},
            dot: {},
            dotActive: {},
            dotInactive: {}
        }
    };

    static globalClassNames: GlobalClassNames = {
        default: {
            root: '',
            dot: '',
            dotActive: '',
            dotInactive: ''
        }
    };

    static defaultProps = {
        quantity: 0,
        dotIndex: 0,
        size: '17px',
        direction: 'row',
        auto: true,
        onSwitch: null,
        waitForCallback: false,
        style: {},
        className: '',
        customStyles: {},
        customClassNames: {},
        globalTheme: 'default'
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
            style,
            className,
            customStyles,
            customClassNames,
            globalTheme
        } = this.props;
        const {autoPosition} = this.state;

        const globalStyles = globalTheme
            ? DotNavigation.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? DotNavigation.globalClassNames[globalTheme] || {}
            : {};

        const mergedStyles = {
            root: mergeStyles(globalStyles.root, customStyles.root, style, {
                flexDirection: direction
            }),
            dotActive: mergeStyles(
                globalStyles.dot,
                globalStyles.dotActive,
                customStyles.dot,
                customStyles.dotActive,
                {
                    height: size,
                    width: size
                }
            ),
            dotInactive: mergeStyles(
                globalStyles.dot,
                globalStyles.dotInactive,
                customStyles.dot,
                customStyles.dotInactive,
                {
                    height: size,
                    width: size
                }
            )
        };

        const mergedClassNames = {
            root: mergeClassNames(
                resetClassNames.root,
                componentClassNames.root,
                globalClassNames.root,
                customClassNames.root,
                className
            ),
            dotActive: mergeClassNames(
                componentClassNames.dotActive,
                globalClassNames.dot,
                globalClassNames.dotActive,
                customClassNames.dot,
                customClassNames.dotActive
            ),
            dotInactive: mergeClassNames(
                componentClassNames.dotInactive,
                globalClassNames.dot,
                globalClassNames.dotInactive,
                customClassNames.dot,
                customClassNames.dotInactive
            )
        };

        return (
            <span style={mergedStyles.root} className={mergedClassNames.root}>
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
                                        ? mergedStyles.dotActive
                                        : mergedStyles.dotInactive
                                }
                                className={
                                    isActiveDot
                                        ? mergedClassNames.dotActive
                                        : mergedClassNames.dotInactive
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
