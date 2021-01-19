/** @module core/modules/stringify */

/**
 * @description Receives any value as input and returns its stringified version.
 * @param {*} input - Input value.
 * @returns {string} String result.
 */
function stringify(input) {
    if (typeof input === 'string') {
        return input;
    }
    if (
        typeof input !== 'undefined' &&
        typeof input !== 'object' &&
        input !== null
    ) {
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

export {stringify};
