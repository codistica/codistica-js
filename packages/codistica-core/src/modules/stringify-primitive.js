/** @module core/modules/stringify-primitive */

/**
 * @description Receives any primitive as input and returns its string version.
 * @param {*} input - Input value.
 * @returns {string} String result.
 */
function stringifyPrimitive(input) {
    if (typeof input !== 'undefined' && input !== null) {
        if (
            Object.hasOwnProperty.call(input, 'toString') ||
            Object.hasOwnProperty.call(Object.getPrototypeOf(input), 'toString')
        ) {
            return input.toString();
        }
    }
    if (typeof input === 'undefined') {
        return 'undefined';
    } else {
        return JSON.stringify(input);
    }
}

export {stringifyPrimitive};
