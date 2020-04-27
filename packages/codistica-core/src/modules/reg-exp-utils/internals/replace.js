/** @module core/modules/reg-exp-utils/replace */

import {normalize as arrayUtilsNormalize} from '../../array-utils/internals/normalize.js';
import {isPureObject} from '../../object-utils/internals/is-pure-object.js';
import {normalize} from './normalize.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} replaceRawExpType */

/**
 * @typedef replaceReplacerObjType
 * @property {replaceRawExpType} search - Expression representing string to be replaced.
 * @property {string} val - String to use as replacement.
 */

/** @typedef {(replaceReplacerObjType|Function)} replaceReplacerType */

/**
 * @description Makes replacements in input string in order based on replacer.
 * @param {string} str - Input string.
 * @param {(replaceReplacerType|Array<replaceReplacerType>)} replacer - Replacer to be used.
 * @returns {string} Resulting string.
 */
function replace(str, replacer) {
    arrayUtilsNormalize(replacer).forEach((item) => {
        if (typeof item === 'function') {
            str = item(str);
        } else if (isPureObject(item) && item.search && item.val) {
            normalize(item.search).forEach((regExp) => {
                str = str.replace(regExp, item.val);
            });
        }
    });
    return str;
}

export {replace};
