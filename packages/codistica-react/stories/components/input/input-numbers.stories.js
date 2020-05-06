/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description A dark input numbers demo.
 * @returns {Object<string,*>} React component.
 */
function InputNumbers() {
    return (
        <InputText
            placeholder={'Only Numbers'}
            plugins={[
                inputBlockers.nonNumberBlocker,
                inputFilters.nonNumberFilter
            ]}
        />
    );
}

export {InputNumbers};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
