/** @module react/plugins/input-filters/uppercase-filter */

/**
 * @description Makes all characters lowercase.
 * @returns {{type: 'filter', plugin: function(string): string}} Filter.
 */
function uppercaseFilter() {
    return {
        type: 'filter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.toLowerCase();
        }
    };
}

export {uppercaseFilter};
