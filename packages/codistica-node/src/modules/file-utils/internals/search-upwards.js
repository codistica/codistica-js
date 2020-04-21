/** @module node/modules/file-utils/search-upwards */

import {dirname, resolve, isAbsolute} from 'path';
import {exists} from './exists.js';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @async
 * @description Searches for specified directory or file upwards.
 * @param {string} startingDirectory - Starting directory.
 * @param {string} search - File or directory name to be searched.
 * @param {string} [stopAt=process.cwd()] - Absolute path to stop traversing at.
 * @returns {Promise<(string|null)>} Promise. Found file or directory absolute path or null.
 */
async function searchUpwards(startingDirectory, search, stopAt) {
    let currentPath = getAbsolutePath(startingDirectory);
    let foundPath = null;
    if (isAbsolute(search)) {
        return (await exists(search)) ? search : null;
    }
    while (currentPath) {
        foundPath = resolve(currentPath, search);
        if (await exists(foundPath)) {
            return foundPath;
        }
        if (currentPath === stopAt || currentPath === '/') {
            break;
        }
        currentPath = dirname(currentPath);
    }
    return null;
}

export {searchUpwards};
