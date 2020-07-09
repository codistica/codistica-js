/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
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

export {InputTextLength};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
