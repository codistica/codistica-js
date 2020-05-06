/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputPresets} from '../../../src/index.js';

/**
 * @description A dark input prettify demo.
 * @returns {Object<string,*>} React component.
 */
function InputPrettify() {
    return (
        <InputText
            placeholder={'Prettify Input'}
            presets={inputPresets.prettifyPreset}
        />
    );
}

export {InputPrettify};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
