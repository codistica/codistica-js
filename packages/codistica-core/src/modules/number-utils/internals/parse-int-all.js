/** @module core/modules/number-utils/parse-int-all */

/**
 * @description Parses all successive integers and returns an array with the results.
 * @param {(string|number)} input - Input.
 * @returns {(Array<number>|null)} Parsed integers array or null.
 */
function parseIntAll(input) {
    if (typeof input === 'string' && input.length > 0) {
        return (input.match(/\d+/g) || []).map((val) => parseInt(val));
    } else if (typeof input === 'number') {
        return [input];
    } else {
        return null;
    }
}

export {parseIntAll};
