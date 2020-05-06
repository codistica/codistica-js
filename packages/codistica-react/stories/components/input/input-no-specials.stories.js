/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {InputText, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description A dark input no specials demo.
 * @returns {Object<string,*>} React component.
 */
function InputNoSpecials() {
    return (
        <InputText
            placeholder={'No Specials'}
            plugins={[inputBlockers.specialBlocker, inputFilters.specialFilter]}
        />
    );
}

export {InputNoSpecials};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
