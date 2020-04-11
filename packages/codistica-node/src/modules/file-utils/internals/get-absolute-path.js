/** @module node/modules/file-utils/get-absolute-path */

import {isAbsolute, resolve} from 'path';

/**
 * @description Converts the specified path to an absolute path. Received path must be relative to the current working directory.
 * @param {string} path - Path to be converted.
 * @returns {string} Absolute path.
 */
function getAbsolutePath(path) {
    return isAbsolute(path) ? path : resolve(process.cwd(), path);
}

export {getAbsolutePath};
