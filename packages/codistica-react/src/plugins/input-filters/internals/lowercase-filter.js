/** @module react/plugins/input-filters/lowercase-filter */

/**
 * @description Makes all characters uppercase.
 * @returns {{type: 'filter', name: string, plugin: function(string): string}} Filter.
 */
function lowercaseFilter() {
    return {
        type: 'filter',
        name: 'lowercaseFilter',
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
