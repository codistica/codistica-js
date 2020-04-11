/** @module node/modules/promisified-fs/rmdir */

import {rmdir as _rmdir} from 'fs';
import {URL} from 'url';

/**
 * @async
 * @description Promisified version of node fs.rmdir method.
 * @param {(string|Buffer|URL)} path - File.
 * @returns {Promise<void>} Promise. Void.
 */
async function rmdir(path) {
    return await new Promise((resolve, reject) => {
        _rmdir(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {rmdir};
