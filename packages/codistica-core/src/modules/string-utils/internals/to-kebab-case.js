/** @module core/modules/string-utils/to-kebab-case */

import {splitByWords} from './split-by-words.js';

/**
 * @description Converts passed string to kebab case.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toKebabCase(str) {
    return splitByWords(str)
        .filter((word) => !/[\s\W]/.test(word))
        .map((word) => word.toLowerCase())
        .join('-');
}

export {toKebabCase};
