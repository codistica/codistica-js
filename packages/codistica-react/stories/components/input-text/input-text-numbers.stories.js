/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description An input text numbers demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextNumbers() {
    return (
        <InputText
            name={'numbers'}
            placeholder={'Only Numbers'}
            plugins={[
                inputBlockers.nonNumberBlocker,
                inputFilters.nonNumberFilter
            ]}
        />
    );
}

export {InputTextNumbers};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
