/** @module core/modules/object-utils/truncate */

import {forEachSync} from './for-each-sync.js';
import {getKeys} from './get-keys.js';
import {hasKeys} from './has-keys.js';
import {isPureObject} from './is-pure-object.js';

/**
 * @description Truncates and object to the specified depth, replacing any remaining branches with a string representation including type and keys.
 * @param {(Object<string,*>|Array<*>)} obj - Input object.
 * @param {number} maxDepth - Truncation depth.
 * @returns {Object<string,*>} Resulting object.
 */
function truncate(obj, maxDepth) {
    obj = forEachSync(
        obj,
        (elem, API) => {
            if (API.depth === maxDepth) {
                if (Array.isArray(elem)) {
                    API.replaceValue(`[ARRAY: ${getKeys(elem).join(' ')}]`);
                } else if (isPureObject(elem)) {
                    API.replaceValue(`[OBJECT: ${getKeys(elem).join(' ')}]`);
                } else if (hasKeys(elem)) {
                    API.replaceValue(
                        `[${(typeof elem).toUpperCase()}: ${getKeys(elem).join(
                            ' '
                        )}]`
                    );
                }
            }
        },
        {maxDepth, circularCheck: true}
    );
    return obj;
}

export {truncate};
