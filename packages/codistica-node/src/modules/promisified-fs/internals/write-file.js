/** @module node/modules/promisified-fs/write-file */

import {writeFile as _writeFile} from 'fs';
import {URL} from 'url';

/** @typedef {number} writeFileIntegerType */

/** @typedef {(Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array)} writeFileTypedArrayType */

/**
 * @async
 * @description Promisified version of node fs.writeFile method.
 * @param {(string|Buffer|URL|writeFileIntegerType)} file - File.
 * @param {(string|Buffer|writeFileTypedArrayType|DataView)} data - Data.
 * @returns {Promise<void>} Promise. Void.
 */
async function writeFile(file, data) {
    return await new Promise((resolve, reject) => {
        _writeFile(file, data, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {writeFile};
