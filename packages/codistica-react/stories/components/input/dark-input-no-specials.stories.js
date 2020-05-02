/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, inputBlockers, inputFilters} from '../../../src/index.js';

/**
 * @description A dark input no specials demo.
 * @returns {React.Component} React component.
 */
function DarkInputNoSpecials() {
    return (
        <Input
            placeholder={'No Specials'}
            plugins={[inputBlockers.specialBlocker, inputFilters.specialFilter]}
        />
    );
}

export {DarkInputNoSpecials};

export default {
    title: 'Input',
    parameters: {
        backgrounds: BGS_DARK
    }
};
