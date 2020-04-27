/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {socialIcons} from '../../../src/index.js';

/**
 * @description A Twitter icon demo.
 * @returns {React.Component} React component.
 */
function Twitter() {
    return <socialIcons.Twitter href={'https://twitter.com'} />;
}

export {Twitter};

export default {
    title: 'Social Icons',
    parameters: {
        backgrounds: BGS_DARK
    }
};
