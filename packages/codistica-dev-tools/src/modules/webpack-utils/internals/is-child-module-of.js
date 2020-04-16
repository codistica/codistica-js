/** @module dev-tools/modules/webpack-utils/is-child-module-of */

import {traverseModules} from './traverse-modules.js';

/**
 * @typedef isChildModuleOfDependencyType
 * @property {isChildModuleOfModuleType} module - Module.
 */

/**
 * @typedef isChildModuleOfBlockType
 * @property {Array<isChildModuleOfDependencyType>} dependencies - Dependencies.
 */

/**
 * @typedef isChildModuleOfReasonType
 * @property {isChildModuleOfDependencyType} dependency - Dependency.
 * @property {isChildModuleOfModuleType} module - Module.
 */

/**
 * @typedef isChildModuleOfModuleType
 * @property {Array<isChildModuleOfBlockType>} blocks - Blocks.
 * @property {Array<isChildModuleOfDependencyType>} dependencies - Dependencies.
 * @property {Array<isChildModuleOfReasonType>} reasons - Reasons.
 * @property {(string|undefined)} resource - Resource.
 * @property {string} request - Request.
 * @property {string} userRequest - User request.
 * @property {string} rawRequest - Raw request.
 * @property {number} depth - Depth.
 * @property {(Array<isChildModuleOfModuleType>|undefined)} modules - Modules.
 * @property {isChildModuleOfModuleType} issuer - Issuer.
 */

/**
 * @typedef isChildModuleOfOptionsType
 * @property {(Array<(string|Object<string,*>)>|null)} [forbiddenModules] - Array of modules that must not be parents of starting module.
 * @property {boolean} [skipDynamics] - Skip dynamic dependencies while traversing.
 */

/**
 * @description Checks if a given module is a child dependency of another given module.
 * @param {isChildModuleOfModuleType} module - Starting module.
 * @param {(string|isChildModuleOfModuleType)} parentModule - Parent module to be searched.
 * @param {isChildModuleOfOptionsType} [options] - Options.
 * @returns {null|boolean} Result.
 */
function isChildModuleOf(module, parentModule, options) {
    let checkModules = [];
    let checkResult = false;

    if (typeof options !== 'object') {
        options = {
            forbiddenModules: null,
            skipDynamics: false
        };
    } else {
        options.forbiddenModules = Array.isArray(options.forbiddenModules)
            ? options.forbiddenModules
            : null;
        options.skipDynamics =
            typeof options.skipDynamics === 'boolean'
                ? options.skipDynamics
                : false;
    }

    if (!module || !parentModule) {
        return null;
    }

    if (typeof parentModule === 'string') {
        if (module.resource === parentModule) {
            return false;
        }
    } else {
        if (module === parentModule) {
            return false;
        }
    }

    if (module.constructor.name === 'ConcatenatedModule') {
        if (
            module.modules.some((internalModule) => {
                if (typeof parentModule === 'string') {
                    if (internalModule.resource === parentModule) {
                        return true;
                    }
                } else {
                    if (internalModule === parentModule) {
                        return true;
                    }
                }
                return false;
            })
        ) {
            return false;
        }
    }

    traverseModules(
        module,
        (currentModule, API) => {
            checkModules = [currentModule];
            if (currentModule.constructor.name === 'ConcatenatedModule') {
                checkModules = checkModules.concat(currentModule.modules);
            }
            for (let checkModule of checkModules) {
                if (checkModule.constructor.name === 'CssModule') {
                    // TODO: REMOVE? USE reasons[0]?
                    checkModule = checkModule.issuer;
                }
                if (
                    options.forbiddenModules &&
                    options.forbiddenModules.some((forbiddenModule) => {
                        if (typeof forbiddenModule === 'string') {
                            return forbiddenModule === checkModule.resource;
                        } else {
                            return forbiddenModule === checkModule;
                        }
                    })
                ) {
                    checkResult = false;
                    API.stopCurrentRecursion();
                    break;
                }
                if (typeof parentModule === 'string') {
                    if (checkModule.resource === parentModule) {
                        checkResult = true;
                        API.stopGlobalRecursion();
                        break;
                    }
                } else {
                    if (checkModule === parentModule) {
                        checkResult = true;
                        API.stopGlobalRecursion();
                        break;
                    }
                }
            }
        },
        {
            skipDynamics: options.skipDynamics
        }
    );

    return checkResult;
}

export {isChildModuleOf};
