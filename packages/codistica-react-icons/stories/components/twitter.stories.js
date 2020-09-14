/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {Twitter as TwitterIcon} from '../../src/index.js';

/**
 * @description A Twitter icon demo.
 * @returns {Object<string,*>} React component.
 */
function Twitter() {
    return <TwitterIcon href={'https://twitter.com'} />;
}

export {Twitter};

export default {
    title: 'Socials',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};
