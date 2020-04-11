/** @module node/modules/file-utils/put-json */

import {writeFileSync} from 'fs';
import {STRINGS, JSONUtils} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @description Stringify and write JSON object to a file.
 * @param {Object<string,*>} JSONObj - JSON Object to be written to file.
 * @param {string} path - Target file path.
 * @returns {void} Void.
 */
function putJSONSync(JSONObj, path) {
    writeFileSync(getAbsolutePath(path), JSONUtils.stringify(JSONObj), {
        encoding: STRINGS.STD_ENCODING
    });
}

export {putJSONSync};
