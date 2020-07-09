/** @module react/plugins/input-blockers/lowercase-blocker */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Blocks lowercase letters keystrokes.
 * @returns {{type: 'blocker', name: string, plugin: function(Object<string,*>): boolean}} Blocker.
 */
function lowercaseBlocker() {
    return {
        type: 'blocker',
        name: 'lowercaseBlocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return REG_EXPS.LOW_LETTERS.test(e.key);
        }
    };
}

export {lowercaseBlocker};
