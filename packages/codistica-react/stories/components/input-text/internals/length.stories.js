/** @flow */

import React from 'react';
import {InputText, inputValidators} from '../../../../src/index.js';

function Length() {
    return (
        <InputText
            name={'length'}
            placeholder={'Min: 8 - Max: 10'}
            plugins={inputValidators.lengthValidator({
                minLength: 8,
                maxLength: 10
            })}
        />
    );
}

export {Length};
