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
            }
        },
        // REACT + FLOW PACKAGES
        {
            files: [
                './packages/codistica-demo/src/**/*.js',
                './packages/codistica-react/src/**/*.js',
                './packages/*/stories/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/react']
        },
        // BROWSER PACKAGES
        {
            files: [
                './packages/codistica-browser/src/**/*.js',
                './packages/codistica-demo/src/**/*.js',
                './packages/codistica-react/src/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/browser']
        },
        // NODE PACKAGES
        {
            files: [
                './packages/codistica-node/src/**/*.js',
                './packages/codistica-dev-tools/src/**/*.js',
                './packages/codistica-scriptfiber/src/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/node-module']
        }
    ]
};
