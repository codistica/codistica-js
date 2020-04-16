/** @module dev-tools/modules/webpack-utils/get-plugin-index */

import {getPluginName} from './get-plugin-name.js';

/**
 * @description Searches for specified plugin index inside specified Webpack configuration.
 * @param {Object<string,*>} webpackConfig - Webpack configuration object to make operations in.
 * @param {(string|Function|Object<string,*>)} plugin - Plugin whose index has to be searched.
 * @returns {number|undefined} Plugin index or undefined.
 */
function getPluginIndex(webpackConfig, plugin) {
    const pluginName = getPluginName(plugin);
    const plugins = webpackConfig.plugins;
    let i = 0;
    let length = plugins.length;
    for (i = 0; i < length; i++) {
        if (plugins[i].constructor.name === pluginName) {
            return i;
        }
    }
    return undefined;
}

export {getPluginIndex};
