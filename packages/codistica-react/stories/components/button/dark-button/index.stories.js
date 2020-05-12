/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../../src/index.js';
import classNames from './index.module.scss';

/**
 * @description A button demo.
 * @returns {Object<string,*>} React component.
 */
function DarkButton() {
    return (
        <Button
            title={'Dark Button'}
            customClassNames={{
                button: classNames.button,
                buttonEnabled: classNames.buttonEnabled
            }}
        />
    );
}

export {DarkButton};

export default {
    title: 'Button',
    parameters: {
        backgrounds: BGS_DARK
    }
};
