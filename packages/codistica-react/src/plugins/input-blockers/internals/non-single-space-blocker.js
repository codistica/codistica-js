/** @module react/plugins/input-blockers/non-single-space-blocker */

/**
 * @description Blocks consecutive spaces keystrokes.
 * @returns {{type: 'blocker', plugin: function(Object<string,*>): boolean}} Blocker.
 */
function nonSingleSpaceBlocker() {
    return {
        type: 'blocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return (
                /[ ]/g.test(e.key) &&
                (/\s/g.test(e.target.value[e.target.selectionStart - 1]) ||
                    (e.target.selectionStart < e.target.value.length &&
                        /\s/g.test(e.target.value[e.target.selectionStart])))
            );
        }
    };
}

export {nonSingleSpaceBlocker};
