/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description A dark input letters demo.
 * @returns {Object<string,*>} React component.
 */
function DarkInputLetters() {
    return (
        <Input
            placeholder={'Only Letters'}
            plugins={[
                inputBlockers.nonLetterBlocker,
                inputFilters.nonLetterFilter
            ]}
        />
    );
}

export {DarkInputLetters};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
