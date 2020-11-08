/** @flow */

import React from 'react';
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
            name={'password'}
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

const meta = {
    title: 'Input Text'
};

export {InputTextPassword};
export default meta;
