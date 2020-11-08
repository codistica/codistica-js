/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {withTooltip} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

const Span = withTooltip<{}>('span');

/**
 * @description A simple with tooltip demo.
 * @returns {Object<string,*>} React component.
 */
function SimpleWithTooltip() {
    return (
        <Span
            tooltipRenderFn={() => {
                return (
                    <span className={componentClassNames.tooltip}>
                        {'Hello, World!'}
                    </span>
                );
            }}
            className={componentClassNames.root}>
            {'Hover Me'}
        </Span>
    );
}

const meta = {
    title: 'With Tooltip',
    decorators: [centered]
};

export {SimpleWithTooltip};
export default meta;
