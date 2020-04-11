/** @module core/modules/reg-exp-utils/escape */

import {REG_EXPS} from '../../../constants/reg-exps.js';

/**
 * @description Takes a string as input and returns a string whose RegExp reserved characters has been escaped.
 * @param {string} str - String to be escaped.
 * @returns {string} Escaped string.
 */
function escape(str) {
    return str.replace(REG_EXPS.REG_EXP_RESERVED, '\\$&');
}

export {escape};
