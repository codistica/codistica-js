/** @module core/modules/object-utils/rename-property */

/**
 * @description Renames the indicated property inside the passed object.
 * @param {Object<string,*>} obj - Input object.
 * @param {string} oldPropertyName - Property to be renamed.
 * @param {string} newPropertyName - New name for property.
 * @returns {boolean} Result.
 */
function renameProperty(obj, oldPropertyName, newPropertyName) {
    if (
        typeof obj[oldPropertyName] === 'undefined' ||
        typeof obj[newPropertyName] !== 'undefined'
    ) {
        return false;
    }
    Object.defineProperty(
        obj,
        newPropertyName,
        Object.getOwnPropertyDescriptor(obj, oldPropertyName)
    );
    delete obj[oldPropertyName];
    return true;
}

export {renameProperty};
