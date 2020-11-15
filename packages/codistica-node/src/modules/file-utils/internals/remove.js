/** @module node/modules/file-utils/remove */

import {arrayUtils, catcher, log} from '@codistica/core';
import {readdir} from '../../promisified-fs/internals/readdir.js';
import {rmdir} from '../../promisified-fs/internals/rmdir.js';
import {stat} from '../../promisified-fs/internals/stat.js';
import {unlink} from '../../promisified-fs/internals/unlink.js';
import {getAbsolutePath} from './get-absolute-path.js';
import {isInCwd} from './is-in-cwd.js';
import {scan} from './scan.js';

/**
 * @async
 * @description Removes specified files.
 * @param {(Array<string>|string)} input - Input.
 * @returns {Promise<Array<string>>} Promise. Removed paths array.
 */
async function remove(input) {
    const removedPaths = [];
    await Promise.all(
        arrayUtils.normalize(input).map(async (currentInput) => {
            currentInput = getAbsolutePath(currentInput);

            if (!isInCwd(currentInput)) {
                log.error(
                    'remove()',
                    'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
                )();
                return;
            }

            const currentStat = await stat(currentInput).catch(
                catcher.onReject
            );

            if (currentStat.isDirectory()) {
                if ((await readdir(currentInput)).length) {
                    await remove((await scan(currentInput)).reverse());
                } else {
                    await rmdir(currentInput).catch(catcher.onReject);
                    removedPaths.push(currentInput);
                }
            } else {
                await unlink(currentInput).catch(catcher.onReject);
                removedPaths.push(currentInput);
            }
        })
    );
    return removedPaths;
}

export {remove};
