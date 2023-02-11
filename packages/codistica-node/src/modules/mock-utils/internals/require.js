import {Module} from './module.js';
import {registerMock} from './other.js';

/**
 * @typedef mockType
 * @property {(RegExp|string)} request - Request pattern.
 * @property {*} exports - Mock exports.
 * @property {(RegExp|string)} [target] - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [requester] - Requester pattern.
 */

/**
 * @typedef moduleType
 * @property {string} id - Module ID (typically the filename).
 * @property {string} filename - Module filename.
 * @property {Array<moduleType>} children - The module objects required for the first time by this one.
 * @property {*} exports - Module exports.
 * @property {boolean} isPreloading - Is 'true' if the module is running during the Node.js preload phase.
 * @property {boolean} loaded - Whether the module is done loading, or is in the process of loading.
 * @property {string} path - The directory name of the module.
 * @property {Array<string>} paths - The search paths for the module.
 * @property {function(string): *} require - Require a module as if it were required from inside this one.
 */

/**
 * @description Requires module while automatically applying specified mocks.
 * @param {string} id - Requested module id.
 * @param {(Object<string,*>|Array<mockType>)} mocks - Mocks.
 * @param {(moduleType|*)} requesterModule - Requester module.
 * @returns {*} Loaded module exports.
 */
function require(id, mocks, requesterModule) {
    const toUnregister = [];

    // TODO: AUTO GET requesterModule SOMEHOW? THIS WOULD HAVE TO BE AN INDEPENDENT MODULE, SELF CLEARING FROM CACHE (SEE proxyquire), RECURSE FROM process.mainModule TO module.filename AND GET PARENT. DO ONLY WHEN NO requesterModule PASSED. MAKE requesterModule OPTIONAL AND PLACE INSIDE options.

    if (Array.isArray(mocks)) {
        mocks.forEach((mock) => {
            const {request, exports: exp, ...mockOptions} = mock;
            toUnregister.push(
                registerMock(request, exp, {
                    target: Module._resolveFilename(id, requesterModule),
                    ...mockOptions
                })
            );
        });
    } else {
        Object.keys(mocks).forEach((k) => {
            toUnregister.push(
                registerMock(k, mocks[k], {
                    target: Module._resolveFilename(id, requesterModule)
                })
            );
        });
    }

    const exp = requesterModule.require(id);

    toUnregister.forEach((mockUtils) => mockUtils && mockUtils.unregister());

    return exp;
}

export {require};
