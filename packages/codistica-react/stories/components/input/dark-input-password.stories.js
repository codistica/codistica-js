/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {
    Input,
    InputBlockers,
    InputFilters,
    InputValidators
} from '../../../src/index.js';

/**
 * @description A dark input password demo.
 * @returns {React.Component} React component.
 */
function DarkInputPassword() {
    return (
        <Input
            type={'password'}
            placeholder={'Password Validator (medium)'}
            filters={InputFilters.noSpaces}
            blockers={InputBlockers.noSpaces}
            validators={InputValidators.password({
                minLength: 8,
                maxLength: 30,
                specials: 0
            })}
        />
    );
}

export {DarkInputPassword};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
