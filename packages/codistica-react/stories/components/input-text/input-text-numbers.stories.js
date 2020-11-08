/** @flow */

import React from 'react';
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

const meta = {
    title: 'Input Text'
};

export {InputTextNumbers};
export default meta;
