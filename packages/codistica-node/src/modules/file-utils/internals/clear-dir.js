/** @module node/modules/file-utils/clear-dir */

import {log, catcher} from '@codistica/core';
import {rmdir} from '../../promisified-fs/internals/rmdir.js';
import {stat} from '../../promisified-fs/internals/stat.js';
import {unlink} from '../../promisified-fs/internals/unlink.js';
import {getAbsolutePath} from './get-absolute-path.js';
import {isInCwd} from './is-in-cwd.js';
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
    let currentStat = null;
    for (const path of paths) {
        if (path === input && !deleteRoot) {
            continue;
        }
        currentStat = await stat(path).catch(catcher.onReject);
        if (currentStat.isDirectory()) {
            await rmdir(path);
            log.verbose('clearDir()', `${path} - REMOVED`)();
        } else {
            await unlink(path);
            log.verbose('clearDir()', `${path} - REMOVED`)();
        }
    }
}

export {clearDir};
