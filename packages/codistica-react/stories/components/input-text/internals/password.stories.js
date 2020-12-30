/** @flow */

import React from 'react';
import {
    InputText,
    inputBlockers,
    inputFilters,
    inputValidators
} from '../../../../src/index.js';

function Password() {
    return (
        <InputText
            name={'password'}
            type={'password'}
            placeholder={'Password'}
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

export {Password};
