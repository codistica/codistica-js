/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description A button href demo.
 * @returns {Object<string,*>} React component.
 */
function DarkButtonHref() {
    return (
        <Button
            title={'Dark Button Href'}
            href={'https://www.codistica.com'}
            customClassNames={{
                button: componentClassNames.button,
                buttonEnabled: componentClassNames.buttonEnabled
            }}
        />
    );
}

export {DarkButtonHref};

export default {
    title: 'Button',
    parameters: {
        backgrounds: BGS_DARK
    }
};
