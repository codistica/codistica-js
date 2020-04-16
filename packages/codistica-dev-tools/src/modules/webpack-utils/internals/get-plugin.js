/** @module dev-tools/modules/webpack-utils/get-plugin */

import {getPluginIndex} from './get-plugin-index.js';
import {getPluginName} from './get-plugin-name.js';

/**
 * @description Gets specified plugin from specified Webpack configuration.
 * @param {Object} webpackConfig - Webpack configuration object to make operations in.
 * @param {(string|Function|Object<string,*>)} plugin - Plugin to be searched.
 * @returns {Object|undefined} Found plugin instance or undefined.
 */
function getPlugin(webpackConfig, plugin) {
    return webpackConfig.plugins[
        getPluginIndex(webpackConfig, getPluginName(plugin))
    ];
}

export {getPlugin};
