/** @module core/modules/object-utils/is-array-path */

/**
 * @description Returns true if the passed array segment is an array like path.
 * @param {string} str - String to be tested.
 * @returns {boolean} Result.
 */
function isArrayPath(str) {
    return /^\[\d*]$/.test(str);
}

export {isArrayPath};
