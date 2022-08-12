/** @module node/modules/file-utils/scan */

import {forEach} from './for-each.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} scanRawExpType */

/**
 * @typedef scanOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {scanRawExpType} [ignore=null] - Paths to be ignored.
 * @property {boolean} [reverse=false] - Reverse scan.
 */

/**
 * @async
 * @description Recurse through passed starting directory path and returns an array with all found paths.
 * @param {string} path - The starting directory path.
 * @param {scanOptionsType} [options] - Scan options.
 * @returns {Promise<Array<string>>} Promise. Found files path array.
 */
async function scan(path, options) {
    const output = [];

    await forEach(path, (p) => output.push(p), options);

    return output;
}

export {scan};
