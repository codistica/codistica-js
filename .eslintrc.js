const browserPackages = [
    './packages/codistica-browser/**/*.js',
    './packages/codistica-demo/**/*.js',
    './packages/codistica-react/**/*.js'
];

const nodePackages = [
    './packages/codistica-node/**/*.js',
    './packages/codistica-dev-tools/**/*.js',
    './packages/codistica-scriptfiber/**/*.js'
];

const reactFlowPackages = ['./packages/codistica-react/**/*.js'];

const currentNodeVersion = '>=13.11.0';

// TODO: SPLIT IF POSSIBLE. APPLY SAME NODE CONFIGURATION TO ALL OVERRIDES IMPORTING NODE PLUGIN.
module.exports = {
    root: true,
    noInlineConfig: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['prettier', 'jsdoc', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:jsdoc/recommended',
        'plugin:import/errors',
        'plugin:import/warnings'
    ],
    env: {
        es2017: true,
        mocha: true,
        'shared-node-browser': true
    },
    rules: {
        'no-var': 'warn',
        'no-unused-vars': ['error', {ignoreRestSiblings: true}],
        'padding-line-between-statements': [
            'off',
            {blankLine: 'always', prev: 'block-like', next: '*'},
            {blankLine: 'always', prev: '*', next: 'block-like'}
        ],
        // TODO: SET TO warn
        'no-prototype-builtins': 'off',
        'prettier/prettier': 'warn',
        'jsdoc/valid-types': 'error',
        'jsdoc/no-undefined-types': 'error',
        'jsdoc/check-indentation': 'warn',
        'jsdoc/check-tag-names': 'error',
        'jsdoc/check-param-names': 'error',
        'jsdoc/check-property-names': 'error',
        'jsdoc/require-jsdoc': [
            'warn',
            {
                require: {
                    ArrowFunctionExpression: true,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionDeclaration: true,
                    FunctionExpression: true,
                    MethodDefinition: true
                },
                // TODO: SET TO FALSE.
                exemptEmptyFunctions: true
            }
        ],
        'jsdoc/require-description': [
            'warn',
            {
                descriptionStyle: 'tag',
                exemptedBy: [
                    'see',
                    'todo',
                    'type',
                    'typedef',
                    'callback',
                    'constant',
                    'module',
                    'namespace',
                    'classdesc',
                    'flow'
                ],
                contexts: ['any']
            }
        ],
        'jsdoc/require-description-complete-sentence': [
            'warn',
            {
                tags: ['description']
            }
        ],
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-property-type': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-hyphen-before-param-description': [
            'warn',
            'always',
            {
                checkProperties: true
            }
        ],
        'jsdoc/require-param': [
            'warn',
            {
                exemptedBy: ['see']
            }
        ],
        'jsdoc/require-param-name': ['error', {contexts: ['any']}],
        'jsdoc/require-param-type': ['error', {contexts: ['any']}],
        'jsdoc/require-param-description': ['warn', {contexts: ['any']}],
        'jsdoc/require-returns': [
            'warn',
            {
                exemptedBy: ['see'],
                forceRequireReturn: true,
                forceReturnsWithAsync: true,
                contexts: ['any']
            }
        ],
        'jsdoc/require-returns-type': ['error', {contexts: ['any']}],
        'jsdoc/require-returns-description': ['warn', {contexts: ['any']}],
        'import/no-unresolved': 'warn',
        'import/named': 'warn',
        'import/no-absolute-path': 'warn',
        'import/no-self-import': 'warn',
        'import/no-cycle': 'warn',
        'import/no-useless-path-segments': 'warn',
        'import/export': 'warn',
        'import/no-deprecated': 'warn',
        'import/no-mutable-exports': 'warn',
        'import/extensions': ['warn', 'ignorePackages'],
        'import/no-default-export': 'warn',
        'import/group-exports': 'warn',
        'import/order': [
            'warn',
            {
                groups: [
                    'builtin',
                    ['external', 'unknown'],
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ],
                alphabetize: {
                    order: 'asc'
                }
            }
        ],
        'import/newline-after-import': 'warn',
        'import/no-namespace': 'off',
        'import/no-duplicates': 'warn',
        'import/exports-last': 'warn'
    },
    settings: {
        jsdoc: {
            mode: 'jsdoc',
            tagNamePreference: {
                returns: 'returns',
                property: 'property',
                param: 'param',
                augments: 'extends',
                description: 'description',
                function: 'function'
            },
            overrideReplacesDocs: false,
            preferredTypes: {
                object: 'Object'
            },
            ignorePrivate: true
        }
    },
    overrides: [
        // FILES OUTSIDE SRC
        {
            files: ['!**/src/**/*.js'],
            excludedFiles: [
                './packages/*/stories/**/*.js',
                './packages/*/.storybook/**/*.js'
            ],
            plugins: ['node'],
            extends: ['plugin:node/recommended-script'],
            parserOptions: {
                ecmaVersion: 2015,
                sourceType: 'script'
            },
            env: {
                es2017: false,
                es6: true,
                node: true
            }
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
            files: reactFlowPackages,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            plugins: ['flowtype', 'react'],
            extends: [
                'prettier/flowtype',
                'prettier/react',
                'plugin:flowtype/recommended',
                'plugin:react/recommended'
            ],
            rules: {
                'jsdoc/check-tag-names': [
                    'warn',
                    {
                        definedTags: ['flow']
                    }
                ],
                'react/require-default-props': 'error'
            },
            settings: {
                flowtype: {
                    onlyFilesWithFlowAnnotation: true
                },
                react: {
                    version: 'detect'
                }
            }
        },
        // BROWSER PACKAGES
        {
            files: browserPackages,
            env: {
                'shared-node-browser': false,
                browser: true
            }
        },
        // NODE PACKAGES
        {
            files: nodePackages,
            plugins: ['node'],
            extends: ['plugin:node/recommended-module'],
            globals: {
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly'
            },
            env: {
                'shared-node-browser': false,
                node: true
            },
            rules: {
                'node/shebang': [
                    'error',
                    {
                        convertPath: {
                            'src/bin/**/*.js': ['^src/(.+?)\\.js$', 'lib/$1.js']
                        }
                    }
                ],
                'node/no-unsupported-features/es-syntax': [
                    'error',
                    {
                        version: currentNodeVersion,
                        ignores: ['dynamicImport', 'modules']
                    }
                ],
                'node/no-unsupported-features/node-builtins': [
                    'error',
                    {
                        version: currentNodeVersion
                    }
                ]
            }
        }
    ]
};
