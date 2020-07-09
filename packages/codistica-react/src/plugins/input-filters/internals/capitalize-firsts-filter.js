/** @module react/plugins/input-filters/capitalize-first-filter */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Capitalizes all first letters.
 * @returns {{type: 'filter', name: string, plugin: function(string): string}} Filter.
 */
function capitalizeFirstsFilter() {
    return {
        type: 'filter',
        name: 'capitalizeFirstFilter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(REG_EXPS.FIRST_LETTERS, function (chr) {
                return chr.toUpperCase();
            });
        }
    };
}

export {capitalizeFirstsFilter};
