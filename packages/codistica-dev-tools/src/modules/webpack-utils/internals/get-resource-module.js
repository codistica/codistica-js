/** @module dev-tools/modules/webpack-utils/get-resource-module */

/**
 * @description Gets respective module instance for specified resource.
 * @param {Object<string,*>} compilation - Compilation.
 * @param {string} resource - Resource absolute path.
 * @returns {Object<string,*>|null} Found module or null.
 */
function getResourceModule(compilation, resource) {
    for (const module of compilation.modules) {
        if (module.constructor.name === 'ConcatenatedModule') {
            if (
                module.modules.some(
                    (internalModule) => internalModule.resource === resource
                )
            ) {
                return module;
            }
        } else {
            if (module.resource === resource) {
                return module;
            }
        }
    }
    return null;
}

export {getResourceModule};
