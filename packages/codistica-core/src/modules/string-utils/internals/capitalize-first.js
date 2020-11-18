/** @module core/modules/string-utils/capitalize-first */

/**
 * @description Capitalizes first letter.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function capitalizeFirst(str) {
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export {capitalizeFirst};
