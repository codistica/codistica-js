/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, InputPresets} from '../../../src/index.js';

/**
 * @description A dark input email demo.
 * @returns {React.Component} React component.
 */
function DarkInputEmail() {
    return (
        <Input placeholder={'Email Validation'} presets={InputPresets.email} />
    );
}

export {DarkInputEmail};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
