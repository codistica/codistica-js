/** @module core/modules/array-utils/flat */

/**
 * @description Reduces input array to a single level array.
 * @param {Array<*>} array - Input array.
 * @param {number} [maxDepth=Infinity] - Maximum recursion depth.
 * @returns {Array<*>} Flattened array.
 */
function flat(array, maxDepth) {
    if (typeof maxDepth !== 'number') {
        maxDepth = Infinity;
    }

    return recurse(array, 0);

    /**
     * @description Recursive function.
     * @param {Array<*>} elem - Element.
     * @param {number} depth - Current depth.
     * @returns {Array<*>} Output.
     */
    function recurse(elem, depth) {
        const length = elem.length;

        let output = [];
        let index = 0;

        while (index < length) {
            const value = elem[index];

            if (Array.isArray(value) && depth < maxDepth) {
                output = output.concat(recurse(value, depth + 1));
            } else {
                output.push(value);
            }

            index++;
        }

        return output;
    }
}

export {flat};
