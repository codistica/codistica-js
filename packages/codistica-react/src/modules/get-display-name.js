/** @flow */

import type {ComponentType} from 'react';

/**
 * @description Gets component's display name.
 * @param {*} Component - Component.
 * @returns {string} - Display name.
 */
function getDisplayName<P>(Component: ComponentType<P>) {
    return Component.displayName || Component.name || 'Component';
}

export {getDisplayName};
