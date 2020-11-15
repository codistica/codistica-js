/** @module node/modules/promisified-fs/copy-file */

import {copyFile as _copyFile} from 'fs';

/**
 * @async
 * @description Promisified version of node fs.copyFile method.
 * @param {(string|Buffer|URL|*)} src - Source.
 * @param {(string|Buffer|URL|*)} dest - Destination.
 * @param {number} [mode] - Mode.
 * @returns {Promise<void>} Promise. Void.
 */
async function copyFile(src, dest, mode) {
    return await new Promise((resolve, reject) => {
        _copyFile(src, dest, mode, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {copyFile};
