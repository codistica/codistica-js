/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, InputPresets} from '../../../src/index.js';

/**
 * @description A dark input prettify demo.
 * @returns {React.Component} React component.
 */
function DarkInputPrettify() {
    return (
        <Input placeholder={'Prettify Input'} presets={InputPresets.prettify} />
    );
}

export {DarkInputPrettify};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
