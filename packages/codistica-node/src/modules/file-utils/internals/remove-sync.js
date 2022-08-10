/** @module node/modules/file-utils/remove-sync */

import {statSync, rmdirSync, unlinkSync} from 'fs';
import {arrayUtils, log} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';
import {isInCwd} from './is-in-cwd.js';
import {scanSync} from './scan-sync.js';

/**
 * @description Removes specified files.
 * @param {(Array<string>|string)} input - Input.
 * @returns {Array<string>} Removed paths array.
 */
function removeSync(input) {
    const removedPathsSet = new Set();

    arrayUtils.normalize(input).forEach((path) => {
        path = getAbsolutePath(path);

        if (!isInCwd(path)) {
            log.error(
                'remove()',
                'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
            )();
            return;
        }

        /**
         * @description Remove.
         * @param {string} _target - Target path.
         * @returns {void} - Void.
         */
        const _remove = function _remove(_target) {
            if (removedPathsSet.has(_target)) {
                return;
            }

            if (statSync(_target).isDirectory()) {
                rmdirSync(_target);
                removedPathsSet.add(_target);
            } else {
                unlinkSync(_target);
                removedPathsSet.add(_target);
            }
        };

        if (statSync(path).isDirectory()) {
            scanSync(path, {reverse: true}).forEach(_remove);
        }

        _remove(path);
    });

    return Array.from(removedPathsSet.values());
}

export {removeSync};
