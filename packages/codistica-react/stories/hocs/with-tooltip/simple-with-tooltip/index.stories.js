/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {withTooltip} from '../../../../src/index.js';
import classNames from './index.module.scss';

const Span = withTooltip('span');

/**
 * @description A simple with tooltip demo.
 * @returns {Object<string,*>} React component.
 */
function SimpleWithTooltip() {
    return (
        <Span
            tooltipRenderFn={() => {
                return (
                    <span className={classNames.tooltip}>Hello, World!</span>
                );
            }}
            className={classNames.root}>
            Hover Me
        </Span>
    );
}

export {SimpleWithTooltip};

export default {
    title: 'With Tooltip',
    parameters: {
        backgrounds: BGS_LIGHT
    },
    decorators: [centered]
};
