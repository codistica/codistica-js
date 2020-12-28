/** @module core/modules/parse */

/**
 * @description Receives a raw string and returns its best found data type representation.
 * @param {string} str - Input string.
 * @returns {*} Parsed value.
 */
function parse(str) {
    const normStr = str.trim().toLowerCase();

    if (normStr === 'undefined') {
        return undefined;
    }

    const parsedNum = parseFloat(normStr);

    if (
        !Number.isNaN(parsedNum) &&
        parsedNum.toString().length === normStr.length
    ) {
        return parsedNum;
    }

    try {
        return JSON.parse(normStr);
    } catch {
        return str;
    }
}

export {parse};
