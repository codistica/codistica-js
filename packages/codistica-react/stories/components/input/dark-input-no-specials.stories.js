/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Input, InputBlockers, InputFilters} from '../../../src/index.js';

/**
 * @description A dark input no specials demo.
 * @returns {React.Component} React component.
 */
function DarkInputNoSpecials() {
    return (
        <Input
            placeholder={'No Specials'}
            filters={InputFilters.noSpecials}
            blockers={InputBlockers.noSpecials}
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
