/** @module core/modules/randomizer/get-unique-id */

import {getId} from './get-id.js';

const store = new Set();

/**
 * @description Generates and return an ID that is guaranteed to be unique during the current process.
 * @param {number} [length] - Generated ID length.
 * @param {string} [customSeed] - Custom seed to be used for random generation.
 * @returns {string} Generated unique ID.
 */
function getUniqueId(length, customSeed) {
    let output = null;
    do {
        output = getId(length, customSeed);
    } while (store.has(output));
    store.add(output);
    return output;
}

export {getUniqueId};
