/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, inputPresets} from '../../../src/index.js';

/**
 * @description A dark input email demo.
 * @returns {Object<string,*>} React component.
 */
function DarkInputEmail() {
    return (
        <Input
            placeholder={'Email Validation'}
            presets={inputPresets.emailPreset}
        />
    );
}

export {DarkInputEmail};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
