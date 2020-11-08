/** @flow */

import React from 'react';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description An input text no specials demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextNoSpecials() {
    return (
        <InputText
            name={'noSpecials'}
            placeholder={'No Specials'}
            plugins={[inputBlockers.specialBlocker, inputFilters.specialFilter]}
        />
    );
}

const meta = {
    title: 'Input Text'
};

export {InputTextNoSpecials};
export default meta;
