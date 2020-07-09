/** @module react/plugins/input-filters/special-filter */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Removes special characters.
 * @returns {{type: 'filter', name: string, plugin: function(string): string}} Filter.
 */
function specialFilter() {
    return {
        type: 'filter',
        name: 'specialFilter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(REG_EXPS.SPECIALS, '');
        }
    };
}

export {specialFilter};
