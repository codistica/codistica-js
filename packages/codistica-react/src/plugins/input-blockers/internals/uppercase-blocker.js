/** @module react/plugins/input-blockers/uppercase-blocker */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Blocks uppercase letters keystrokes.
 * @returns {{type: 'blocker', plugin: function(Object<string,*>): boolean}} Blocker.
 */
function uppercaseBlocker() {
    return {
        type: 'blocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return REG_EXPS.UP_LETTERS.test(e.key);
        }
    };
}

export {uppercaseBlocker};
