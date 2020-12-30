/** @flow */

import React from 'react';
import {InputRenderer, createSophistication} from '../../../../src/index.js';

type Props = {
    name: string
};

const useSophistication = createSophistication({
    valid: {
        backgroundColor: '#00ff00'
    },
    invalid: {
        backgroundColor: '#ff0000'
    }
});

function Styled(props: Props) {
    const classes = useSophistication();
    return (
        <InputRenderer
            {...props}
            placeholder={'Styled Input'}
            inputRenderFn={(bind, api) => {
                return <input {...bind} className={classes[api.status]} />;
            }}
        />
    );
}

export {Styled};
