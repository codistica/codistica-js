/** @module core/modules/object-utils/path-to-key */

import {isArrayPath} from './is-array-path.js';

/**
 * @description Converts the passed path segment to a key of correct type depending on format.
 * @param {string} str - Path string containing key.
 * @returns {(string|number)} Object key.
 */
function pathToKey(str) {
    if (isArrayPath(str)) {
        return parseInt(str.replace(/^\[|]$/g, ''));
    } else {
        return str.replace(/^\[|]$/g, '');
    }
}

export {pathToKey};
