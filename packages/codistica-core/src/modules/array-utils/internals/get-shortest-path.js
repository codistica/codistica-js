/** @module core/modules/array-utils/get-shortest-path */

/**
 * @description Determines shortest path from one array position to another.
 * @param {(Array<*>|number)} input - Array or array length.
 * @param {number} from - Starting position.
 * @param {number} to - Ending position.
 * @returns {number} Result.
 */
function getShortestPath(input, from, to) {
    const length = typeof input === 'number' ? input : input.length;

    if (!length) {
        return 0;
    }

    const delta = (to % length) - (from % length);
    const directPath = Math.abs(delta);
    const inversePath = length - directPath;

    if (directPath <= inversePath) {
        return directPath * Math.sign(delta);
    } else {
        return inversePath * Math.sign(delta) * -1;
    }
}

export {getShortestPath};
