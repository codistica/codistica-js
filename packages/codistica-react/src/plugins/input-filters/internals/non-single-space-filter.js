/** @module react/plugins/input-filters/non-single-space-filter */

/**
 * @description Reduces multiple consecutive spaces to single spaces.
 * @returns {{type: 'filter', name: string, plugin: function(string): string}} Filter.
 */
function nonSingleSpaceFilter() {
    return {
        type: 'filter',
        name: 'nonSingleSpaceFilter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(/\s{2,}/g, ' ');
        }
    };
}

export {nonSingleSpaceFilter};
