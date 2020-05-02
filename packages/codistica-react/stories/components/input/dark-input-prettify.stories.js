/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, inputPresets} from '../../../src/index.js';

/**
 * @description A dark input prettify demo.
 * @returns {React.Component} React component.
 */
function DarkInputPrettify() {
    return (
        <Input
            placeholder={'Prettify Input'}
            presets={inputPresets.prettifyPreset}
        />
    );
}

export {DarkInputPrettify};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
