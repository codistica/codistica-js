/** @flow */

import React from 'react';
import {InputFile} from '../../../src/index.js';

/**
 * @description An input for any file.
 * @returns {Object<string,*>} React component.
 */
function InputFileDefault() {
    return <InputFile name={'file'} />;
}

export {InputFileDefault};

export default {
    title: 'Input File'
};
