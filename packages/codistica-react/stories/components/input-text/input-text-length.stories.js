/** @flow */

import React from 'react';
import {InputText, inputValidators} from '../../../src/index.js';

/**
 * @description An input text length demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextLength() {
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

const meta = {
    title: 'Input Text'
};

export {InputTextLength};
export default meta;
