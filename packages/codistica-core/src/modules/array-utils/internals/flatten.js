/** @module core/modules/array-utils/flatten */

/**
 * @description Reduces input array to a single level array.
 * @param {(Array<(Array<*>|*)>)} array - Input array.
 * @returns {Array<*>} Flattened array.
 */
function flatten(array) {
    let output = [];
    let length = array.length;
    let index = 0;
    while (index < length) {
        if (Array.isArray(array[index])) {
            output = output.concat(flatten(array[index]));
        } else {
            output.push(array[index]);
        }
        index++;
    }
    return output;
}

export {flatten};
