/** @module core/modules/object-utils/get-length */

import {getKeys} from './get-keys.js';

/**
 * @description Returns the length of the input obtainable keys array.
 * @param {*} input - Input value.
 * @returns {number} Input length.
 */
function getLength(input) {
    return getKeys(input).length;
}

export {getLength};
