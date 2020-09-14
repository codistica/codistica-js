/** @flow */

import React from 'react';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description An input text letters demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextLetters() {
    return (
        <InputText
            name={'letters'}
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
    title: 'Input Text'
};
