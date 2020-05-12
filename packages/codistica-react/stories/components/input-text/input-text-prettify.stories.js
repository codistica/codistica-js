/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputPresets} from '../../../src/index.js';

/**
 * @description An input text prettify demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextPrettify() {
    return (
        <InputText
            placeholder={'Prettify Input'}
            presets={inputPresets.prettifyPreset}
        />
    );
}

export {InputTextPrettify};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
