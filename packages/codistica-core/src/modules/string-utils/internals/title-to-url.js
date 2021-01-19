/** @module core/modules/string-utils/title-to-url */

import {toKebabCase} from './to-kebab-case.js';
import {urlEncode} from './url-encode.js';

/**
 * @description Transforms a title-like string into a URL valid encoded string.
 * @param {string} str - Input string.
 * @returns {string} Output.
 */
function titleToUrl(str) {
    return urlEncode(toKebabCase(str));
}

export {titleToUrl};
