/** @flow */

import React from 'react';
import {InputRenderer} from '../../../../src/index.js';

type Props = {
    name: string
};

function Simple(props: Props) {
    return (
        <InputRenderer
            {...props}
            placeholder={'Simple Input'}
            inputRenderFn={(bind) => {
                return <input {...bind} />;
            }}
        />
    );
}

export {Simple};
