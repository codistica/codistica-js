/** @module core/modules/array-utils/dedupe */

/** @typedef {(string|number|null|undefined|boolean)} dedupePrimitiveType */

/**
 * @description Returns an array with elements from input array excluding duplicates.
 * @param {Array<dedupePrimitiveType>} array - Input array.
 * @returns {Array<*>} Deduped array.
 */
function dedupe(array) {
    let output = [];
    array.forEach((elem) => {
        for (const val of output) {
            if (elem === val) {
                return;
            }
        }
        output.push(elem);
    });
    return output;
}

export {dedupe};
