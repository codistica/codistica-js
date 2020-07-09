/** @module core/modules/object-utils/get-values-array */

/**
 * @description Returns an array containing object own enumerable property values.
 * @param {Object<string,*>} object - Input object.
 * @returns {Array<*>} Values array.
 */
function getValuesArray(object) {
    const output = [];
    for (const i in object) {
        if (!Object.hasOwnProperty.call(object, i)) {
            continue;
        }
        output.push(object[i]);
    }
    return output;
}

export {getValuesArray};
