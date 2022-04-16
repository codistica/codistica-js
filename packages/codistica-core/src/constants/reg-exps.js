/** @module core/constants/reg-exps */

// UPPERCASE ACCENTED UNICODE RANGE: \u00C0-\u00DE
// LOWERCASE ACCENTED UNICODE RANGE: \u00DF-\u00FF

// TODO: ALLOW TO SET/OVERRIDE REGEXP FLAGS?

/**
 * @typedef {RegExp} regExpType
 * @readonly
 */

/**
 * @typedef regExpsType
 * @property {regExpType} IS_EMAIL - Matches a valid email address.
 * @property {regExpType} REG_EXP_RESERVED - Matches all characters that need to be escaped inside RegExp expressions.
 * @property {regExpType} CSS_RESERVED - Matches all characters that need to be escaped inside CSS identifiers.
 * @property {regExpType} LETTERS - Matches all letters.
 * @property {regExpType} LOW_LETTERS - Matches all lowercase letters.
 * @property {regExpType} UP_LETTERS - Matches all uppercase letters.
 * @property {regExpType} SPECIALS - Matches all special characters.
 * @property {regExpType} NON_LETTERS - Matches all non-letter characters.
 * @property {regExpType} NON_SPECIALS - Matches all non-special characters.
 * @property {regExpType} FIRST_LETTERS - Matches all first letters.
 * @property {regExpType} SPLIT_BY_CHAR - Matches all characters. Useful for correct/consistent splitting.
 * @property {regExpType} SHORTHEX - Matches all short hexadecimal expressions.
 * @property {regExpType} LONGHEX - Matches all long hexadecimal expressions.
 */

/**
 * @type {regExpsType}
 */
const REG_EXPS = {
    get IS_EMAIL() {
        return /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    },
    get REG_EXP_RESERVED() {
        return /[-/\\^$*+?.()|[\]{}]/g;
    },
    get CSS_RESERVED() {
        return /([[\].#*$><+~=|^:(),"'`\s])/g;
    },
    get LETTERS() {
        return /[a-zA-Z\u00C0-\u00FF]/g;
    },
    get LOW_LETTERS() {
        return /[a-z\u00DF-\u00FF]/g;
    },
    get UP_LETTERS() {
        return /[A-Z\u00C0-\u00DE]/g;
    },
    get SPECIALS() {
        return /[^a-zA-Z\u00C0-\u00FF\d\s]/g;
    },
    get NON_LETTERS() {
        return /[^a-zA-Z\u00C0-\u00FF\s]/g;
    },
    get NON_SPECIALS() {
        return /[a-zA-Z\u00C0-\u00FF\d]/g;
    },
    get FIRST_LETTERS() {
        return /(?:\s|^)[a-zA-Z\u00C0-\u00FF]/g;
    },
    get SPLIT_BY_CHAR() {
        return /(?=[\s\S])/u;
    },
    get SHORTHEX() {
        return /#[a-fA-F0-9]{3}(?=[\s,;'"]|$)/g;
    },
    get LONGHEX() {
        return /#[a-fA-F0-9]{6}(?=[\s,;'"]|$)/g;
    }
};

export {REG_EXPS};
