/** @flow */

import React from 'react';
import {InputText, inputPresets} from '../../../../src/index.js';

function Email() {
    return (
        <InputText
            name={'email'}
            placeholder={'Email'}
            plugins={inputPresets.emailPreset}
        />
    );
}

export {Email};
