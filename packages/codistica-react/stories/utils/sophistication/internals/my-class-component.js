/** @flow */

import React, {Component} from 'react';
import {mergeClassNames, withSophistication} from '../../../../src/index.js';
import {styles} from './styles.js';

const MyClassComponent = withSophistication(
    styles,
    true
)(
    class MyClassComponent extends Component<any, any> {
        constructor() {
            super();

            this.state = {
                toggle: true
            };
        }

        render() {
            const {getSophistication, text, ...other} = this.props;
            const {toggle} = this.state;
            const jssClassNames = getSophistication({toggle, ...other});
            return (
                <div
                    onClick={() =>
                        this.setState((prevState) => ({
                            toggle: !prevState.toggle
                        }))
                    }
                    style={{cursor: 'pointer'}}
                    className={mergeClassNames(
                        jssClassNames.dynamicStyle,
                        jssClassNames.mixedValues,
                        jssClassNames.staticStyle
                    )}>
                    {text}
                </div>
            );
        }
    }
);

export {MyClassComponent};
