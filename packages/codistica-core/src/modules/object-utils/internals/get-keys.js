/** @module core/modules/object-utils/get-keys */

import {isObject} from './is-object.js';

/**
 * @description Returns an array with all input obtainable keys.
 * @param {*} input - Input value.
 * @returns {Array<*>} Keys array.
 */
function getKeys(input) {
    if (Array.isArray(input)) {
        return Object.keys(input).map((a) => parseInt(a));
    } else if (isObject(input)) {
        return Object.getOwnPropertyNames(input);
    } else {
        return [];
    }
}

export {getKeys};
