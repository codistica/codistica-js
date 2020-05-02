/** @module react/plugins/input-filters/trailing-space-filter */

/**
 * @description Removes trailing spaces.
 * @returns {{type: 'filter', plugin: function(string): string}} Filter.
 */
function trailingSpaceFilter() {
    return {
        type: 'filter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(/\s+$/, '');
        }
    };
}

export {trailingSpaceFilter};
