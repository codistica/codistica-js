/** @module core/modules/string-utils/to-camel-case */

/**
 * @description Converts passed string to camelcase.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toCamelCase(str) {
    const trimmed = str.trim();
    const result = trimmed.replace(/\W\w/g, function (match) {
        return match[1].toUpperCase();
    });
    return result.charAt(0).toLowerCase() + result.slice(1);
}

export {toCamelCase};
