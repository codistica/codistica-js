/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {withTooltip, createSophistication} from '../../../../src/index.js';

const Span = withTooltip('span');

const useSophistication = createSophistication({
    root: {
        border: '1px solid #000000',
        padding: '10px 30px',
        borderRadius: '5px',
        color: '#000000'
    },
    tooltip: {
        color: '#ffffff',
        backgroundColor: '#e83b35',
        whiteSpace: 'nowrap',
        padding: 5
    }
});

function Simple() {
    const jssClassNames = useSophistication();
    return (
        <Span
            tooltipRenderFn={() => {
                return (
                    <span className={jssClassNames.tooltip}>
                        {'Hello, World!'}
                    </span>
                );
            }}
            className={jssClassNames.root}>
            {'Hover Me'}
        </Span>
    );
}

Simple.decorators = [centered];

export {Simple};
