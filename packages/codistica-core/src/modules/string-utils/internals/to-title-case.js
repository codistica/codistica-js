/** @module core/modules/string-utils/to-title-case */

import {capitalizeFirst} from './capitalize-first.js';
import {splitByWords} from './split-by-words.js';

/**
 * @description Converts passed string to title case.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toTitleCase(str) {
    return splitByWords(str)
        .filter((word) => !/[\s\W]/.test(word))
        .map((word) => capitalizeFirst(word))
        .join(' ');
}

export {toTitleCase};
