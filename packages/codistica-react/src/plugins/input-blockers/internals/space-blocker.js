/** @module react/plugins/input-blockers/space-blocker */

/**
 * @description Blocks space keystrokes.
 * @returns {{type: 'blocker', plugin: function(Object<string,*>): boolean}} Blocker.
 */
function spaceBlocker() {
    return {
        type: 'blocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return /[ ]/g.test(e.key);
        }
    };
}

export {spaceBlocker};
