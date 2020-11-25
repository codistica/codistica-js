/** @module core/constants/reg-exps */

// UPPERCASE ACCENTED UNICODE RANGE: \u00C0-\u00DE
// LOWERCASE ACCENTED UNICODE RANGE: \u00DF-\u00FF

// TODO: ADD JSDOC. WHY @enum DOES NOT WORK?
const REG_EXPS = {
    get IS_EMAIL() {
        return /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    },
    get REG_EXP_RESERVED() {
        return /[-/\\^$*+?.()|[\]{}]/g;
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
