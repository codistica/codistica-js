/** @module core/modules/object-utils/add-read-only-property */

import {log} from '../../log.js';

/**
 * @description Adds a read-only like property to an object.
 * @param {Object<string,*>} obj - Input object.
 * @param {string} key - Name for the read-only property to be added.
 * @param {*} value - Value for the added property.
 * @returns {boolean} Result.
 */
function addReadOnlyProperty(obj, key, value) {
    if (typeof obj[key] !== 'undefined') {
        return false;
    }
    Object.defineProperty(obj, key, {
        /**
         * @description Getter to be assigned.
         * @returns {*} Corresponding property value.
         */
        get() {
            return value;
        },
        /**
         * @description Setter to be assigned.
         * @returns {void} Void.
         */
        set() {
            log.warning(
                'addReadOnlyProperty()',
                'TRYING TO MODIFY A READ-ONLY PROPERTY'
            )();
        }
    });
    return true;
}

export {addReadOnlyProperty};
