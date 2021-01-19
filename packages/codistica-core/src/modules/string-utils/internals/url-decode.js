/** @module core/modules/string-utils/url-decode */

/**
 * @description Decodes URL formatted string.
 * @param {string} str - Input string.
 * @returns {string} Output.
 */
function urlDecode(str) {
    return decodeURIComponent(str.replace(/\+/g, '%20'));
}

export {urlDecode};
