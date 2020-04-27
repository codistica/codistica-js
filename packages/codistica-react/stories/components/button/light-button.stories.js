/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../src/index.js';

/**
 * @description A light button demo.
 * @returns {React.Component} React component.
 */
function LightButton() {
    return <Button text={'Light Button'} />;
}

export {LightButton};

export default {
    title: 'Button',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
