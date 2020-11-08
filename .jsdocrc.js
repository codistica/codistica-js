module.exports = {
    plugins: ['jsdoc-babel'],
    babel: {
        configFile: '../../babel.config.js'
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
