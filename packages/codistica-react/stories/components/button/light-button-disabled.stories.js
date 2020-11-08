/** @flow */

import React from 'react';
import {Button} from '../../../src/index.js';

/**
 * @description A light button disabled demo.
 * @returns {Object<string,*>} React component.
 */
function LightButtonDisabled() {
    return <Button title={'Disabled Button'} disabled={true} />;
}

const meta = {
    title: 'Button'
};

export {LightButtonDisabled};
export default meta;
