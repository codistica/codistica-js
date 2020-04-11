/** @module node/modules/file-utils/get-json */

import {JSONUtils, log} from '@codistica/core';
import {readFile} from '../../promisified-fs/internals/read-file.js';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @async
 * @description Read and parse JSON object from file.
 * @param {string} path - File path.
 * @returns {(Promise<Object<string,*>|null>)} Promise. Parsed object or null.
 */
async function getJSON(path) {
    path = getAbsolutePath(path);
    try {
        return JSONUtils.parse(await readFile(path));
    } catch (err) {
        log.error('getJSON()', err);
        return null;
    }
}

export {getJSON};
