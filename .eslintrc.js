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
        // COMMON JS
        {
            files: [
                './packages/*/stories/**/*.js',
                './packages/*/.storybook/**/*.js'
            ],
            env: {
                'shared-node-browser': false,
                browser: true,
                node: true,
                commonjs: true
            }
        },
        // REACT + FLOW PACKAGES
        {
            files: ['./packages/codistica-react/**/*.js'],
            extends: ['@codistica/eslint-config-default/react']
        },
        // BROWSER PACKAGES
        {
            files: [
                './packages/codistica-browser/**/*.js',
                './packages/codistica-demo/**/*.js',
                './packages/codistica-react/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/browser']
        },
        // NODE PACKAGES
        {
            files: [
                './packages/codistica-node/**/*.js',
                './packages/codistica-dev-tools/**/*.js',
                './packages/codistica-scriptfiber/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/node-module']
        }
    ]
};
