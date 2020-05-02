/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {socialIcons} from '../../../src/index.js';

/**
 * @description A Facebook icon demo.
 * @returns {Object<string,*>} React component.
 */
function Facebook() {
    return <socialIcons.Facebook href={'https://www.facebook.com'} />;
}

export {Facebook};

export default {
    title: 'Social Icons',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
