/** @module core/modules/object-utils/is-object */

/**
 * @description Returns true if the input value is a non null object and false otherwise.
 * @param {*} input - Input value.
 * @returns {boolean} Result.
 */
function isObject(input) {
    return typeof input === 'object' && input !== null;
}

export {isObject};
