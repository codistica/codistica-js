/** @module node/modules/promisified-fs/mkdir */

import {mkdir as _mkdir} from 'fs';

/**
 * @typedef mkdirOptions
 * @property {boolean} [recursive] - Recursive.
 * @property {(string|number)} [mode] - Mode.
 */

/**
 * @async
 * @description Promisified version of node fs.mkdir method.
 * @param {(string|Buffer|URL|*)} path - File.
 * @param {(mkdirOptions|number)} [options] - Options.
 * @returns {Promise<(string|void)>} Promise. First created directory path or void.
 */
async function mkdir(path, options) {
    return await new Promise((resolve, reject) => {
        _mkdir(path, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {mkdir};
