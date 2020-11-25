/** @flow */

import type {ElementType} from 'react';

/**
 * @description Gets component's display name.
 * @param {*} Component - Component.
 * @returns {string} - Display name.
 */
function getDisplayName(Component: ElementType) {
    if (typeof Component === 'string') {
        return Component;
    }
    return Component.displayName || Component.name || 'Component';
}

export {getDisplayName};
