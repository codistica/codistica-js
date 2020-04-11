/** @module core/modules/object-utils/stringify-circular */

import {forEachSync} from './for-each-sync.js';

/** @typedef {(Object<string,*>|Array<*>)} stringifyCircularInputType */

/**
 * @description Stringifies input circular references.
 * @param {stringifyCircularInputType} obj - Input object.
 * @returns {stringifyCircularInputType} Resulting object.
 */
function stringifyCircular(obj) {
    forEachSync(obj, () => {}, {
        circularCheck: true,
        onCircular(val, refPath, API) {
            API.replaceValue(`[CIRCULAR:${refPath}]`);
        }
    });
    return obj;
}

export {stringifyCircular};
