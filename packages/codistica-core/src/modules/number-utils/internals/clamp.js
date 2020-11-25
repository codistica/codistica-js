/** @module core/modules/number-utils/clamp */

/**
 * @description Clamps number between specified limits.
 * @param {number} num - Input number.
 * @param {number} min - Minimum.
 * @param {number} max - Maximum.
 * @returns {number} Result.
 */
function clamp(num, min, max) {
    if (num > max) {
        return max;
    }
    if (num < min) {
        return min;
    }
    return num;
}

export {clamp};
