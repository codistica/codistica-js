/** @module node/modules/promisified-fs/read-file */

import {readFile as _readFile} from 'fs';

/** @typedef {number} readFileIntegerType */

/**
 * @async
 * @description Promisified version of node fs.readFile method.
 * @param {(string|Buffer|URL|readFileIntegerType|*)} path - File.
 * @returns {Promise<string>} Promise. File content.
 */
async function readFile(path) {
    return await new Promise((resolve, reject) => {
        _readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {readFile};
