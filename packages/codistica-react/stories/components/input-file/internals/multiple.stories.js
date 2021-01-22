/** @flow */

import React from 'react';
import {InputFile} from '../../../../src/index.js';

function Multiple() {
    return (
        <InputFile
            name={'file'}
            buttonTitle={'Upload Files'}
            placeholder={'No Files'}
            multiple={true}
        />
    );
}

export {Multiple};
