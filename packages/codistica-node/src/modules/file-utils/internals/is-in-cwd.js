/** @module node/modules/file-utils/is-in-cwd */

import {containsPath} from './contains-path.js';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @description Checks if the passed path is contained in the current working directory.
 * @param {string} path - Path to be checked.
 * @returns {boolean} Check result.
 */
function isInCwd(path) {
    return containsPath(process.cwd(), getAbsolutePath(path));
}

export {isInCwd};
