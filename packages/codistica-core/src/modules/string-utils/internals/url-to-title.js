/** @module core/modules/string-utils/url-to-title */

import {toTitleCase} from './to-title-case.js';
import {urlDecode} from './url-decode.js';

/**
 * @description Transforms an URL encoded string into a title-like one.
 * @param {string} str - Input string.
 * @returns {string} Output.
 */
function urlToTitle(str) {
    return toTitleCase(urlDecode(str));
}

export {urlToTitle};
