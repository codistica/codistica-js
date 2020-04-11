/** @module core/modules/object-utils/is-reference */

import {isObject} from './is-object.js';

/**
 * @description Returns true if the input is a reference type value and false otherwise.
 * @param {*} input - Input value.
 * @returns {boolean} Result.
 */
function isReference(input) {
    return (
        isObject(input) || Array.isArray(input) || typeof input === 'function'
    );
}

export {isReference};
