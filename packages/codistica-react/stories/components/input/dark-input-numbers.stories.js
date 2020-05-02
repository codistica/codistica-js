/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description A dark input numbers demo.
 * @returns {React.Component} React component.
 */
function DarkInputNumbers() {
    return (
        <Input
            placeholder={'Only Numbers'}
            plugins={[
                inputBlockers.nonNumberBlocker,
                inputFilters.nonNumberFilter
            ]}
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
