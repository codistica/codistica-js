/** @module node/modules/promisified-fs/readdir */

import {readdir as _readdir} from 'fs';

/**
 * @async
 * @description Promisified version of node fs.readdir method.
 * @param {(string|Buffer|URL|*)} path - File.
 * @returns {Promise<Array<string>>} Promise. Files.
 */
async function readdir(path) {
    return await new Promise((resolve, reject) => {
        _readdir(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {readdir};
