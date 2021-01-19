/** @module core/modules/string-utils/to-camel-case */

import {capitalizeFirst} from './capitalize-first.js';
import {splitByWords} from './split-by-words.js';

/**
 * @description Converts passed string to camel case.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toCamelCase(str) {
    return splitByWords(str)
        .filter((word) => !/[\s-]/.test(word))
        .map((word, index) => {
            if (index) {
                return capitalizeFirst(word);
            }
            return word.toLowerCase();
        })
        .join('');
}

export {toCamelCase};
