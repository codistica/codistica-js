/** @module core/modules/object-utils/string-to-path-array */

/**
 * @description Converts an object/array like path string to an array containing the path segments.
 * @param {string} str - Object<string,*> path string.
 * @returns {Array<*>} Resulting array.
 */
function stringToPathArray(str) {
    return str.replace(/^\.|\.$|\s+/, '').match(/\[\d*]|[^.[\]]+/g) || [];
}

export {stringToPathArray};
