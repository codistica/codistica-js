/** @module node/modules/file-utils/clear-dir */

import {log} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';
import {isInCwd} from './is-in-cwd.js';
import {remove} from './remove.js';
import {scan} from './scan.js';

/**
 * @async
 * @description Removes directory content recursively.
 * @param {string} input - The starting directory path.
 * @param {boolean} [deleteRoot] - Delete cleared directory.
 * @returns {Promise<void>} Promise. Void.
 */
async function clearDir(input, deleteRoot) {
    input = getAbsolutePath(input);

    if (!isInCwd(input)) {
        log.error(
            'clearDir()',
            'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
        )();
        return;
    }

    const paths = (await scan(input)).reverse();

    if (!deleteRoot) {
        paths.pop();
    }

    await remove(paths);
}

export {clearDir};
