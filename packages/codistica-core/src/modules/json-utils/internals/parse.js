/** @module core/modules/json-utils/parse */

import {parseCircular} from '../../object-utils/internals/parse-circular.js';

/**
 * @description Extends native JSON parse method, including circular object reviving capabilities.
 * @param {string} text - Text to be parsed.
 * @param {*} [reviver] - Custom reviver callback.
 * @returns {*} Parsed object.
 */
function parse(text, reviver) {
    const parsedValue = JSON.parse(text, reviver);
    parseCircular(parsedValue);
    return parsedValue;
}

export {parse};
