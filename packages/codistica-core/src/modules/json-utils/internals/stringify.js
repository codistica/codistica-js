/** @module core/modules/json-utils/stringify */

import {stringifyCircular} from '../../object-utils/internals/stringify-circular.js';

/**
 * @description Extends native JSON stringify method, including circular object stringifying capabilities.
 * @param {*} value - Value to be stringified.
 * @param {*} [replacer] - Custom replacer callback.
 * @param {(string|number)} [space] - Custom spacing.
 * @returns {string} Stringified object.
 */
function stringify(value, replacer, space) {
    stringifyCircular(value);
    return JSON.stringify(value, replacer, space);
}

export {stringify};
