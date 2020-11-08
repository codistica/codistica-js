/** @module dev-tools/modules/webpack-utils/traverse-modules */

/**
 * @typedef traverseModulesDependencyType
 * @property {traverseModulesModuleType} module - Module.
 */

/**
 * @typedef traverseModulesBlockType
 * @property {Array<traverseModulesDependencyType>} dependencies - Dependencies.
 */

/**
 * @typedef traverseModulesReasonType
 * @property {traverseModulesDependencyType} dependency - Dependency.
 * @property {traverseModulesModuleType} module - Module.
 */

/**
 * @typedef traverseModulesModuleType
 * @property {Array<traverseModulesBlockType>} blocks - Blocks.
 * @property {Array<traverseModulesDependencyType>} dependencies - Dependencies.
 * @property {Array<traverseModulesReasonType>} reasons - Reasons.
 * @property {(string|undefined)} resource - Resource.
 * @property {string} request - Request.
 * @property {string} userRequest - User request.
 * @property {string} rawRequest - Raw request.
 * @property {number} depth - Depth.
 * @property {(Array<traverseModulesModuleType>|undefined)} modules - Modules.
 * @property {traverseModulesModuleType} issuer - Issuer.
 */

/**
 * @typedef traverseModulesAPIType
 * @property {function(): void} stopCurrentRecursion - Requests to stop the current branch recursion.
 * @property {function(): void} stopGlobalRecursion - Requests to stop the whole recursion.
 */

/**
 * @callback traverseModulesCallbackType
 * @param {traverseModulesModuleType} module - Module currently being traversed.
 * @param {traverseModulesAPIType} API - Recursion API.
 * @returns {void} Void.
 */

/**
 * @typedef traverseModulesOptionsType
 * @property {boolean} [downwards] - Traverse module tree going downwards.
 * @property {boolean} [skipDynamics] - Skip dynamic dependencies while traversing.
 */

/**
 * @description Utility function to traverse Webpack's modules dependency tree.
 * @param {traverseModulesModuleType} module - Starting module.
 * @param {traverseModulesCallbackType} callback - Function to be executed for each module.
 * @param {traverseModulesOptionsType} [options] - Traversing options.
 * @returns {void} Void.
 */
function traverseModules(module, callback, options) {
    const modulesCache = new WeakSet();

    let stopCurrentFlag = false;
    let stopGlobalFlag = false;

    if (typeof options !== 'object') {
        options = {
            downwards: false,
            skipDynamics: false
        };
    } else {
        options.downwards =
            typeof options.downwards === 'boolean' ? options.downwards : false;
        options.skipDynamics =
            typeof options.skipDynamics === 'boolean'
                ? options.skipDynamics
                : false;
    }

    const API = {
        stopCurrentRecursion() {
            stopCurrentFlag = true;
        },
        stopGlobalRecursion() {
            stopCurrentFlag = true;
            stopGlobalFlag = true;
        }
    };

    if (module) {
        modulesCache.add(module);
        callback(module, API);
        if (!stopGlobalFlag && !stopCurrentFlag) {
            recurse(module);
        }
    }

    /**
     * @description Recursive function.
     * @param {traverseModulesModuleType} currentModule - Module to be recursed.
     * @returns {void} Void.
     */
    function recurse(currentModule) {
        let elements = null;

        if (options.downwards) {
            elements = currentModule.dependencies || [];
            if (!options.skipDynamics) {
                // TODO: USE ONLY constructor.name === 'ImportDependency' ?
                elements = elements.concat(
                    (currentModule.blocks || [])
                        .map((block) => block.dependencies || [])
                        .reduce((acc, next) => acc.concat(next), [])
                );
            }
        } else {
            elements = currentModule.reasons || [];
            if (options.skipDynamics) {
                elements = elements.filter(
                    (element) =>
                        element.dependency.constructor.name !==
                        'ImportDependency'
                );
            }
        }

        for (const element of elements) {
            if (stopGlobalFlag) {
                return;
            }

            // ONLY TRAVERSE MODULE DEPENDENCIES (SOME BLOCK DEPENDENCIES MIGHT BE NON-MODULES)
            if (element.module) {
                if (modulesCache.has(element.module)) {
                    continue;
                }
                modulesCache.add(element.module);
                callback(element.module, API);
                if (!stopCurrentFlag) {
                    recurse(element.module);
                } else {
                    stopCurrentFlag = false;
                }
            }
        }
    }
}

export {traverseModules};
