/** @module core/modules/object-utils/is-pure-object */

/**
 * @description Returns true if the input value is a non null pure object ({}) and false otherwise.
 * @param {*} input - Input value.
 * @returns {boolean} Result.
 */
function isPureObject(input) {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
}

export {isPureObject};
