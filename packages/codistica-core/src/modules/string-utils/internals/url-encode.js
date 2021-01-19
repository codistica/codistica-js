/** @module core/modules/string-utils/url-encode */

/**
 * @description Encodes passed string into URL format.
 * @param {string} str - Input string.
 * @returns {string} Output.
 */
function urlEncode(str) {
    return encodeURIComponent(str).replace(/%20/g, '+');
}

export {urlEncode};
