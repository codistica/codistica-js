/** @module core/modules/array-utils/get-duplicates */

import {dedupe} from './dedupe.js';

/** @typedef {(string|number|null|undefined|boolean)} getDuplicatesPrimitiveType */

/**
 * @description Returns elements which has one or more duplicates in input array.
 * @param {Array<getDuplicatesPrimitiveType>} input - Input array.
 * @returns {Array<*>} Duplicates array.
 */
function getDuplicates(input) {
    let output = [];
    input.forEach((elem, index) => {
        for (let i = 0; i < input.length; i++) {
            if (elem === input[i] && index !== i) {
                output.push(elem);
                return;
            }
        }
    });
    return dedupe(output);
}

export {getDuplicates};
