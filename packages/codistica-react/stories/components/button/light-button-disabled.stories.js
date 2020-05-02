/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../src/index.js';

/**
 * @description A light button disabled demo.
 * @returns {Object<string,*>} React component.
 */
function LightButtonDisabled() {
    return <Button text={'Disabled Button'} disabled={true} />;
}

export {LightButtonDisabled};

export default {
    title: 'Button',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
