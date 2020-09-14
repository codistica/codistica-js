/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {Facebook as FacebookIcon} from '../../src/index.js';

/**
 * @description A Facebook icon demo.
 * @returns {Object<string,*>} React component.
 */
function Facebook() {
    return <FacebookIcon href={'https://www.facebook.com'} />;
}

export {Facebook};

export default {
    title: 'Socials',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};
