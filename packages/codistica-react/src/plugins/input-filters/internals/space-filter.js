/** @module react/plugins/input-filters/space-filter */

/**
 * @description Removes space characters.
 * @returns {{type: 'filter', plugin: function(string): string}} Filter.
 */
function spaceFilter() {
    return {
        type: 'filter',
        /**
         * @description Filter.
         * @param {string} value - Input value.
         * @returns {string} - Filtered output.
         */
        plugin(value) {
            return value.replace(/[ ]/g, '');
        }
    };
}

export {spaceFilter};
