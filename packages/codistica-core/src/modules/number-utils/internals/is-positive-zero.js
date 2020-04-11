/** @module core/modules/number-utils/is-positive-zero */

/**
 * @description Indicate if input is a positive zero.
 * @param {number} num - Input number.
 * @returns {boolean} Result.
 */
function isPositiveZero(num) {
    return 1 / num === Infinity;
}

export {isPositiveZero};
