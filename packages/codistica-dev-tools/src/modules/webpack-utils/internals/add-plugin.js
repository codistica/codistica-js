/** @module dev-tools/modules/webpack-utils/add-plugin */

import {log} from '@codistica/core';
import {getPluginIndex} from './get-plugin-index.js';
import {instantiatePlugin} from './instantiate-plugin.js';

/**
 * @description Adds plugin to the specified Webpack configuration.
 * @param {Object<string,*>} webpackConfig - Webpack configuration object to make operations in.
 * @param {(Object<string,*>|Function)} plugin - Plugin to be added.
 * @param {boolean} [force=undefined] - Force plugin addition.
 * @returns {boolean} True if operation succeeded, false otherwise.
 */
function addPlugin(webpackConfig, plugin, force) {
    const pluginInstance = instantiatePlugin(plugin);
    if (
        force ||
        !getPluginIndex(webpackConfig, pluginInstance.constructor.name)
    ) {
        webpackConfig.plugins.push(pluginInstance);
        return true;
    } else {
        log.error('addPlugin()', 'PLUGIN ALREADY EXISTS')();
        return false;
    }
}

export {addPlugin};
