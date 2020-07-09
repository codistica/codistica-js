/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../.storybook/custom-backgrounds.js';
import {Linkedin as LinkedInIcon} from '../../src/index.js';

/**
 * @description A Linkedin icon demo.
 * @returns {Object<string,*>} React component.
 */
function Linkedin() {
    return <LinkedInIcon href={'https://www.linkedin.com'} />;
}

export {Linkedin};

export default {
    title: 'Socials',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
