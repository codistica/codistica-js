/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {socialIcons} from '../../../src/index.js';

/**
 * @description A Facebook not available icon demo.
 * @returns {Object<string,*>} React component.
 */
function FacebookNotAvailable() {
    return <socialIcons.Facebook />;
}

export {FacebookNotAvailable};

export default {
    title: 'Social Icons',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
