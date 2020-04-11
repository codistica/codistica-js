/** @module core/modules/object-utils/parse-circular */

import {forEachSync} from './for-each-sync.js';
import {seek} from './seek.js';

/**
 * @description Parses/revives input stringified circular references.
 * @param {(Object<string,*>|Array<*>)} obj - Input object.
 * @returns {Object<string,*>} Resulting object.
 */
function parseCircular(obj) {
    forEachSync(obj, (val, API) => {
        if (typeof val === 'string' && /\[CIRCULAR:.*]$/.test(val)) {
            API.replaceValue(
                seek(obj, (val.match(/\[CIRCULAR:(?<path>.*)]$/) || [])[1])
            );
        }
    });
    return obj;
}

export {parseCircular};
