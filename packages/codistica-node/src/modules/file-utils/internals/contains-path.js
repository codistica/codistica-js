/** @module node/modules/file-utils/contains-path */

/**
 * @description Checks if each passed path is contained in the path at its left. Returns true if all checks succeeded and false otherwise.
 * @param {...string} paths - Paths to be checked in order. From left to right.
 * @returns {boolean} Check result.
 */
function containsPath(...paths) {
    return paths.every((currentPath, index, array) => {
        if (!currentPath.length) {
            return false;
        }
        array[index] = currentPath = currentPath.replace(/[\\]/g, '/');
        if (index === 0) {
            return true;
        }
        const parentPath = array[index - 1];
        if (currentPath === parentPath || currentPath[0] !== parentPath[0]) {
            return false;
        }
        const parentTokens = parentPath.split('/').filter((i) => i.length);
        const currentTokens = currentPath.split('/').filter((j) => j.length);
        return parentTokens.every(
            (parentToken, i) => currentTokens[i] === parentToken
        );
    });
}

export {containsPath};
