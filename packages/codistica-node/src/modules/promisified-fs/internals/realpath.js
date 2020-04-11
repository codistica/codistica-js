/** @module node/modules/promisified-fs/realpath */

import {realpath as _realpath} from 'fs';
import {URL} from 'url';

/**
 * @async
 * @description Promisified version of node fs.realpath method.
 * @param {(string|Buffer|URL)} path - File.
 * @returns {Promise<string>} Promise. Resolved path.
 */
async function realpath(path) {
    return await new Promise((resolve, reject) => {
        _realpath(path, 'utf8', (err, resolvedPath) => {
            if (err) {
                reject(err);
            } else {
                resolve(resolvedPath);
            }
        });
    });
}

export {realpath};
