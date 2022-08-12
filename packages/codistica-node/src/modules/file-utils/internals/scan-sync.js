/** @module node/modules/file-utils/scan-sync */

import {forEachSync} from './for-each-sync.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} scanSyncRawExpType */

/**
 * @typedef scanSyncOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {scanSyncRawExpType} [ignore=null] - Paths to be ignored.
 * @property {boolean} [reverse=false] - Reverse scan.
 */

/**
 * @description Recurse through passed starting directory path and returns an array with all found paths.
 * @param {string} path - The starting directory path.
 * @param {scanSyncOptionsType} [options] - Scan options.
 * @returns {Array<string>} Found files path array.
 */
function scanSync(path, options) {
    const output = [];

    forEachSync(path, (p) => output.push(p), options);

    return output;
}

export {scanSync};
