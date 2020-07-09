/** @module react/plugins/input-blockers/non-number-blocker */

/**
 * @description Blocks non number keystrokes.
 * @returns {{type: 'blocker', name: string, plugin: function(Object<string,*>): boolean}} Blocker.
 */
function nonNumberBlocker() {
    return {
        type: 'blocker',
        name: 'nonNumberBlocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return /\D/g.test(e.key);
        }
    };
}

export {nonNumberBlocker};
