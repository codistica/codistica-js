/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {socialIcons} from '../../../src/index.js';

/**
 * @description A Linkedin icon demo.
 * @returns {React.Component} React component.
 */
function Linkedin() {
    return <socialIcons.Linkedin href={'https://www.linkedin.com'} />;
}

export {Linkedin};

export default {
    title: 'Social Icons',
    parameters: {
        backgrounds: BGS_DARK
    }
};