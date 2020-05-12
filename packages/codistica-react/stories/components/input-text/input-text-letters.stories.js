/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description An input text letters demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextLetters() {
    return (
        <InputText
            placeholder={'Only Letters'}
            plugins={[
                inputBlockers.nonLetterBlocker,
                inputFilters.nonLetterFilter
            ]}
        />
    );
}

export {InputTextLetters};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
