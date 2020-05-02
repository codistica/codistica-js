/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, inputValidators} from '../../../src/index.js';

/**
 * @description A dark input length demo.
 * @returns {Object<string,*>} React component.
 */
function DarkInputLength() {
    return (
        <Input
            placeholder={'Min: 8 - Max: 10'}
            plugins={inputValidators.lengthValidator({
                minLength: 8,
                maxLength: 10
            })}
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
