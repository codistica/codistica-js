/** @module node/modules/file-utils/clear-dir-sync */

import {unlinkSync, rmdirSync, statSync} from 'fs';
import {log} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';
import {isInCwd} from './is-in-cwd.js';
import {scanSync} from './scan-sync.js';

/**
 * @description Removes directory content recursively.
 * @param {string} input - The starting directory path.
 * @param {boolean} [deleteRoot] - Delete cleared directory.
 * @returns {void} Void.
 */
function clearDirSync(input, deleteRoot) {
    input = getAbsolutePath(input);
    if (!isInCwd(input)) {
        log.error(
            'clearDirSync()',
            'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
        )();
        return;
    }
    const paths = scanSync(input).reverse();
    let currentStat = null;
    for (const path of paths) {
        if (path === input && !deleteRoot) {
            continue;
        }
        currentStat = statSync(path);
        if (currentStat.isDirectory()) {
            rmdirSync(path);
            log.verbose('clearDirSync()', `${path} - REMOVED`)();
        } else {
            unlinkSync(path);
            log.verbose('clearDirSync()', `${path} - REMOVED`)();
        }
    }
}

export {clearDirSync};
