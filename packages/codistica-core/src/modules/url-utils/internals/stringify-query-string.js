/** @module core/modules/url-utils/stringify-query-string */

/**
 * @description Stringifies parsed url query string.
 * @param {Object<string,*>} queryStringObj - Parsed url query string.
 * @returns {string} Stringified query string.
 */
function stringifyQueryString(queryStringObj) {
    let str = '?';
    for (const key in queryStringObj) {
        if (!Object.hasOwnProperty.call(queryStringObj, key)) {
            continue;
        }
        str += key + '=' + queryStringObj[key] + '&';
    }
    return str.slice(0, -1);
}

export {stringifyQueryString};
