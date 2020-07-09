/** @module react/plugins/input-filters/leading-space-filter */

/**
 * @description Removes leading spaces.
 * @returns {{type: 'filter', name: string, plugin: function(string): string}} Filter.
 */
function leadingSpaceFilter() {
    return {
        type: 'filter',
        name: 'leadingSpaceFilter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(/^\s+/, '');
        }
    };
}

export {leadingSpaceFilter};
