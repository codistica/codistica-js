/** @module node/modules/file-utils/exists-sync */

import {accessSync, constants} from 'fs';
import {log} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @description Checks if the specified path correspond to an existing element in the file system.
 * @param {string} path - Path to check.
 * @returns {boolean} Check result.
 */
function existsSync(path) {
    try {
        accessSync(getAbsolutePath(path), constants.F_OK);
        return true;
    } catch (err) {
        if (err.code !== 'ENOENT') {
            // TODO: THIS COULD BE A GOOD EXAMPLE OF HOW ERRORS SHOULD BE MANAGED.
            log.error('existsSync()', err)();
            throw err;
        }
        return false;
    }
}

export {existsSync};
