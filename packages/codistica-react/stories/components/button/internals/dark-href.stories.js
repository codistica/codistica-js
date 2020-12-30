/** @flow */

import React from 'react';
import {Button, createSophistication} from '../../../../src/index.js';

const useSophistication = createSophistication({
    button: {
        borderColor: '#dedede',
        color: '#dedede'
    },
    buttonEnabled: {
        '&:focus, &:hover': {
            backgroundColor: 'rgba(222, 222, 222, 0.1)'
        }
    }
});

function DarkHref() {
    const jssClassNames = useSophistication();
    return (
        <Button
            title={'Dark Href'}
            href={'https://www.codistica.com'}
            customClassNames={{
                button: jssClassNames.button,
                buttonEnabled: jssClassNames.buttonEnabled
            }}
        />
    );
}

DarkHref.parameters = {
    backgrounds: {
        default: 'Dark'
    }
};

export {DarkHref};
