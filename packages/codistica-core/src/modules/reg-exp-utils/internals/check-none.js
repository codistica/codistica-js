/** @module core/modules/reg-exp-utils/check-none */

import {checkOne} from './check-one.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} checkNoneRawExpType */

/**
 * @description Checks input against all items in rawExp and returns a truthy value if no match is found.
 * @param {string} str - Input string.
 * @param {checkNoneRawExpType} rawExp - Expression to check.
 * @returns {boolean} Result.
 */
function checkNone(str, rawExp) {
    return !checkOne(str, rawExp);
}

export {checkNone};
