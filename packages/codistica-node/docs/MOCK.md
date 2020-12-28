# Mock

_(Work in progress.)_

### The ultimate Node modules dependency mocking tool.

Some people say that you should have more testing code lines than code lines themselves. Testing is fundamental.

There could be many reasons pushing you into wanting to mock Node modules dependencies, and we know that there are some
controversies about this practice. All that we can say is that, by definition, things can go wrong during tests.
Actually, our absolute goal should be to make things fail during testing, but sometimes failure can be harmful.
Even in a controlled environment.

This is the best reason we could find to defend dependency mocking, and it is a good one. At the end, no one wants
to wipe his own data unintentionally because of a faulty recursive function.

We won't enter into the details of dependency mocking morality, but we will share our best implementation of it.

This work is inspired on [Mockery][mockery-url] and [Proxyquire][proxyquire-url]. Two mocking tools with different approaches
to the same problem. The former has not been updated in years, while both, at least at the time of writing this file, rely
on [module.parent][node-module-parent-url] and/or [require.extensions][node-require-extensions-url] which have been deprecated.

Our most fancy improvement is the creation of a virtual module tree, used to handle things without having to rely too much on Node APIs.

Finally, and most importantly, we think we've added sufficient features to help you surgically mock your dependencies and overcome
the most common related issues (Module system poisoning, cache management, targeting precision, etc.).

**_NOTE: Features described below are still under beta development. While this
does not necessarily mean they are unstable or insecure, keep in mind general
syntax and behavior can change in the future._**

## Usage

You have two ways of defining your mocking strategy. [Mockery][mockery-url] style and [Proxyquire][proxyquire-url] style.

### Mockery Style:

```js
import {mock} from '@codistica/node';
import {fs as mockFs} from 'memfs';

mock.registerMock('fs', mockFs, {
    target: /./,
    requester: resolve(__dirname, './some-path/requester-module.js')
});
```

```js
import {mock} from '@codistica/node';

mock.registerMock('nonexistent-module', 'MOCKED!', {
    target: /./
});
```

### Proxyquire Style:

```js
import {mock} from '@codistica/node';
import {fs as mockFs} from 'memfs';

const targetModule = mock.require(
    './some-path/target-module.js',
    {
        fs: mockFs
    },
    module
);
```

You can see some testing examples [here][testing-examples].

## APIs

-   [Mock API][mock-api]

## Additional Documentation

-   [Mockery][mockery-url]
-   [Proxyquire][proxyquire-url]
-   ["Please, stop playing with proxyquire"][dev-article-url] - (External Article)

<!--INTERNAL LINKS-->

[mock-api]: internals/MOCK_API.md
[testing-examples]: internals/TESTING_EXAMPLES.md

<!--EXTERNAL LINKS-->

[mockery-url]: https://github.com/mfncooper/mockery
[proxyquire-url]: https://github.com/thlorenz/proxyquire
[dev-article-url]: https://dev.to/thekashey/please-stop-playing-with-proxyquire-11j4
[node-module-parent-url]: https://nodejs.org/api/modules.html#modules_module_parent
[node-require-extensions-url]: https://nodejs.org/api/modules.html#modules_require_extensions
