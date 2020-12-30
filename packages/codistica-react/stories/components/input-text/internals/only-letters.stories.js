/** @flow */

import React from 'react';
import {InputText, inputBlockers, inputFilters} from '../../../../src/index.js';

function OnlyLetters() {
    return (
        <InputText
            name={'onlyLetters'}
            placeholder={'Only Letters'}
            plugins={[
                inputBlockers.nonLetterBlocker,
                inputFilters.nonLetterFilter
            ]}
        />
    );
}

export {OnlyLetters};
