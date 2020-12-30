/** @flow */

import React from 'react';
import {InputText, inputBlockers, inputFilters} from '../../../../src/index.js';

function OnlyNumbers() {
    return (
        <InputText
            name={'onlyNumbers'}
            placeholder={'Only Numbers'}
            plugins={[
                inputBlockers.nonNumberBlocker,
                inputFilters.nonNumberFilter
            ]}
        />
    );
}

export {OnlyNumbers};
