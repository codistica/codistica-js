/** @module node/modules/file-utils/contains-path */

import {sep} from 'path';

/**
 * @description Checks if each passed path is contained in the path at its left. Returns true if all checks succeeded and false otherwise.
 * @param {...string} paths - Paths to be checked in order. From left to right.
 * @returns {boolean} Check result.
 */
function containsPath(...paths) {
    return paths.every((currentPath, index, array) => {
        if (index === 0) {
            return true;
        }
        const parentPath = array[index - 1];
        if (currentPath === parentPath) {
            return false;
        }
        const parentTokens = parentPath.split(sep).filter((i) => i.length);
        return parentTokens.every(
            (parentToken, i) =>
                currentPath.split(sep).filter((j) => j.length)[i] ===
                parentToken
        );
    });
}

export {containsPath};
