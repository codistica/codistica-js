/** @flow */

import React from 'react';
import {Button} from '../../../src/index.js';

/**
 * @description A light button demo.
 * @returns {Object<string,*>} React component.
 */
function LightButton() {
    return <Button title={'Light Button'} />;
}

const meta = {
    title: 'Button'
};

export {LightButton};
export default meta;
