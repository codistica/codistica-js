/** @module node/modules/file-utils/remove-sync */

import {statSync, rmdirSync, unlinkSync, readdirSync} from 'fs';
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
    const removedPaths = [];
    arrayUtils.normalize(input).forEach((currentInput) => {
        currentInput = getAbsolutePath(currentInput);

        if (!isInCwd(currentInput)) {
            log.error(
                'remove()',
                'RECEIVED PATH IS OUTSIDE OF THE CURRENT WORKING DIRECTORY. OPERATION NOT PERMITTED. ABORTING'
            )();
            return;
        }

        const currentStat = statSync(currentInput);

        if (currentStat.isDirectory()) {
            if (readdirSync(currentInput).length) {
                removeSync(scanSync(currentInput).reverse());
            } else {
                rmdirSync(currentInput);
                removedPaths.push(currentInput);
            }
        } else {
            unlinkSync(currentInput);
            removedPaths.push(currentInput);
        }
    });
    return removedPaths;
}

export {removeSync};
