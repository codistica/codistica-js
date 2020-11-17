/** @module node/modules/file-utils/clear-dir-sync */

import {log} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';
import {isInCwd} from './is-in-cwd.js';
import {removeSync} from './remove-sync.js';
import {scanSync} from './scan-sync.js';

/**
 * @description Removes directory content recursively.
 * @param {string} input - The starting directory path.
 * @param {boolean} [deleteRoot] - Delete cleared directory.
 * @returns {Array<string>} Removed paths array.
 */
function clearDirSync(input, deleteRoot) {
    input = getAbsolutePath(input);

    if (!isInCwd(input)) {
        log.error(
            'clearDirSync()',
            'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
        )();
        return [];
    }

    const paths = scanSync(input).reverse();

    if (!deleteRoot) {
        paths.pop();
    }

    return removeSync(paths);
}

export {clearDirSync};
