/** @module core/modules/number-utils/get-mean */

/**
 * @description Calculates the arithmetic mean of the input numbers array.
 * @param {Array<number>} input - Input numbers array.
 * @param {Array<number>} [weights] - Corresponding weights array.
 * @returns {null|number} Calculated arithmetic mean.
 */
function getArithmeticMean(input, weights) {
    const totalWeight = weights && weights.reduce((a, b) => a + b, 0);
    let result = 0;
    if (weights) {
        if (input.length !== weights.length) {
            return null;
        }
        input.forEach((val, index) => {
            result += (val * weights[index]) / totalWeight;
        });
    } else {
        input.forEach((val, index) => {
            result = (result * index + val) / (index + 1);
        });
    }
    return result;
}

export {getArithmeticMean};
