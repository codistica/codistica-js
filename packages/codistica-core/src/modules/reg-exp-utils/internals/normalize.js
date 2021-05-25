/** @module core/modules/reg-exp-utils/normalize */

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
    } else {
        return [];
    }
}

export {normalize};
