/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description An input text no specials demo.
 * @returns {Object<string,*>} React component.
 */
function InputTextNoSpecials() {
    return (
        <InputText
            placeholder={'No Specials'}
            plugins={[inputBlockers.specialBlocker, inputFilters.specialFilter]}
        />
    );
}

export {InputTextNoSpecials};

export default {
    title: 'Input Text',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
