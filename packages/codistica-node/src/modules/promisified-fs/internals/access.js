/** @module node/modules/promisified-fs/access */

import {access as _access} from 'fs';

/** @typedef {number} accessIntegerType */

/**
 * @async
 * @description Promisified version of node fs.access method.
 * @param {(string|Buffer|URL|*)} path - File.
 * @param {accessIntegerType} [mode=fs.constants.F_OK] - Access mode (see fs.constants).
 * @returns {Promise<void>} Promise. Void.
 */
async function access(path, mode) {
    return await new Promise((resolve, reject) => {
        _access(path, mode, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {access};
