/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {socialIcons} from '../../../src/index.js';

/**
 * @description A Youtube icon demo.
 * @returns {React.Component} React component.
 */
function Youtube() {
    return <socialIcons.Youtube href={'https://www.youtube.com'} />;
}

export {Youtube};

export default {
    title: 'Social Icons',
    parameters: {
        backgrounds: BGS_DARK
    }
};
