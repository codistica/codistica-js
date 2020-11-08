/** @flow */

import {inputPresets} from '@codistica/react';
import React from 'react';
import {TextField} from '../../../src/index.js';

/**
 * @description An text field email demo.
 * @returns {Object<string,*>} React component.
 */
function TextFieldEmail() {
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
                    username: '- Use name.surname format.',
                    domains: '- You must use a codistica.com email address.'
                }
            })}
            errorMessages={{
                mandatory: 'This field is mandatory.'
            }}
        />
    );
}

const meta = {
    title: 'Text Field'
};

export {TextFieldEmail};
export default meta;
