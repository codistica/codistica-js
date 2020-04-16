/** @module dev-tools/modules/webpack-utils/is-initial-module */

/**
 * @description Determines if specified module is an initial module.
 * @param {Object<string,*>} module - Module.
 * @returns {boolean} Check result.
 */
function isInitialModule(module) {
    return module.getChunks().some((chunk) => chunk.isOnlyInitial());
}

export {isInitialModule};
