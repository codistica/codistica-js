/** @module dev-tools/modules/webpack-utils/replace-plugin */

import {getPluginIndex} from './get-plugin-index.js';
import {getPluginName} from './get-plugin-name.js';
import {instantiatePlugin} from './instantiate-plugin.js';

/**
 * @description Replaces plugin from the specified Webpack configuration.
 * @param {Object} webpackConfig - Webpack configuration object to make operations in.
 * @param {(string|Function|Object<string,*>)} oldPlugin - Plugin to be replaced.
 * @param {(Object<string,*>|Function)} newPlugin - Plugin to be used as replacement.
 * @returns {boolean} True if operation succeeded, false otherwise.
 */
function replacePlugin(webpackConfig, oldPlugin, newPlugin) {
    const oldPluginName = getPluginName(oldPlugin);
    const newPluginInstance = instantiatePlugin(newPlugin);
    const index = getPluginIndex(webpackConfig, oldPluginName);
    if (typeof index === 'number') {
        webpackConfig.plugins[index] = newPluginInstance;
        return true;
    }
    return false;
}

export {replacePlugin};
