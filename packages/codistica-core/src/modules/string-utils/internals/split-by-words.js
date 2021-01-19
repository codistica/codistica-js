/** @module core/modules/string-utils/split-by-words */

import {parse} from './parse.js';

/**
 * @description Splits passed string by words.
 * @param {string} str - Input string.
 * @returns {Array<string>} Results array.
 */
function splitByWords(str) {
    return parse(str).map((item) => item.content);
}

export {splitByWords};
