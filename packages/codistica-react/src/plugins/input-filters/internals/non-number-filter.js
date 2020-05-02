/** @module react/plugins/input-filters/non-number-filter */

/**
 * @description Removes non number characters.
 * @returns {{type: 'filter', plugin: function(string): string}} Filter.
 */
function nonNumberFilter() {
    return {
        type: 'filter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(/\D/g, '');
        }
    };
}

export {nonNumberFilter};
