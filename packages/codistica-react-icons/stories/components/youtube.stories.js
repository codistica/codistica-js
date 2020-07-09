/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React from 'react';
import {BGS_DARK} from '../../.storybook/custom-backgrounds.js';
import {Youtube as YoutubeIcon} from '../../src/index.js';

/**
 * @description A Youtube icon demo.
 * @returns {Object<string,*>} React component.
 */
function Youtube() {
    return <YoutubeIcon href={'https://www.youtube.com'} />;
}

export {Youtube};

export default {
    title: 'Socials',
    parameters: {
        backgrounds: BGS_DARK
    },
    decorators: [centered]
};
