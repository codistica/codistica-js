/** @module core/modules/string-utils/get-char-type */

import {REG_EXPS} from '../../../constants/reg-exps.js';

/**
 * @description Returns passed character type.
 * @param {string} str - Input character.
 * @returns {('NO_STRING'|'EMPTY'|'LOW_LETTER'|'UP_LETTER'|'NUMBER'|'SPACING'|'SPECIAL')} Character type.
 */
function getCharType(str) {
    if (typeof str !== 'string') {
        return 'NO_STRING';
    }
    if (!str.length) {
        return 'EMPTY';
    }
    if (REG_EXPS.LOW_LETTERS.test(str[0])) {
        return 'LOW_LETTER';
    }
    if (REG_EXPS.UP_LETTERS.test(str[0])) {
        return 'UP_LETTER';
    }
    if (/\d/.test(str[0])) {
        return 'NUMBER';
    }
    if (/\s/.test(str[0])) {
        return 'SPACING';
    }
    return 'SPECIAL';
}

export {getCharType};
