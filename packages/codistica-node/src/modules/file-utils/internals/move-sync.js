/** @module node/modules/file-utils/move-sync */

import {copySync} from './copy-sync.js';
import {removeSync} from './remove-sync.js';

/**
 * @description Moves specified files.
 * @param {(Array<string>|string)} input - Input.
 * @param {string} targetDirPath - Target directory path.
 * @param {boolean} [force] - Overwrite existing files.
 * @returns {Array<string>} Removed paths array.
 */
function moveSync(input, targetDirPath, force) {
    return removeSync(copySync(input, targetDirPath, force));
}

export {moveSync};
