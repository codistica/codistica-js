/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {socialIcons} from '../../../src/index.js';

/**
 * @description A Instagram icon demo.
 * @returns {React.Component} React component.
 */
function Instagram() {
    return <socialIcons.Instagram href={'https://www.instagram.com'} />;
}

export {Instagram};

export default {
    title: 'Social Icons',
    parameters: {
        backgrounds: BGS_DARK
    }
};
