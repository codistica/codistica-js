/** @flow */

import {inputPresets} from '@codistica/react';
import React from 'react';
import {TextField} from '../../../../src/index.js';

function Email() {
    return (
        <TextField
            variant={'outlined'}
            name={'email'}
            label={'Email'}
            type={'email'}
            plugins={inputPresets.emailPreset({
                username: /^\w+\.\w+$/,
                domains: ['codistica.com'],
                errorMessages: {
                    generic: 'Please check this field:',
                    format: '- Invalid email address.',
                    username: '- Use firstName.lastName format.',
                    domains: '- You must use a codistica.com email address.'
                }
            })}
            errorMessages={{
                mandatory: 'This field is mandatory.'
            }}
        />
    );
}

export {Email};
