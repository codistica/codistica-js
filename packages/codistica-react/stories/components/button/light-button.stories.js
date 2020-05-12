/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../src/index.js';

/**
 * @description A light button demo.
 * @returns {Object<string,*>} React component.
 */
function LightButton() {
    return <Button title={'Light Button'} />;
}

export {LightButton};

export default {
    title: 'Button',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
