/** @module core/modules/number-utils/deep-parse-int */

/**
 * @description Deep parse integers in input.
 * @param {(string|number)} input - Input.
 * @returns {(number|NaN)} Parsed integer or null.
 */
function deepParseInt(input) {
    if (typeof input === 'string' && input.length > 0) {
        return parseInt(input.replace(/\D/g, ''));
    } else if (typeof input === 'number') {
        return input;
    } else {
        return NaN;
    }
}

export {deepParseInt};
