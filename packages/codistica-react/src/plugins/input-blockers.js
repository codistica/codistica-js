/** @module react/plugins/input-blockers */

import {REG_EXPS} from '@codistica/core';

/**
 * @classdesc Input blockers plugin for @codistica/react Input component.
 */
class InputBlockers {
    // TODO: CREATE DATE FILTER

    /**
     * @description Block everything but numbers.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static onlyNumbers(e) {
        return /\D/g.test(e.key);
    }

    /**
     * @description Block everything but letters.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static onlyLetters(e) {
        return REG_EXPS.NON_LETTERS.test(e.key);
    }

    /**
     * @description Block special characters.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static noSpecials(e) {
        return REG_EXPS.SPECIALS.test(e.key);
    }

    /**
     * @description Block spaces.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static noSpaces(e) {
        return /[ ]/g.test(e.key);
    }

    /**
     * @description Block extra spaces.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static onlySingleSpaces(e) {
        return (
            /[ ]/g.test(e.key) &&
            (/\s/g.test(e.target.value[e.target.selectionStart - 1]) ||
                (e.target.selectionStart < e.target.value.length &&
                    /\s/g.test(e.target.value[e.target.selectionStart])))
        );
    }

    /**
     * @description Block spaces at the beginning.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static noLeadingSpaces(e) {
        return /[ ]/g.test(e.key) && e.target.selectionStart === 0;
    }

    /**
     * @description Block all uppercase characters.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static noUppercase(e) {
        return REG_EXPS.UP_LETTERS.test(e.key);
    }

    /**
     * @description Block all lowercase characters.
     * @param {Object<string,*>} e - Input event.
     * @returns {boolean} Should block.
     */
    static noLowercase(e) {
        return REG_EXPS.LOW_LETTERS.test(e.key);
    }
}

export {InputBlockers};
