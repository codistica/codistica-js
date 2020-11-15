/** @module node/modules/file-utils/move */

import {copy} from './copy.js';
import {remove} from './remove.js';

/**
 * @async
 * @description Moves specified files.
 * @param {(Array<string>|string)} input - Input.
 * @param {string} targetDirPath - Target directory path.
 * @param {boolean} [force] - Overwrite existing files.
 * @returns {Promise<Array<string>>} Promise. Moved paths array.
 */
async function move(input, targetDirPath, force) {
    return await remove(await copy(input, targetDirPath, force));
}

export {move};
