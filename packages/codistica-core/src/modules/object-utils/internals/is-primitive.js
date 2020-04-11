/** @module core/modules/object-utils/is-primitive */

import {isReference} from './is-reference.js';

/**
 * @description Returns true if input is a primitive type value and false otherwise.
 * @param {*} input - Input value.
 * @returns {boolean} Result.
 */
function isPrimitive(input) {
    return !isReference(input);
}

export {isPrimitive};
