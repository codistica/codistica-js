/** @flow */

import React, {useRef} from 'react';
import {Form, createSophistication} from '../../../../../src/index.js';
import {InputText} from './internals/input-text.stories.js';

const useSophistication = createSophistication({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: '20px 0'
        }
    }
});

function Simple() {
    const formRef = useRef(null);
    const jssClassNames = useSophistication();
    return (
        <Form
            onMount={(form) => (formRef.current = form)}
            className={jssClassNames.root}>
            <InputText
                name={'firstName'}
                placeholder={'First Name'}
                errorMessages={{
                    mandatory: 'This field is mandatory.'
                }}
            />
            <InputText
                name={'lastName'}
                placeholder={'Last Name'}
                errorMessages={{
                    mandatory: 'This field is mandatory.'
                }}
            />
            <button
                type={'button'}
                onClick={() => {
                    if (formRef.current) {
                        formRef.current.submit((result, payload) => {
                            if (result) {
                                alert(
                                    `Thank you ${payload.firstName} ${payload.lastName}`
                                );
                            } else {
                                alert('Please check form for errors');
                            }
                        });
                    }
                }}>
                {'Submit'}
            </button>
        </Form>
    );
}

export {Simple};
