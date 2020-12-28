/** @flow */

import React from 'react';
import {InputRenderer} from '../../../../../../src/index.js';

type Props = {
    name: string
};

function InputText(props: Props) {
    return (
        <InputRenderer
            {...props}
            inputRenderFn={(bind, api) => {
                return (
                    <div>
                        <input {...bind} />
                        {api.validationObject.messages.map(
                            (messageObject, index) => (
                                <p key={index}>{messageObject.message}</p>
                            )
                        )}
                    </div>
                );
            }}
        />
    );
}

export {InputText};
