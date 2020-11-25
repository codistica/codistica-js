/** @module core/modules/string-utils/split-by-words */

import {REG_EXPS} from '../../../constants/reg-exps.js';
import {getCharType} from './get-char-type.js';

/**
 * @description Splits passed string by words.
 * @param {string} str - Input string.
 * @returns {Array<string>} Results array.
 */
function splitByWords(str) {
    const chars = str.split(REG_EXPS.SPLIT_BY_CHAR);
    const output = [];

    let previous = '';
    let current = '';
    let next = '';
    let acc = '';

    chars.forEach((char, index) => {
        current = getCharType(char);
        next = getCharType(chars[index + 1]);
        if (!previous) {
            acc += char;
        } else if (current === 'LOW_LETTER' && previous === 'UP_LETTER') {
            acc += char;
        } else if (
            current === previous &&
            (current !== 'UP_LETTER' || next !== 'LOW_LETTER')
        ) {
            acc += char;
        } else {
            output.push(acc);
            acc = char;
        }
        previous = current;
    });

    if (acc) {
        output.push(acc);
    }

    return output;
}

export {splitByWords};
