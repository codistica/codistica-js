'use strict';

module.exports = {
    useESModules: [
        '@babel/plugin-transform-runtime',
        {
            version: '^7.5.5',
            corejs: 3,
            proposals: true,
            useESModules: true
        }
    ],
    useCJS: [
        '@babel/plugin-transform-runtime',
        {
            version: '^7.5.5',
            corejs: 3,
            proposals: true,
            useESModules: false
        }
    ]
};
