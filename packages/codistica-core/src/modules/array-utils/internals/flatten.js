/** @module core/modules/array-utils/flatten */

/**
 * @description Reduces input array to a single level array.
 * @param {(Array<(Array<*>|*)>)} array - Input array.
 * @param {Function} [cb] - Callback for each element.
 * @returns {Array<*>} Flattened array.
 */
function flatten(array, cb) {
    let outputArray = array;
    let length = outputArray.length;
    let index = 0;
    while (index < length) {
        if (Array.isArray(outputArray[index])) {
            outputArray[index] = flatten(outputArray[index]);
            outputArray = outputArray.concat(outputArray[index]);
            length += outputArray[index].length - 1;
            outputArray.splice(index, 1);
            index--;
        } else {
            if (typeof cb === 'function') {
                cb(outputArray[index]);
            }
        }
        index++;
    }
    return outputArray;
}

export {flatten};
