/** @flow */

import React from 'react';
import {InputFile} from '../../../../src/index.js';

function Default() {
    return (
        <InputFile
            name={'file'}
            buttonTitle={'Upload Files'}
            placeholder={'No Files'}
        />
    );
}

export {Default};
