/** @module core/modules/url-utils/strip-query-string */

/**
 * @description Strips passed url query string.
 * @param {string} urlString - Input url string.
 * @returns {string} Resulting url string.
 */
function stripQueryString(urlString) {
    return (urlString.match(/^[^?]+/) || [])[0] || null;
}

export {stripQueryString};
