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

function Dark() {
    const jssClassNames = useSophistication();
    return (
        <Button
            title={'Dark'}
            customClassNames={{
                button: jssClassNames.button,
                buttonEnabled: jssClassNames.buttonEnabled
            }}
        />
    );
}

Dark.parameters = {
    backgrounds: {
        default: 'Dark'
    }
};

export {Dark};
