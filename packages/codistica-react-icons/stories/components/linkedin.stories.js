/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
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
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};
