# Forms - Using Inputs

## Simple Usage

```js
import {Form} from '@codistica/react';
import React, {useRef} from 'react';
import {Input} from './input.js';

function App() {
    const formRef = useRef(null);
    return (
        <Form onMount={(form) => (formRef.current = form)}>
            <Input
                name={'firstName'}
                placeholder={'First Name'}
                errorMessages={{
                    mandatory: 'This field is mandatory.'
                }}
            />

            <Input
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

export {App};
```
