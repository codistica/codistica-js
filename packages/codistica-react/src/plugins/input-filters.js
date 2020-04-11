/** @module react/plugins/input-filters */

import {REG_EXPS} from '@codistica/core';

/**
 * @classdesc Input filters plugin for @codistica/react Input component.
 */
class InputFilters {
    // TODO: CREATE DATE FILTER

    /**
     * @description Remove everything but numbers.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static onlyNumbers(value) {
        return value.replace(/\D/g, '');
    }

    /**
     * @description Remove everything but letters.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static onlyLetters(value) {
        return value.replace(REG_EXPS.NON_LETTERS, '');
    }

    /**
     * @description Remove special characters.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static noSpecials(value) {
        return value.replace(REG_EXPS.SPECIALS, '');
    }

    /**
     * @description Remove spaces.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static noSpaces(value) {
        return value.replace(/[ ]/g, '');
    }

    /**
     * @description Remove extra spaces.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static onlySingleSpaces(value) {
        return value.replace(/\s{2,}/g, ' ');
    }

    /**
     * @description Remove spaces at the beginning.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static noLeadingSpaces(value) {
        return value.replace(/^\s+/, '');
    }

    /**
     * @description Remove spaces at the end.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static noTrailingSpaces(value) {
        return value.replace(/\s+$/, '');
    }

    /**
     * @description Remove all uppercase characters.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static noUppercase(value) {
        return value.toLowerCase();
    }

    /**
     * @description Remove all lowercase characters.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static noLowercase(value) {
        return value.toUpperCase();
    }

    /**
     * @description Capitalize every word first letter.
     * @param {Object<string,*>} value - Input value.
     * @returns {string} Resulting string.
     */
    static capitalizeFirts(value) {
        return value.replace(REG_EXPS.FIRST_LETTERS, function (chr) {
            return chr.toUpperCase();
        });
    }
}

export {InputFilters};
