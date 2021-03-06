/** @module react/plugins/input-filters/non-letter-filter */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Removes non letter characters.
 * @returns {{type: 'filter', name: string, plugin: function(string): string}} Filter.
 */
function nonLetterFilter() {
    return {
        type: 'filter',
        name: 'nonLetterFilter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(REG_EXPS.NON_LETTERS, '');
        }
    };
}

export {nonLetterFilter};
