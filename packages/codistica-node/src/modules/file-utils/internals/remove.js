/** @module node/modules/file-utils/remove */

import {arrayUtils, log} from '@codistica/core';
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
    const removedPathsSet = new Set();

    await Promise.all(
        arrayUtils.normalize(input).map(async (path) => {
            path = getAbsolutePath(path);

            if (!isInCwd(path)) {
                log.error(
                    'remove()',
                    'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
                )();
                return;
            }

            /**
             * @async
             * @description Remove.
             * @param {string} _target - Target path.
             * @returns {Promise<void>} - Promise. Void.
             */
            const _remove = async function _remove(_target) {
                if (removedPathsSet.has(_target)) {
                    return;
                }

                if ((await stat(_target)).isDirectory()) {
                    await rmdir(_target);
                    removedPathsSet.add(_target);
                } else {
                    await unlink(_target);
                    removedPathsSet.add(_target);
                }
            };

            if ((await stat(path)).isDirectory()) {
                const content = await scan(path, {reverse: true});
                for (const target of content) {
                    await _remove(target);
                }
            }

            await _remove(path);
        })
    );

    return Array.from(removedPathsSet.values());
}

export {remove};
