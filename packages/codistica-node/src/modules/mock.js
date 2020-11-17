/** @module node/modules/mock */

import {Module as _Module} from 'module';

// TODO: SEE ORIGINAL mockery PACKAGE. ADD MISSING FEATURES, CHECK AND IMPROVE.
// TODO: WORKAROUND DEPRECATED module.parent (USE require.main AND module.children).
// TODO: USE ITERATORS DIRECTLY (IF POSSIBLE).
// TODO: PREVENT THIS MODULE FROM DISAPPEARING FROM CACHE.
// TODO: REMEMBER TO CLEAN REFERENCES FROM REAL MODULE TREE (?). DURING CACHE CLEAN AND AFTER NORMALLY LOADING A TARGET MODULE. (SEE MOCKERY SOURCE CODE. DO BETTER). REMOVE MODULES WHEN CLEARED FROM CACHE? GO FROM main? OR SAVE "toBeCleaned" MODULES ON THE WAY?

// TODO: CONSIDER ALL LOADING CASES AND COMBINATIONS (LAZY AND NORMAL require, ASYNC import, STATIC import...).
// TODO: LAZY/DYNAMIC LOADING SHOULD NOT CAUSE PROBLEMS AS THEY ARE EXECUTED LATER IN RUNTIME. WE WILL NOT HAVE STACKS FOR THEM, BUT WE WILL HAVE module AND rawRequest. HANDLE THAT LIMITATION AS BETTER AS POSSIBLE AND DOCUMENT IT.

// TODO: ADD OPTION TO USE rawRequest INSTEAD OF resolvedRequest (filename) FOR request PATTERN?

// TODO: COMMENT CODE!
// TODO: RE-CHECK NAMINGS.
// TODO: CHECK FOR OPTIMIZATIONS.

// TODO: RUN CURRENT CACHE AGAINST NEW MOCK OBJECT ON REGISTRATION, IGNORING REQUEST/CHILDREN, CLEARING MATCHED ENTRIES. (MAKE CONFIGURABLE)

/** @type {Object<string,*>} */
const Module = _Module;

/**
 * @typedef mockObjectType
 * @property {*} exports - Mock exports.
 * @property {function(): *} [refresher] - Mock refresher.
 * @property {(RegExp|string)} request - Request pattern.
 * @property {(RegExp|string)} [target] - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [requester] - Requester pattern.
 * @property {boolean} [shouldRefresh] - Should refresh flag.
 */

/**
 * @typedef mockOptionsType
 * @property {boolean} autoStart - Auto start hooking based on mock registrations.
 * @property {('enable'|'disable'|'preserve')} cacheMode - Cache mode.
 * @property {boolean} allowNoTarget - Allow no target to be specified.
 * @property {boolean} startFresh - Start with a fresh cache.
 */

/** @type {mockOptionsType} */
const defaultOptions = {
    autoStart: true,
    cacheMode: 'preserve',
    allowNoTarget: false,
    startFresh: false
};

/**
 * @typedef mockContextType
 * @property {Map<string,mockObjectType>} registeredMocks - Registered mocks.
 * @property {function(string, Object<string,any>, boolean): *} originalLoader - Original loader.
 * @property {Object<string,*>} originalCache - Original cache.
 * @property {Map<string,Object<string,*>>} virtualModules - Virtual modules tree. TODO: JSDoc virtualModules.
 * @property {mockOptionsType} options - Options.
 */

/** @type {mockContextType} */
const context = {
    registeredMocks: new Map(),
    originalLoader: null,
    originalCache: null,
    virtualModules: new Map(),
    options: defaultOptions
};

/**
 * @typedef mockRegisterOptions
 * @property {(RegExp|string)} [target] - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [requester] - Requester pattern.
 * @property {function(): *} [refresher] - Refresher function.
 */

/**
 * @description Gets key based on request and options.
 * @param {(RegExp|string)} request - Request.
 * @param {mockRegisterOptions} [options] - Options.
 * @returns {string} Key.
 */
function getKey(request, options) {
    const key = [];
    if (typeof request === 'string') {
        key.push(request);
    } else {
        key.push(request.toString());
    }
    if (options) {
        Object.keys(options).forEach((k) => {
            const val = options[k];
            if (typeof val === 'function') {
                return;
            }
            if (val) {
                if (typeof val === 'string') {
                    key.push(val);
                } else {
                    key.push(val.toString());
                }
            }
        });
    }
    return key.join('%');
}

/**
 * @description Checks value against passed pattern.
 * @param {string} value - Value.
 * @param {(RegExp|string)} pattern - Pattern.
 * @returns {boolean} Result.
 */
function checkAgainstPattern(value, pattern) {
    if (typeof pattern === 'string') {
        return value === pattern;
    } else {
        return pattern.test(value);
    }
}

/**
 * @description Tests module filename against mock objects and returns the first one whose conditions have been matched.
 * @param {string} filename - Filename.
 * @param {string} [currentRequest] - Current request.
 * @returns {(mockObjectType|null)} Matched mock object or null.
 */
function getMatchedMockObject(filename, currentRequest) {
    const virtualModule = context.virtualModules.get(filename);
    const cachedModule = Module._cache[filename];
    const mockObjectsArray = Array.from(context.registeredMocks.values());

    for (let i = 0; i < mockObjectsArray.length; i++) {
        const mockObject = mockObjectsArray[i];

        if (
            !mockObject.target &&
            !mockObject.ignore &&
            !context.options.allowNoTarget
        ) {
            continue;
        }

        if (mockObject.target) {
            if (!checkAgainstPattern(filename, mockObject.target)) {
                continue;
            }
        }

        if (mockObject.ignore) {
            if (checkAgainstPattern(filename, mockObject.ignore)) {
                continue;
            }
        }

        if (mockObject.requester) {
            let passed = false;
            let current = virtualModule;

            // TODO: HANDLE CIRCULAR REFERENCES.
            while (current) {
                if (
                    checkAgainstPattern(current.filename, mockObject.requester)
                ) {
                    passed = true;
                    break;
                }
                // CURRENT MODULE LOAD STACK SHOULD BE OBTAINED BY TRAVERSING VIRTUAL TREE USING LATEST INSERTED PARENT.
                current = Array.from(current.parents.values()).pop();
            }

            if (!passed) {
                continue;
            }
        }

        if (currentRequest) {
            if (!checkAgainstPattern(currentRequest, mockObject.request)) {
                continue;
            }
        } else {
            let children = [];

            if (virtualModule.children.size) {
                children = Array.from(virtualModule.children.values());
            } else if (cachedModule && cachedModule.children.length) {
                // THIS ARE ONLY THE CHILDREN MODULES THAT HAVE BEEN REQUIRED FOR THE FIRST TIME BY THE CURRENT MODULE, BUT IS THE BEST ALTERNATIVE BEFORE CLEARING CACHE.
                children = cachedModule.children;
            }

            if (
                !children.some((child) => {
                    return checkAgainstPattern(
                        child.filename,
                        mockObject.request
                    );
                })
            ) {
                continue;
            }
        }

        return mockObject;
    }

    return null;
}

/**
 * @description Creates a new virtual module if needed and populates module virtual tree accordingly.
 * @param {(Object<string,*>|string)} input - Module object or filename.
 * @param {Object<string,*>} [parent] - Parent module.
 * @returns {Object<string,*>} Virtual module.
 */
function createVirtualModule(input, parent) {
    let isModule = null;
    let filename = '';

    if (typeof input === 'object') {
        isModule = true;
        filename = input.filename;
    } else {
        isModule = false;
        filename = input;
    }

    const output = context.virtualModules.get(filename) || {
        filename,
        module: null,
        parents: new Set([parent || null]),
        children: new Set()
    };

    if (isModule && !output.module) {
        output.module = input;
    }

    if (parent) {
        const virtualParent = createVirtualModule(parent);

        // DELETE AND RE-ADD SO SET VALUES ARE ALWAYS ORDERED BY REQUEST TIME.

        virtualParent.children.delete(output);
        virtualParent.children.add(output);

        output.parents.delete(virtualParent);
        output.parents.add(virtualParent);
    }

    context.virtualModules.set(filename, output);

    return output;
}

/**
 * @description The loader replacement that is used when hooking is enabled.
 * @param {string} rawRequest - Raw request.
 * @param {Object<string,any>} requesterModule - Requester module.
 * @param {boolean} isMain - Is main.
 * @returns {*} Loaded module exports.
 */
function customLoader(rawRequest, requesterModule, isMain) {
    let resolvedRequest = '';
    let resolveError = null;
    try {
        resolvedRequest = Module._resolveFilename(rawRequest, requesterModule);
    } catch (err) {
        resolveError = err;
        resolvedRequest = rawRequest;
    }

    createVirtualModule(resolvedRequest, requesterModule);

    const mockObject = getMatchedMockObject(
        requesterModule.filename,
        resolvedRequest
    );

    if (mockObject) {
        if (mockObject.refresher) {
            if (mockObject.shouldRefresh) {
                mockObject.exports = mockObject.refresher();
            }
            mockObject.shouldRefresh = true;
        }
        return mockObject.exports;
    }

    if (resolveError) {
        throw resolveError;
    }

    const savedCacheEntry = Module._cache[resolvedRequest];

    let isLoadingTarget = !!getMatchedMockObject(resolvedRequest);

    if (isLoadingTarget) {
        if (context.options.cacheMode !== 'enable') {
            delete Module._cache[resolvedRequest];
        }
    }

    // REMEMBER THAT MODULE LOADING IS RECURSIVE. ORIGINAL LOADER WILL MOST LIKELY TRIGGER ADDITIONAL CUSTOM LOADER CALLS FOR NESTED MODULES.
    const exports = context.originalLoader(rawRequest, requesterModule, isMain);

    if (!isLoadingTarget) {
        // IF FIRST CHECK WAS NEGATIVE, WE NEED TO RE-CHECK AFTER NESTED MODULE RESOLUTION TOOK PLACE, SO WE ALLOW VIRTUAL MODULE CHILDREN SET TO BE POPULATED.
        isLoadingTarget = !!getMatchedMockObject(resolvedRequest);
    }

    if (isLoadingTarget) {
        if (context.options.cacheMode === 'disable') {
            delete Module._cache[resolvedRequest];
        } else if (context.options.cacheMode === 'preserve') {
            Module._cache[resolvedRequest] = savedCacheEntry;
        }
    }

    return exports;
}

/**
 * @typedef mockOptionsUserType
 * @property {boolean} [autoStart=true] - Auto start hooking based on mock registrations.
 * @property {('enable'|'disable'|'preserve')} [cacheMode='preserve'] - Cache mode.
 * @property {boolean} [allowNoTarget=false] - Allow no target to be specified.
 * @property {boolean} [startFresh] - Start with a fresh cache.
 */

/**
 * @description Set mock options.
 * @param {mockOptionsUserType} [options] - Options.
 * @returns {void} Void.
 */
function config(options) {
    if (options) {
        for (const key in options) {
            if (!Object.hasOwnProperty.call(options, key)) {
                continue;
            }
            context.options[key] = options[key];
        }
    }
}

/**
 * @description Enable hooking.
 * @returns {void} Void.
 */
function enable() {
    if (context.originalLoader) {
        return;
    }

    context.originalCache = Module._cache;
    Module._cache = {};

    if (context.options.startFresh) {
        copyCacheNative(context.originalCache, Module._cache);
    } else {
        copyCacheAll(context.originalCache, Module._cache);
    }

    context.originalLoader = Module._load;
    Module._load = customLoader;
}

/**
 * @description Disable hooking.
 * @returns {void} Void.
 */
function disable() {
    if (!context.originalLoader) {
        return;
    }

    copyCacheNative(Module._cache, context.originalCache);
    Module._cache = context.originalCache;
    context.originalCache = null;

    Module._load = context.originalLoader;
    context.originalLoader = null;
}

/**
 * @description If the clean cache option is in effect, reset the current cache to an empty state.
 * @returns {void} Void.
 */
function clearCache() {
    if (context.originalCache) {
        Module._cache = {};
        copyCacheNative(context.originalCache, Module._cache);
    }
}

/**
 * @typedef registerMockReturnType
 * @property {function(): void} unregister - Unregister.
 * @property {function(*): void} refresh - Refresh.
 */

/**
 * @description Register a mock object.
 * @param {(RegExp|string)} request - Request.
 * @param {*} exports - Mock exports.
 * @param {mockRegisterOptions} [options] - Options.
 * @returns {registerMockReturnType} Mock utilities.
 */
function registerMock(request, exports, options = {}) {
    const key = getKey(request, options);

    const mockObject = {
        ...options,
        exports,
        request,
        shouldRefresh: false
    };

    context.registeredMocks.set(key, mockObject);

    if (context.options.autoStart) {
        enable();
    }

    return {
        unregister: unregisterMock.bind(null, request, options),
        /**
         * @description Refresh exports.
         * @param {*} newExports - New exports.
         */
        refresh(newExports) {
            mockObject.exports = newExports;
            mockObject.shouldRefresh = false;
        }
    };
}

/**
 * @description Unregister a mock object.
 * @param {(RegExp|string)} request - Request.
 * @param {mockRegisterOptions} [options] - Options.
 * @returns {void} Void.
 */
function unregisterMock(request, options) {
    context.registeredMocks.delete(getKey(request, options));

    if (context.options.autoStart && !context.registeredMocks.size) {
        disable();
    }
}

/**
 * @description Unregister all mock objects.
 * @returns {void} Void.
 */
function unregisterAll() {
    context.registeredMocks.clear();
    disable();
}

/**
 * @description Copies native addons from source to target cache.
 * @param {Object<string,*>} source - Source.
 * @param {Object<string,*>} target - Target.
 * @returns {void} Void.
 */
function copyCacheNative(source, target) {
    Object.keys(source).forEach((k) => {
        if (k.indexOf('.node') > -1 && !target[k]) {
            target[k] = source[k];
        }
    });
}

/**
 * @description Copies all entries from source to target cache.
 * @param {Object<string,*>} source - Source.
 * @param {Object<string,*>} target - Target.
 * @returns {void} Void.
 */
function copyCacheAll(source, target) {
    Object.keys(source).forEach((k) => {
        if (!target[k]) {
            target[k] = source[k];
        }
    });
}

/**
 * @typedef mockRequireOptions
 * @property {boolean} [clearCache=false] - Clear cache before start loading.
 * @property {boolean} [autoClean=true] - Automatically unregister mock objects after loading finishes.
 */

// TODO: AUTO GET requesterModule SOMEHOW? THIS WOULD HAVE TO BE AN INDEPENDENT MODULE, SELF CLEARING FROM CACHE (SEE proxyquire), RECURSE FROM process.mainModule TO module.filename AND GET PARENT. DO ONLY WHEN NO requesterModule PASSED. MAKE requesterModule OPTIONAL AND PLACE INSIDE options.
/**
 * @description Requires module while automatically applying specified mocks.
 * @param {string} id - Path.
 * @param {(Object<string,*>|Array<mockObjectType>)} mocks - Mocks.
 * @param {Object<string,*>} requesterModule - Requester module.
 * @param {mockRequireOptions} [options] - Options.
 * @returns {*} Module.
 */
function require(id, mocks, requesterModule, options) {
    const toUnregister = [];

    if (!options) {
        options = {
            clearCache: false,
            autoClean: true
        };
    } else {
        options.clearCache =
            typeof options.clearCache === 'boolean'
                ? options.clearCache
                : false;
        options.autoClean =
            typeof options.autoClean === 'boolean' ? options.autoClean : true;
    }

    if (Array.isArray(mocks)) {
        mocks.forEach((mockObject) => {
            const {request, exports, ...options} = mockObject;
            toUnregister.push(registerMock(request, exports, options));
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

    if (options && options.clearCache) {
        clearCache();
    }

    const requiredModule = requesterModule.require(id);

    if (options && options.autoClean) {
        toUnregister.forEach((mockUtils) => mockUtils.unregister());
    }

    return requiredModule;
}

const mock = {
    config,
    enable,
    disable,
    clearCache,
    registerMock,
    unregisterMock,
    unregisterAll,
    require
};

export {mock};
