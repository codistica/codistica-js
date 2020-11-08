const reactPackages = [
    './packages/codistica-demo/src/**/*.js',
    './packages/codistica-react/src/**/*.js',
    './packages/codistica-react-icons/src/**/*.js',
    './packages/codistica-react-mui/src/**/*.js'
];

const browserPackages = [
    ...reactPackages,
    './packages/codistica-browser/src/**/*.js'
];

const nodePackages = [
    './packages/codistica-dev-tools/src/**/*.js',
    './packages/codistica-node/src/**/*.js',
    './packages/codistica-scriptfiber/src/**/*.js'
];

const jsdocPackages = [
    './packages/codistica-browser/src/**/*.js',
    './packages/codistica-core/src/**/*.js',
    './packages/codistica-dev-tools/src/**/*.js',
    './packages/codistica-node/src/**/*.js',
    './packages/codistica-scriptfiber/src/**/*.js',
    './packages/codistica-types/src/**/*.js'
];

module.exports = {
    extends: ['@codistica/eslint-config-default/base-preset'],
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
        // NODE PACKAGES
        {
            files: nodePackages,
            extends: ['@codistica/eslint-config-default/node-module']
        },
        // BROWSER PACKAGES
        {
            files: browserPackages,
            extends: ['@codistica/eslint-config-default/browser']
        },
        // REACT PACKAGES
        {
            files: [...reactPackages, './packages/*/stories/**/*.js'],
            extends: ['@codistica/eslint-config-default/react-preset']
        },
        // JSDOC
        {
            files: jsdocPackages,
            extends: ['@codistica/eslint-config-default/jsdoc']
        },
        // PUBLIC REACT PACKAGES (EXCEPTION)
        /** @todo FOLLOW https://github.com/facebook/flow/issues/8354. */
        /** @todo FOLLOW https://youtrack.jetbrains.com/issue/WEB-45239. */
        {
            files: [
                './packages/codistica-react/src/index.js',
                './packages/codistica-react-icons/src/index.js',
                './packages/codistica-react-mui/src/index.js'
            ],
            rules: {
                'import/extensions': ['warn', 'never']
            }
        },
        // STORYBOOK (EXCEPTION)
        {
            files: [
                './packages/*/stories/**/*.js',
                './packages/*/.storybook/**/*.js'
            ],
            extends: ['@codistica/eslint-config-default/storybook']
        }
    ]
};
