/** @module core/modules/number-utils/is-negative-zero */

/**
 * @description Indicate if input is a negative zero.
 * @param {number} num - Input number.
 * @returns {boolean} Result.
 */
function isNegativeZero(num) {
    return 1 / num === -Infinity;
}

export {isNegativeZero};
