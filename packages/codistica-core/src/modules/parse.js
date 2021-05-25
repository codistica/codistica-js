/** @module core/modules/parse */

import {parse as _parse} from './json-utils/internals/parse.js';

/**
 * @description Receives a raw string and returns its best found data type representation.
 * @param {string} str - Input string.
 * @returns {*} Parsed value.
 */
function parse(str) {
    const trimmed = str.trim().toLowerCase();

    if (trimmed.toLowerCase() === 'undefined') {
        return undefined;
    }

    const num = parseFloat(trimmed);

    if (!Number.isNaN(num) && num.toString().length === trimmed.length) {
        return num;
    }

    try {
        return _parse(trimmed);
    } catch {
        return str;
    }
}

export {parse};
