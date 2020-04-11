/** @module core/modules/number-utils/first-available-integer */

import {dedupe} from '../../array-utils/internals/dedupe.js';

/**
 * @description Returns the first available integer in numerical order inside the input array.
 * @param {Array<number>} input - Input array.
 * @returns {number} First available integer.
 */
function firstAvailableInteger(input) {
    let count = 0;
    input = dedupe(input).sort((a, b) => a - b);
    for (const num of input) {
        if (num !== count) {
            return count;
        }
        count++;
    }
    return count;
}

export {firstAvailableInteger};
