/** @module core/modules/reg-exp-utils/check-one */

import {normalize} from './normalize.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} checkOneRawExpType */

/**
 * @description Checks input against all items in rawExp and returns a truthy value if at least one match is found. Returns false for an invalid rawExp.
 * @param {string} str - Input string.
 * @param {checkOneRawExpType} rawExp - Expression to check.
 * @returns {boolean} Result.
 */
function checkOne(str, rawExp) {
    return normalize(rawExp).some((elem) => {
        if (elem instanceof RegExp) {
            return elem.test(str);
        } else {
            return false;
        }
    });
}

export {checkOne};
