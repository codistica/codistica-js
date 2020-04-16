/** @module dev-tools/modules/webpack-utils/get-resource-files */

import {getResourceChunks} from './get-resource-chunks.js';

/**
 * @description Gets all files containing specified resource module.
 * @param {Object} compilation - Compilation.
 * @param {string} resource - Resource absolute path.
 * @returns {Array<string>} Found files array.
 */
function getResourceFiles(compilation, resource) {
    const output = [];
    getResourceChunks(compilation, resource).forEach((chunk) => {
        chunk.files.forEach((file) => {
            output.push(file);
        });
    });
    return output;
}

export {getResourceFiles};
