/** @module core/modules/number-utils/deep-parse-int */

/**
 * @description Deep parse integers in input.
 * @param {(string|number)} input - Input.
 * @returns {(number|null)} Parsed integer or null.
 */
function deepParseInt(input) {
    if (typeof input === 'string' && input.length > 0) {
        return parseInt((input.match(/\d/g) || []).join(''));
    } else if (typeof input === 'number') {
        return input;
    } else {
        return null;
    }
}

export {deepParseInt};
