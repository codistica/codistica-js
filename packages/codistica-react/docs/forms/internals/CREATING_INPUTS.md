# Forms - Creating Inputs

## Creating a simple controlled text input:

```js
import {InputRenderer} from '@codistica/react';
import React from 'react';

function Input(props) {
    return (
        <InputRenderer
            {...props}
            inputRenderFn={(bind) => {
                return <input {...bind} />;
            }}
        />
    );
}

export {Input};
```

## Styling inputs based on status:

```js
import {InputRenderer, createSophistication} from '@codistica/react';
import React from 'react';

const useSophistication = createSophistication({
    valid: {
        borderColor: '#00ff00'
    },
    invalid: {
        borderColor: '#ff0000'
    }
});

function Input(props) {
    const classes = useSophistication();
    return (
        <InputRenderer
            {...props}
            inputRenderFn={(bind, api) => {
                return <input {...bind} className={classes[api.status]} />;
            }}
        />
    );
}

export {Input};
```

## Rendering messages:

```js
import {InputRenderer} from '@codistica/react';
import React from 'react';

function Input(props) {
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

export {Input};
```
