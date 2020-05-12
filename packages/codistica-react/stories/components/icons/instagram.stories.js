/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {icons} from '../../../src/index.js';

/**
 * @description A Instagram icon demo.
 * @returns {Object<string,*>} React component.
 */
function Instagram() {
    return <icons.Instagram href={'https://www.instagram.com'} />;
}

export {Instagram};

export default {
    title: 'Icons',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
