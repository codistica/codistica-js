/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputPresets} from '../../../src/index.js';

/**
 * @description An input text email demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextEmail() {
    return (
        <InputText
            name={'email'}
            placeholder={'Email Validation'}
            plugins={inputPresets.emailPreset}
        />
    );
}

export {InputTextEmail};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
