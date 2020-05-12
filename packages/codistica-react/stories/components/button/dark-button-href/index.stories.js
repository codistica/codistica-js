/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../../.storybook/custom-backgrounds.js';
import {Button} from '../../../../src/index.js';
import classNames from './index.module.scss';

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
                button: classNames.button,
                buttonEnabled: classNames.buttonEnabled
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
