/** @module node/modules/file-utils/exists */

import {constants} from 'fs';
import {log} from '@codistica/core';
import {access} from '../../promisified-fs/internals/access.js';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @async
 * @description Checks if the specified path correspond to an existing element in the file system.
 * @param {string} path - Path to check.
 * @returns {Promise<boolean>} Promise. Check result.
 */
async function exists(path) {
    try {
        await access(getAbsolutePath(path), constants.F_OK);
        return true;
    } catch (err) {
        log.error('exists()', err)();
        return false;
    }
}

export {exists};
