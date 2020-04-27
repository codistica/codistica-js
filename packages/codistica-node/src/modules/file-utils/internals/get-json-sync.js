/** @module node/modules/file-utils/get-json-sync */

import {readFileSync} from 'fs';
import {jsonUtils, STRINGS, log} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';

/**
 * @description Read and parse JSON object from file.
 * @param {string} path - File path.
 * @returns {Object<string,*>} Parsed object.
 */
function getJSONSync(path) {
    path = getAbsolutePath(path);
    try {
        return jsonUtils.parse(
            readFileSync(path, {encoding: STRINGS.STD_ENCODING})
        );
    } catch (err) {
        log.error('getJSON()', err);
        return null;
    }
}

export {getJSONSync};
