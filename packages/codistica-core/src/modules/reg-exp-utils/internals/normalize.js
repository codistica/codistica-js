/** @module core/modules/reg-exp-utils/normalize */

import {isPrimitive} from '../../object-utils/internals/is-primitive.js';
import {stringifyPrimitive} from '../../stringify-primitive.js';
import {escape} from './ecape.js';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} normalizeRawExpType */

/**
 * @description Converts valid inputs into an array of RegExps.
 * @param {normalizeRawExpType} rawExp - Input to be converted.
 * @returns {Array<RegExp>} Conversion result.
 */
function normalize(rawExp) {
    if (Array.isArray(rawExp)) {
        return rawExp.map((elem) => {
            return normalize(elem)[0];
        });
    }
    if (rawExp instanceof RegExp) {
        return [rawExp];
    } else if (typeof rawExp === 'string') {
        return [new RegExp(escape(rawExp))];
    } else if (isPrimitive(rawExp) && rawExp !== null) {
        return [new RegExp(escape(stringifyPrimitive(rawExp)))];
    } else {
        return [];
    }
}

export {normalize};
