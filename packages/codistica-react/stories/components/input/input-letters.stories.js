/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description A dark input letters demo.
 * @returns {Object<string,*>} React component.
 */
function InputLetters() {
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

export {InputLetters};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
