'use strict';

module.exports = {
    plugins: ['jsdoc-babel'],
    babel: {
        configFile: false,
        babelrc: false,
        plugins: ['@babel/plugin-proposal-class-properties'],
        overrides: [
            {
                test: (file) => {
                    return [
                        /.+[\\/]packages[\\/]codistica-react[\\/].+\.js$/
                    ].some((regExp) => regExp.test(file));
                },
                presets: ['@babel/preset-react', '@babel/preset-flow']
            }
        ]
    },
    recurseDepth: Infinity,
    source: {
        include: ['./src'],
        includePattern: '.+[\\/]src[\\/].+\\.js$',
        excludePattern: '.+[\\/]src[\\/]__tests__/.+$'
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
