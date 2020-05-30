/** @module core/modules/array-utils/normalize */

/**
 * @description Makes sure that returned value is always an array.
 * @param {*} input - Input.
 * @returns {Array<*>} Normalized array.
 */
function normalize(input) {
    if (Array.isArray(input)) {
        return input;
    } else {
        return [input];
    }
}

export {normalize};
