/** @flow */

import React from 'react';
import {InputText, inputBlockers, inputFilters} from '../../../../src/index.js';

function NoSpecials() {
    return (
        <InputText
            name={'noSpecials'}
            placeholder={'No Specials'}
            plugins={[inputBlockers.specialBlocker, inputFilters.specialFilter]}
        />
    );
}

export {NoSpecials};
