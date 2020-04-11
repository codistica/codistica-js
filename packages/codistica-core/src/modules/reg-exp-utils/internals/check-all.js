/** @module core/modules/reg-exp-utils/check-all */

import {normalize} from './normalize.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} checkAllRawExpType */

/**
 * @description Checks input against all items in rawExp and returns a truthy value if all elements are matched. Returns true for an invalid rawExp.
 * @param {string} str - Input string.
 * @param {checkAllRawExpType} rawExp - Expression to check.
 * @returns {boolean} Result.
 */
function checkAll(str, rawExp) {
    return normalize(rawExp).every((elem) => {
        if (elem instanceof RegExp) {
            return elem.test(str);
        } else {
            return false;
        }
    });
}

export {checkAll};
