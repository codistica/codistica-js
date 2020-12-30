/** @flow */

import React from 'react';
import {InputText, inputPresets} from '../../../../src/index.js';

function Prettify() {
    return (
        <InputText
            name={'prettify'}
            placeholder={'Prettify'}
            plugins={inputPresets.prettifyPreset}
        />
    );
}

export {Prettify};
