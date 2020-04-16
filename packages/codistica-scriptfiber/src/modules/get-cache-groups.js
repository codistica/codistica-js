/** @module scriptfiber/modules/get-cache-groups */

// TODO: ADD CACHE? (SHOULD IT BE HERE OR INSIDE TRAVERSING FUNCTIONS?)
// TODO: DEDUPE main.module.scss? AND SEE IF GENERATED CSS FILES DEDUPE AS WELL

import {WebpackUtils} from '@codistica/dev-tools';

/**
 * @typedef getCacheGroupsDependencyType
 * @property {getCacheGroupsModuleType} module - Module.
 */

/**
 * @typedef getCacheGroupsBlockType
 * @property {Array<getCacheGroupsDependencyType>} dependencies - Dependencies.
 */

/**
 * @typedef getCacheGroupsReasonType
 * @property {getCacheGroupsDependencyType} dependency - Dependency.
 * @property {getCacheGroupsModuleType} module - Module.
 */

/**
 * @typedef getCacheGroupsModuleType
 * @property {Array<getCacheGroupsBlockType>} blocks - Blocks.
 * @property {Array<getCacheGroupsDependencyType>} dependencies - Dependencies.
 * @property {Array<getCacheGroupsReasonType>} reasons - Reasons.
 * @property {(string|undefined)} resource - Resource.
 * @property {string} request - Request.
 * @property {string} userRequest - User request.
 * @property {string} rawRequest - Raw request.
 * @property {number} depth - Depth.
 * @property {(Array<getCacheGroupsModuleType>|undefined)} modules - Modules.
 * @property {getCacheGroupsModuleType} issuer - Issuer.
 */

/**
 * @description Builds cache groups object.
 * @param {string} bootloaderPath - Bootloader file absolute path.
 * @param {string} appPath - App file absolute path.
 * @returns {Object<string,*>} Built cache groups object.
 */
function getCacheGroups(bootloaderPath, appPath) {
    const commonOptions = {
        enforce: true,
        reuseExistingChunk: false
    };

    return {
        default: false,
        vendors: false,
        development: {
            ...commonOptions,
            priority: -1,
            /**
             * @description Module selection method.
             * @param {getCacheGroupsModuleType} module - Module.
             * @returns {boolean} Should be include.
             */
            test(module) {
                return (
                    !WebpackUtils.isChildModuleOf(module, bootloaderPath) &&
                    module.resource !== bootloaderPath
                );
            }
        },
        boot: {
            ...commonOptions,
            priority: -2,
            /**
             * @description Module selection method.
             * @param {getCacheGroupsModuleType} module - Module.
             * @returns {boolean} Should be include.
             */
            test(module) {
                return (
                    !WebpackUtils.isInitialModule(module) &&
                    WebpackUtils.isChildModuleOf(module, bootloaderPath, {
                        forbiddenModules: [appPath]
                    })
                );
            }
        },
        react: {
            // TODO: GET REACT PATHS OR SOMETHING ELSE, BUT MUST BE IMPROVED
            ...commonOptions,
            priority: -3,
            /**
             * @description Module selection method.
             * @param {getCacheGroupsModuleType} module - Module.
             * @returns {boolean} Should be include.
             */
            test(module) {
                return (
                    !WebpackUtils.isInitialModule(module) &&
                    WebpackUtils.isChildModuleOf(module, appPath) &&
                    /react/.test(module.resource)
                );
            }
        },
        modules: {
            ...commonOptions,
            priority: -4,
            /**
             * @description Module selection method.
             * @param {getCacheGroupsModuleType} module - Module.
             * @returns {boolean} Should be include.
             */
            test(module) {
                return (
                    !WebpackUtils.isInitialModule(module) &&
                    WebpackUtils.isChildModuleOf(module, appPath) &&
                    /[\\/]node_modules[\\/]/.test(module.resource)
                );
            }
        },
        app: {
            ...commonOptions,
            priority: -5,
            /**
             * @description Module selection method.
             * @param {getCacheGroupsModuleType} module - Module.
             * @returns {boolean} Should be include.
             */
            test(module) {
                return (
                    !WebpackUtils.isInitialModule(module) &&
                    (WebpackUtils.isChildModuleOf(module, appPath, {
                        skipDynamics: true
                    }) ||
                        module.resource === appPath)
                );
            }
        }
    };
}

export {getCacheGroups};
