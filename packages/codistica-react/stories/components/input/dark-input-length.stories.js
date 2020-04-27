/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, InputValidators} from '../../../src/index.js';

/**
 * @description A dark input length demo.
 * @returns {React.Component} React component.
 */
function DarkInputLength() {
    return (
        <Input
            placeholder={'Min: 8 - Max: 10'}
            validators={InputValidators.length({minLength: 8, maxLength: 10})}
        />
    );
}

export {DarkInputLength};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
