module.exports = {
    extends: ['@codistica/eslint-config-default'],
    overrides: [
        // FILES OUTSIDE SRC
        {
            files: ['!**/src/**/*.js'],
            excludedFiles: [
                './packages/*/stories/**/*.js',
                './packages/*/.storybook/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/node-script']
        },
        // STORYBOOK
        {
            files: [
                './packages/*/stories/**/*.js',
                './packages/*/.storybook/**/*.js'
            ],
            env: {
                'shared-node-browser': false,
                browser: true,
                node: true
            },
            rules: {
                'import/no-default-export': 'off'
            }
        },
        // REACT + FLOW
        {
            files: [
                './packages/codistica-demo/src/**/*.js',
                './packages/codistica-react/src/**/*.js',
                './packages/codistica-react-icons/src/**/*.js',
                './packages/codistica-react-mui/src/**/*.js',
                './packages/*/stories/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/react']
        },
        // BROWSER
        {
            files: [
                './packages/codistica-browser/src/**/*.js',
                './packages/codistica-demo/src/**/*.js',
                './packages/codistica-react/src/**/*.js',
                './packages/codistica-react-icons/src/**/*.js',
                './packages/codistica-react-mui/src/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/browser']
        },
        // NODE
        {
            files: [
                './packages/codistica-node/src/**/*.js',
                './packages/codistica-dev-tools/src/**/*.js',
                './packages/codistica-scriptfiber/src/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/node-module']
        },
        // CRA
        {
            files: ['./packages/codistica-demo/src/**/*.js'],
            extends: ['react-app']
        },
        // EXCEPTIONS
        /** @todo FOLLOW https://github.com/facebook/flow/issues/8354 and https://youtrack.jetbrains.com/issue/WEB-45239 issues. */
        {
            files: [
                './packages/codistica-react/src/index.js',
                './packages/codistica-react-icons/src/index.js',
                './packages/codistica-react-mui/src/index.js'
            ],
            rules: {
                'import/extensions': ['warn', 'never']
            }
        }
    ]
};
