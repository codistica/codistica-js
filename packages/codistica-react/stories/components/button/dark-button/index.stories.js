/** @flow */

import React from 'react';
import {Button} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description A button demo.
 * @returns {Object<string,*>} React component.
 */
function DarkButton() {
    return (
        <Button
            title={'Dark Button'}
            customClassNames={{
                button: componentClassNames.button,
                buttonEnabled: componentClassNames.buttonEnabled
            }}
        />
    );
}

DarkButton.parameters = {
    backgrounds: {
        default: 'Dark'
    }
};

const meta = {
    title: 'Button'
};

export {DarkButton};
export default meta;
