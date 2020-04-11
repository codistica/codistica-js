'use strict';

const babelPluginProposalClassProperties = require('./configs/babel/babel-plugin-proposal-class-properties.js');
const babelPresetFlow = require('./configs/babel/babel-preset-flow.js');
const babelPresetReact = require('./configs/babel/babel-preset-react.js');
const babelTestReactPackage = require('./configs/babel/babel-test-react-package.js');

module.exports = {
    plugins: ['jsdoc-babel'],
    babel: {
        configFile: false,
        babelrc: false,
        plugins: [babelPluginProposalClassProperties],
        overrides: [
            {
                test: babelTestReactPackage,
                presets: [babelPresetReact, babelPresetFlow]
            }
        ]
    },
    recurseDepth: Infinity,
    source: {
        include: ['./packages/'],
        exclude: ['./packages/codistica-demo/'],
        includePattern: '.+[\\/]packages[\\/][^\\/]+[\\/]src[\\/].+\\.js$',
        excludePattern: '.+[\\/]packages[\\/][^\\/]+[\\/]src[\\/]__tests__/.+$'
    },
    sourceType: 'module',
    tags: {
        allowUnknownTags: false,
        dictionaries: ['jsdoc']
    },
    templates: {
        cleverLinks: false,
        monospaceLinks: false
    },
    opts: {
        template: 'templates/default',
        encoding: 'utf8',
        destination: './jsdoc',
        recurse: true
    }
};
