/** @module core/modules/randomizer/get-id */

import {SEEDS} from '../../../constants/seeds.js';

/**
 * @description Generates and return a random ID.
 * @param {number} [length=10] - Generated ID length.
 * @param {string} [customSeed] - Custom seed to be used for random generation.
 * @returns {string} Generated ID.
 */
function getId(length, customSeed) {
    const seed = customSeed || SEEDS.alphaNum;
    length = length || 10;
    let output = '';
    for (let i = 0; i < length; i++) {
        output += seed.charAt(Math.floor(Math.random() * seed.length));
    }
    return output;
}

export {getId};
