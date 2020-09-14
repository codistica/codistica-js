/** @flow */

import React from 'react';
import {InputText, inputPresets} from '../../../src/index.js';

/**
 * @description An input text prettify demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextPrettify() {
    return (
        <InputText
            name={'prettify'}
            placeholder={'Prettify Input'}
            plugins={inputPresets.prettifyPreset}
        />
    );
}

export {InputTextPrettify};

export default {
    title: 'Input Text'
};
