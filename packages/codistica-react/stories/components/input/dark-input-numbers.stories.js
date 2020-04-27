/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, InputBlockers, InputFilters} from '../../../src/index.js';

/**
 * @description A dark input numbers demo.
 * @returns {React.Component} React component.
 */
function DarkInputNumbers() {
    return (
        <Input
            placeholder={'Only Numbers'}
            filters={InputFilters.onlyNumbers}
            blockers={InputBlockers.onlyNumbers}
        />
    );
}

export {DarkInputNumbers};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
