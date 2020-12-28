# Forms - Using Plugins

Every input created by using `<InputRenderer>` will support our full plugin system via the `plugins` prop.

The `plugins` prop accepts a single plugin or an array of plugins with any nesting level.

There are four (4) types of plugins:

-   **Validators:** They are useful to apply custom validation logic to your input. Validators can validate, invalidate or ignore an input state both sync and asynchronously.
-   **Filters:** This type of plugin can modify the input value after user interaction ended.
-   **Blockers:** These plugins are able to completely block a particular user input action, preventing it to reaching the input element in the first place.
-   **Presets:** Presets are just groups of pre-configured plugins (or even other presets).

```js
import {inputValidators} from '@codistica/react';
import React from 'react';
import {Input} from './input.js';

function App() {
    return (
        <Input
            name={'email'}
            placeholder={'Email'}
            plugins={inputValidators.emailValidator}
        />
    );
}

export {App};
```

Plugins can be passed initialized or uninitialized. They all have built-in defaults by design and have the same signature. Options, when available, are passed by calling plugins with an object as argument.

```js
import {inputValidators} from '@codistica/react';
import React from 'react';
import {Input} from './input.js';

function App() {
    return (
        <Input
            name={'email'}
            placeholder={'Email'}
            plugins={inputValidators.emailValidator({
                username: /^\w+\.\w+$/,
                domains: [/\.com$/],
                errorMessages: {
                    generic: 'Please check this field:',
                    format: '- Invalid email address.',
                    username: '- Use firstName.lastName format.',
                    domains: '- You must use a .com email address.'
                }
            })}
        />
    );
}

export {App};
```
