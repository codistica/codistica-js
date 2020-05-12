/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {
    InputText,
    inputBlockers,
    inputFilters,
    inputValidators
} from '../../../src/index.js';

/**
 * @description An input text password demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextPassword() {
    return (
        <InputText
            type={'password'}
            placeholder={'Password Validator (medium)'}
            plugins={[
                inputBlockers.spaceBlocker,
                inputFilters.spaceFilter,
                inputValidators.passwordValidator({
                    minLength: 8,
                    maxLength: 30,
                    specials: 0
                })
            ]}
        />
    );
}

export {InputTextPassword};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
