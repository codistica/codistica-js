/** @module node/modules/promisified-fs/stat */

import {stat as _stat, Stats} from 'fs';
import {URL} from 'url';

/**
 * @async
 * @description Promisified version of node fs.stat method.
 * @param {(string|Buffer|URL)} path - File.
 * @returns {Promise<Stats>} Promise. Stat.
 */
async function stat(path) {
    return await new Promise((resolve, reject) => {
        _stat(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {stat};
