/** @module dev-tools/modules/webpack-utils/get-resource-chunks */

import {getResourceModule} from './get-resource-module.js';

/**
 * @description Gets all chunks containing specified resource module.
 * @param {Object} compilation - Compilation.
 * @param {string} resource - Resource absolute path.
 * @returns {Array<Object>} Found chunks array.
 */
function getResourceChunks(compilation, resource) {
    const output = [];
    getResourceModule(compilation, resource)
        .getChunks()
        .forEach((chunk) => {
            output.push(chunk);
        });
    return output;
}

export {getResourceChunks};
