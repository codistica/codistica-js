/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {DotNavigation} from '../../../src/index.js';

/**
 * @description An auto dot navigation demo.
 * @returns {React.Component} React component.
 */
function AutoDotNavigation() {
    return <DotNavigation quantity={5} direction={'column'} />;
}

export {AutoDotNavigation};

export default {
    title: 'Dot Navigation',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
