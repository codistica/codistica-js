/** @module dev-tools/modules/webpack-utils/remove-plugin */

import {getPluginName} from './get-plugin-name.js';

/**
 * @description Removes plugin from the specified Webpack configuration.
 * @param {Object<string,*>} webpackConfig - Webpack configuration object to make operations in.
 * @param {(string|Function|Object<string,*>)} plugin - Plugin to be removed.
 * @returns {boolean} True if operation succeeded, false otherwise.
 */
function removePlugin(webpackConfig, plugin) {
    const pluginName = getPluginName(plugin);
    let removed = 0;
    webpackConfig.plugins = webpackConfig.plugins.filter((currentPlugin) => {
        const matches = currentPlugin.constructor.name === pluginName;
        if (matches) {
            removed++;
        }
        return !matches;
    });
    return removed !== 0;
}

export {removePlugin};
