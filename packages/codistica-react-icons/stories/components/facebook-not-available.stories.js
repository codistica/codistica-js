/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
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
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};
