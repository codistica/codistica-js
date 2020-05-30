/** @module core/modules/array-utils/get-shortest-path */

/**
 * @description Determines shortest path from one array position to another.
 * @param {Array<*>} array - Input array.
 * @param {number} from - Starting position.
 * @param {number} to - Ending position.
 * @returns {number} Result.
 */
function getShortestPath(array, from, to) {
    const delta = (to % array.length) - from;
    const directPathLength = Math.abs(delta);
    const inversePathLength = array.length - directPathLength;
    if (directPathLength <= inversePathLength) {
        return directPathLength * Math.sign(delta);
    } else {
        return inversePathLength * Math.sign(delta) * -1;
    }
}

export {getShortestPath};
