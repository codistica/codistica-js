'use strict';

const babelPluginBanner = require('./configs/babel/babel-plugin-banner.js');
const babelPluginProposalClassProperties = require('./configs/babel/babel-plugin-proposal-class-properties.js');
const babelPluginTransformRuntime = require('./configs/babel/babel-plugin-transform-runtime.js');
const babelPresetEnv = require('./configs/babel/babel-preset-env.js');
const babelPresetFlow = require('./configs/babel/babel-preset-flow.js');
const babelPresetReact = require('./configs/babel/babel-preset-react.js');
const babelTestReactPackage = require('./configs/babel/babel-test-react-package.js');

/**
 * @function babelConfig
 * @description Babel configuration function.
 * @param {Object<string,*>} [api] - Babel configuration API.
 * @returns {Object<string,*>} Babel configuration object.
 */
module.exports = function babelConfig(api) {
    // GET NEEDED PROCESS ENV VARIABLES
    const ESModules = process.env.NPM_CONFIG_ES_MODULES === 'true';

    if (api) {
        // SETUP CACHE
        api.cache.using(() => ESModules);
    }

    return {
        presets: [
            ESModules
                ? babelPresetEnv.preserveModules
                : babelPresetEnv.autoModules
        ],
        plugins: [
            babelPluginBanner,
            ESModules
                ? babelPluginTransformRuntime.useESModules
                : babelPluginTransformRuntime.useCJS,
            babelPluginProposalClassProperties
        ],
        overrides: [
            {
                test: babelTestReactPackage,
                presets: [
                    ESModules
                        ? babelPresetEnv.preserveModules
                        : babelPresetEnv.autoModules,
                    babelPresetReact,
                    babelPresetFlow
                ]
            }
        ]
    };
};
