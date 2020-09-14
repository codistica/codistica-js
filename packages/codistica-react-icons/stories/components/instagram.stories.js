/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {Instagram as InstagramIcon} from '../../src/index.js';

/**
 * @description A Instagram icon demo.
 * @returns {Object<string,*>} React component.
 */
function Instagram() {
    return <InstagramIcon href={'https://www.instagram.com'} />;
}

export {Instagram};

export default {
    title: 'Socials',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};
