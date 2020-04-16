/** @module dev-tools/modules/webpack-utils/prevent-plugin-taps */

import {getPluginName} from './get-plugin-name.js';
import {preventTaps} from './prevent-taps.js';

/**
 * @description Prevent specified plugin taps in specified hooks.
 * @param {(Object<string,*>|Array<Object<string,*>>)} hooks - Hooks to prevent taps in.
 * @param {(string|Function|Object<string,*>)} plugin - Plugin whose taps should be prevented.
 * @param {*} [returnValue=undefined] - Default value for hooks expecting a returned value.
 * @returns {void} Void.
 */
function preventPluginTaps(hooks, plugin, returnValue) {
    const pluginName = getPluginName(plugin);
    preventTaps(hooks, {
        test: pluginName,
        returnValue
    });
}

export {preventPluginTaps};
