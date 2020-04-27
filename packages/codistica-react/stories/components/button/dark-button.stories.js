/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../src/index.js';

/**
 * @description A dark button demo.
 * @returns {React.Component} React component.
 */
function DarkButton() {
    return <Button text={'Dark Button'} dark={true} />;
}

export {DarkButton};

export default {
    title: 'Button',
    parameters: {
        backgrounds: BGS_DARK
    }
};
