/** @module core/modules/string-utils/get-char-type */

import {REG_EXPS} from '../../../constants/reg-exps.js';

/**
 * @description Returns passed character type.
 * @param {string} str - Input character.
 * @returns {('EMPTY'|'LOWER'|'UPPER'|'DIGIT'|'SPACE'|'SPECIAL')} Character type.
 */
function getCharType(str) {
    if (!str.length) {
        return 'EMPTY';
    }
    if (REG_EXPS.LOW_LETTERS.test(str[0])) {
        return 'LOWER';
    }
    if (REG_EXPS.UP_LETTERS.test(str[0])) {
        return 'UPPER';
    }
    if (/\d/.test(str[0])) {
        return 'DIGIT';
    }
    if (/\s/.test(str[0])) {
        return 'SPACE';
    }
    return 'SPECIAL';
}

export {getCharType};
