/** @module core/modules/string-utils/capitalize-first */

/**
 * @description Capitalizes first found letter.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function capitalizeFirst(str) {
    const match = str.match(/[A-z]/);
    const length = str.length;
    if (match) {
        return (
            str.slice(-length, -length + match.index) +
            str.charAt(match.index).toUpperCase() +
            str.slice(match.index + 1)
        );
    } else {
        return str;
    }
}

export {capitalizeFirst};
