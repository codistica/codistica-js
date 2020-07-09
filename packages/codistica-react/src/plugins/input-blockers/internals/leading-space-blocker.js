/** @module react/plugins/input-blockers/leading-space-blocker */

/**
 * @description Blocks leading space keystrokes.
 * @returns {{type: 'blocker', name: string, plugin: function(Object<string,*>): boolean}} Blocker.
 */
function leadingSpaceBlocker() {
    return {
        type: 'blocker',
        name: 'leadingSpaceBlocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return /[ ]/g.test(e.key) && e.target.selectionStart === 0;
        }
    };
}

export {leadingSpaceBlocker};
