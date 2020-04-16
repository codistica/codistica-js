/** @module dev-tools/modules/webpack-utils/get-plugin-name */

/**
 * @description Normalizes input to be of type string. Searches for plugin name in function or instance constructor names.
 * @param {(string|Function|Object<string,*>)} input - Input.
 * @returns {string} Found plugin name.
 */
function getPluginName(input) {
    if (typeof input === 'string') {
        return input;
    } else if (typeof input === 'function') {
        return input.name;
    } else if (typeof input === 'object') {
        return input.constructor.name;
    } else {
        return '';
    }
}

export {getPluginName};
