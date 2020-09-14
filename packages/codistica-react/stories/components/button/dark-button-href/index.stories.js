/** @flow */

import React from 'react';
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

DarkButtonHref.parameters = {
    backgrounds: {
        default: 'Dark'
    }
};

export {DarkButtonHref};

export default {
    title: 'Button'
};
