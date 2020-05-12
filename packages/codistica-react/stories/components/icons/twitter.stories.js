/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {icons} from '../../../src/index.js';

/**
 * @description A Twitter icon demo.
 * @returns {Object<string,*>} React component.
 */
function Twitter() {
    return <icons.Twitter href={'https://twitter.com'} />;
}

export {Twitter};

export default {
    title: 'Icons',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
