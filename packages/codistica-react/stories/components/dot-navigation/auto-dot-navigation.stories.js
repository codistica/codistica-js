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

export {AutoDotNavigation};

export default {
    title: 'Dot Navigation'
};
