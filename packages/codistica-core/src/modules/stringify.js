/** @module core/modules/stringify */

import {stringify as _stringify} from './json-utils/internals/stringify.js';

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
        return _stringify(input);
    }
}

export {stringify};
