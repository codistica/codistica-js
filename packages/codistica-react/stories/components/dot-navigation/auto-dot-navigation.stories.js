/** @flow */

import React from 'react';
import {DotNavigation} from '../../../src/index.js';

/**
 * @description An auto dot navigation demo.
 * @returns {Object<string,*>} React component.
 */
function AutoDotNavigation() {
    return <DotNavigation quantity={5} direction={'column'} />;
}

const meta = {
    title: 'Dot Navigation'
};

export {AutoDotNavigation};
export default meta;
