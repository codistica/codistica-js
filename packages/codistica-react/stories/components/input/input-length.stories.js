/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputValidators} from '../../../src/index.js';

/**
 * @description A dark input length demo.
 * @returns {Object<string,*>} React component.
 */
function InputLength() {
    return (
        <InputText
            placeholder={'Min: 8 - Max: 10'}
            plugins={inputValidators.lengthValidator({
                minLength: 8,
                maxLength: 10
            })}
        />
    );
}

export {InputLength};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
