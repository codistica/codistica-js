/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../.storybook/custom-backgrounds.js';
import {Facebook as FacebookIcon} from '../../src/index.js';

/**
 * @description A Facebook not available icon demo.
 * @returns {Object<string,*>} React component.
 */
function FacebookNotAvailable() {
    return <FacebookIcon />;
}

export {FacebookNotAvailable};

export default {
    title: 'Socials',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
