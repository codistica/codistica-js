/** @module node/modules/file-utils/put-json */

import {jsonUtils} from '@codistica/core';
import {writeFile} from '../../promisified-fs/internals/write-file.js';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @async
 * @description Stringify and write JSON object to a file.
 * @param {Object<string,*>} JSONObj - JSON Object to be written to file.
 * @param {string} path - Target file path.
 * @returns {Promise<void>} Promise. Void.
 */
async function putJSON(JSONObj, path) {
    await writeFile(getAbsolutePath(path), jsonUtils.stringify(JSONObj));
}

export {putJSON};
