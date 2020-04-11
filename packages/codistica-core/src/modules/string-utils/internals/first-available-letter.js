/** @module core/modules/string-utils/first-available-letter */

import {SEEDS} from '../../../constants/seeds.js';
import {dedupe} from '../../array-utils/internals/dedupe.js';

/**
 * @description Returns the first available letter in alphabetical order inside the input array or null if not found.
 * @param {Array<string>} input - Input array.
 * @returns {(string|null)} First available letter or null.
 */
function firstAvailableLetter(input) {
    let index = 0;
    let letters = [];
    input.forEach((str) => {
        let inputChar = str.charAt(0);
        if (SEEDS.alpha.includes(inputChar)) {
            letters.push(inputChar.toLowerCase());
        }
    });
    letters = dedupe(letters).sort();
    for (const letter of letters) {
        if (letter.toLowerCase() !== SEEDS.alphaLow[index]) {
            return SEEDS.alphaLow[index];
        }
        index++;
    }
    if (index < SEEDS.alphaLow.length) {
        return SEEDS.alphaLow[index];
    }
    return null;
}

export {firstAvailableLetter};
