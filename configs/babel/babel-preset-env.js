'use strict';

const {browserslist, engines} = require('../../package.json');

const targets = {
    browsers: browserslist,
    node: engines.node.replace(/[^0-9.]/g, '')
};

module.exports = {
    preserveModules: [
        '@babel/preset-env',
        {
            spec: true,
            modules: false,
            targets: targets,
            ignoreBrowserslistConfig: true
        }
    ],
    autoModules: [
        '@babel/preset-env',
        {
            spec: true,
            modules: 'auto',
            targets: targets,
            ignoreBrowserslistConfig: true
        }
    ]
};
