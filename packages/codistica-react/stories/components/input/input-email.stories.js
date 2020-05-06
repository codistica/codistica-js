/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputPresets} from '../../../src/index.js';

/**
 * @description A dark input email demo.
 * @returns {Object<string,*>} React component.
 */
function InputEmail() {
    return (
        <InputText
            placeholder={'Email Validation'}
            presets={inputPresets.emailPreset}
        />
    );
}

export {InputEmail};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
