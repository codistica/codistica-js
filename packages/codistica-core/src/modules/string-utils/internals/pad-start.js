/** @module core/modules/string-utils/pad-start */

import {stringify} from '../../stringify.js';

/**
 * @description Injects a character to the beginning of the string until specified length is reached.
 * @param {(string|number)} input - Input.
 * @param {number} length - Desired length.
 * @param {string} [char=' '] - Character to be injected.
 * @returns {string} Resulting string.
 */
function padStart(input, length, char) {
    let output = stringify(input);
    let count = length - output.length;
    let add = char || ' ';

    if (count <= 0) {
        return output;
    } else {
        while (count > 0) {
            output = add + output;
            count--;
        }
    }

    return output;
}

export {padStart};
