/** @module node/modules/file-utils/search-upwards-sync */

import {dirname, resolve, isAbsolute} from 'path';
import {existsSync} from './exists-sync.js';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @description Searches for specified directory or file upwards.
 * @param {string} startingDirectory - Starting directory.
 * @param {string} search - File or directory name to be searched.
 * @param {string} [stopAt=process.cwd()] - Absolute path to stop traversing at.
 * @returns {(string|null)} Found file or directory absolute path or null.
 */
function searchUpwardsSync(startingDirectory, search, stopAt) {
    let currentPath = getAbsolutePath(startingDirectory);
    let foundPath = null;
    if (isAbsolute(search)) {
        return existsSync(search) ? search : null;
    }
    while (currentPath) {
        foundPath = resolve(currentPath, search);
        if (existsSync(foundPath)) {
            return foundPath;
        }
        if (currentPath === stopAt || currentPath === '/') {
            break;
        }
        currentPath = dirname(currentPath);
    }
    return null;
}

export {searchUpwardsSync};
