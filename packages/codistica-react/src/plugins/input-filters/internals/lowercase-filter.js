/** @module react/plugins/input-filters/lowercase-filter */

/**
 * @description Makes all characters uppercase.
 * @returns {{type: 'filter', plugin: function(string): string}} Filter.
 */
function lowercaseFilter() {
    return {
        type: 'filter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.toUpperCase();
        }
    };
}

export {lowercaseFilter};
