/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, InputBlockers, InputFilters} from '../../../src/index.js';

/**
 * @description A dark input letters demo.
 * @returns {React.Component} React component.
 */
function DarkInputLetters() {
    return (
        <Input
            placeholder={'Only Letters'}
            filters={InputFilters.onlyLetters}
            blockers={InputBlockers.onlyLetters}
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
