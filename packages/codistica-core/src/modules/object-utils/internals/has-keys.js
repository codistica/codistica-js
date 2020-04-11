/** @module core/modules/object-utils/has-keys */

import {getLength} from './get-length.js';

/**
 * @description Returns true if the input has obtainable keys and false otherwise.
 * @param {*} input - Input value.
 * @returns {boolean} Result.
 */
function hasKeys(input) {
    return getLength(input) > 0;
}

export {hasKeys};
