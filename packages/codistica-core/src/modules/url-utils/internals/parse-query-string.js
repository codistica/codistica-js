/** @module core/modules/url-utils/parse-query-string */

/**
 * @description Parses passed url query string into a key/value object.
 * @param {string} urlString - Input url string.
 * @returns {Object<string,*>} Parsed query string.
 */
function parseQueryString(urlString) {
    const output = {};

    if (!urlString.includes('?')) {
        return output;
    }

    const queryString = (urlString.match(/[^?]+$/) || [])[0] || null;
    const params = queryString.split('&');

    params.forEach((param) => {
        const key = (param.match(/^[^=]+/) || [])[0] || null;
        output[key] = (param.match(/[^=]+$/) || [])[0] || null;
    });

    return output;
}

export {parseQueryString};
