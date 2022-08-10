# Types

_(Work in progress.)_

### Runtime type checking, default setting and coercing utility.

This is a utility to validate and auto-complete data structures at runtime.

**_NOTE: Features described below are still under beta development. While this
does not necessarily mean they are unstable or insecure, keep in mind general
syntax and behavior can change in the future._**

## Usage

```js
import {Types} from '@codistica/types';

const myFunctionTypes = new Types({
    argA: {type: '!undefined'},
    argB: {type: 'Function'},
    argC: {
        type: 'Object',
        def: {
            propA: {type: 'number', min: 0, max: 20, def: 10},
            propB: {type: 'boolean', def: false},
            propC: {type: ['Function', 'null'], def: null},
            propD: {type: 'Array<number>', def: [0, 1, 2]}
        }
    }
});

function myFunction(argA, argB, argC) {
    ({argA, argB, argC} = myFunctionTypes.validate({
        argA,
        argB,
        argC
    }));

    if (!myFunctionTypes.isValid()) {
        return;
    }
}

export {myFunction};
```

## APIs

-   [Types API][types-api]

<!--INTERNAL LINKS-->

[types-api]: internals/TYPES_API.md
