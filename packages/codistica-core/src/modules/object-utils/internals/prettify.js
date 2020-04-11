/** @module core/modules/object-utils/prettify */

import {STRINGS} from '../../../constants/strings.js';

/**
 * @description Stringifies and pretty-prints input object. Does not check for circular references.
 * @param {(Object<string,*>|Array<*>)} input - Input object.
 * @returns {string} Prettified object string.
 */
function prettify(input) {
    return JSON.stringify(input, null, STRINGS.STD_TAB_SPACE);
}

export {prettify};
