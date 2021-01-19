/** @module core/modules/string-utils/to-pascal-case */

import {capitalizeFirst} from './capitalize-first.js';
import {splitByWords} from './split-by-words.js';

/**
 * @description Converts passed string to pascal case.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toPascalCase(str) {
    return splitByWords(str)
        .filter((word) => !/[\s-]/.test(word))
        .map((word) => capitalizeFirst(word))
        .join('');
}

export {toPascalCase};
