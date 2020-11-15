/** @module node/modules/promisified-fs/unlink */

import {unlink as _unlink} from 'fs';

/**
 * @async
 * @description Promisified version of node fs.unlink method.
 * @param {(string|Buffer|URL|*)} path - File.
 * @returns {Promise<void>} Promise. Void.
 */
async function unlink(path) {
    return await new Promise((resolve, reject) => {
        _unlink(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {unlink};
