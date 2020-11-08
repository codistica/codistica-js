/** @flow */

import React from 'react';
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

const meta = {
    title: 'Input Text'
};

export {InputTextEmail};
export default meta;
