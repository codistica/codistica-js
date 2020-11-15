/** @module node/modules/mock */

import {Module as _Module} from 'module';

// TODO: SEE ORIGINAL mockery PACKAGE. ADD MISSING FEATURES, CHECK AND IMPROVE.
// TODO: RE-EXPORT FROM @codistica/dev-tools.
// TODO: TEST FOR OPTIMIZATIONS (NUMBER OF REQUESTS HANDLED).
// TODO: WORKAROUND DEPRECATED module.parent (USE require.main AND module.children).
// TODO: LEARN HOW TO USE ITERATORS DIRECTLY (IF POSSIBLE).
// TODO: PREVENT THIS MODULE FROM DISAPPEARING FROM CACHE.
// TODO: REMEMBER TO CLEAN REFERENCES FROM MODULE TREE (?). DURING CACHE CLEAN AND AFTER NORMALLY LOADING A TARGET MODULE. (SEE MOCKERY SOURCE CODE. DO BETTER). REMOVE MODULES WHEN CLEARED FROM CACHE? GO FROM main? OR SAVE "toBeCleaned" MODULES ON THE WAY?

// TODO: CLEANUP AND COMMIT CURRENT PROGRESS.
// TODO: TRY CREATING SOME KIND OF CONTEXT FOR customLoader AND USE IT DURING RECURSION THROUGH originalLoader.
// TODO: PASS NEEDED INFORMATION UPWARDS TO HANDLE CACHE AS REQUIRED.
// TODO: CONSIDER ALL LOADING CASES AND COMBINATIONS (LAZY AND NORMAL require, ASYNC import, STATIC import...).
// TODO: LAZY/DYNAMIC LOADING SHOULD NOT CAUSE PROBLEMS AS THEY ARE EXECUTED LATER IN RUNTIME. WI WILL NOT HAVE STACKS FOR THEM, BUT WE WILL HAVE module AND request. HANDLE THAT LIMITATION AS BETTER AS POSSIBLE AND DOCUMENT IT.
// TODO: THIS COULD HELP FOR BETTER target MATCHING*, caller SUPPORT AND TREE CLEANUP.

// TODO: *TO ALLOW USING MORE GENERIC target EXPRESSIONS LIKE target: /./

/** @type {Object<string,*>} */
const Module = _Module;

/**
 * @typedef mockObjectType
 * @property {*} mock - Mock.
 * @property {(RegExp|string)} request - Request pattern.
 * @property {(RegExp|string)} [target] - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [caller] - Caller pattern.
 */

/**
 * @typedef mockOptionsType
 * @property {boolean} autoStart - Auto start hooking based on mock registrations.
 * @property {('enable'|'disable'|'preserve')} cacheMode - Cache mode.
 */

/** @type {mockOptionsType} */
const defaultOptions = {
    autoStart: true,
    cacheMode: 'preserve'
};

/**
 * @typedef mockContextType
 * @property {Map<string,mockObjectType>} registeredMocks - Registered mocks.
 * @property {function(string, Object<string,any>, boolean): *} originalLoader - Original loader.
 * @property {Object<string,*>} originalCache - Original cache.
 * @property {mockOptionsType} options - Options.
 */

/** @type {mockContextType} */
const context = {
    registeredMocks: new Map(),
    originalLoader: null,
    originalCache: null,
    options: defaultOptions
};

/**
 * @typedef mockRegisterOptions
 * @property {(RegExp|string)} [target] - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [caller] - Caller pattern.
 */

/**
 * @description Gets key based on module and options.
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
 * @description Tests path against mock object to test if matches target module conditions.
 * @param {string} filename - Filename.
 * @param {mockObjectType} mockObject - Mock object.
 * @returns {boolean} Result.
 */
function isTargetModule(filename, mockObject) {
    if (
        !mockObject.target ||
        !checkAgainstPattern(filename, mockObject.target)
    ) {
        return false;
    }

    if (mockObject.ignore && checkAgainstPattern(filename, mockObject.ignore)) {
        return false;
    }

    // TODO: CHECK caller CONDITION HERE.

    return true;
}

/**
 * @description The loader replacement that is used when hooking is enabled.
 * @param {string} request - Request.
 * @param {Object<string,any>} module - Requester module.
 * @param {boolean} isMain - Is main.
 * @returns {*} Loaded module content.
 */
function customLoader(request, module, isMain) {
    console.log('REQUESTER: ' + module.filename);
    console.log('REQUEST: ' + request);

    const mockObjectsArray = Array.from(context.registeredMocks.values());

    for (let i = 0; i < mockObjectsArray.length; i++) {
        const mockObject = mockObjectsArray[i];
        if (
            checkAgainstPattern(request, mockObject.request) &&
            isTargetModule(module.filename, mockObject)
        ) {
            console.log('MOCK LOADING\n');
            return mockObject.mock;
        }
    }

    console.log('NORMAL LOADING\n');

    const resolvedRequest = Module._resolveFilename(request, module);

    console.log('RESOLVED REQUEST: ' + resolvedRequest);

    // TODO: HERE WE ARE NOT CHECKING IF resolvedRequest MODULE MATCHES mockObject.request CONDITION, SO, FOR EX. target: /./ WILL PREVENT EVERY MODULE FROM BEING CACHED (THUS BREAKING THINGS).
    const isLoadingTarget = mockObjectsArray.some((mockObject) =>
        isTargetModule(resolvedRequest, mockObject)
    );

    console.log('IS LOADING TARGET: ' + isLoadingTarget);

    const savedCacheEntry = Module._cache[resolvedRequest];

    if (isLoadingTarget && context.options.cacheMode !== 'enable') {
        delete Module._cache[resolvedRequest];
    }

    // REMEMBER THAT MODULE LOADING IS RECURSIVE. ORIGINAL LOADER WILL MOST LIKELY TRIGGER ADDITIONAL CUSTOM LOADER CALLS FOR NESTED MODULES.
    const output = context.originalLoader(request, module, isMain);

    if (isLoadingTarget) {
        if (context.options.cacheMode === 'disable') {
            delete Module._cache[resolvedRequest];
        } else if (context.options.cacheMode === 'preserve') {
            Module._cache[resolvedRequest] = savedCacheEntry;
        }
    }

    return output;
}

/**
 * @typedef mockOptionsUserType
 * @property {boolean} [autoStart] - Auto start hooking based on mock registrations.
 * @property {('enable'|'disable'|'preserve')} [cacheMode] - Cache mode.
 */

/**
 * @description Set mock options.
 * @param {mockOptionsUserType} [options] - Options.
 * @returns {void} Void.
 */
function config(options) {
    if (options) {
        context.options.autoStart =
            typeof options.autoStart === 'boolean'
                ? options.autoStart
                : defaultOptions.autoStart;
        context.options.cacheMode =
            typeof options.cacheMode === 'string'
                ? options.cacheMode
                : defaultOptions.cacheMode;
    } else {
        context.options = defaultOptions;
    }
}

/**
 * @description Enable hooking.
 * @returns {void} Void.
 */
function enable() {
    console.log('ENABLE REQUESTED\n');
    if (context.originalLoader) {
        return;
    }

    context.originalCache = Module._cache;
    Module._cache = {};

    copyCacheAll(context.originalCache, Module._cache);

    context.originalLoader = Module._load;
    Module._load = customLoader;
}

/**
 * @description Disable hooking.
 * @returns {void} Void.
 */
function disable() {
    console.log('DISABLE REQUESTED\n');
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
        console.log('CLEAR CACHE');
        Module._cache = {};
        copyCacheNative(context.originalCache, Module._cache);
    }
}

/**
 * @description Register a mock object.
 * @param {(RegExp|string)} request - Request.
 * @param {*} mock - Mock.
 * @param {mockRegisterOptions} [options] - Options.
 * @returns {function(): void} Unregister function.
 */
function registerMock(request, mock, options = {}) {
    console.log('REGISTER');
    const key = getKey(request, options);
    context.registeredMocks.set(key, {
        mock,
        request,
        ...options
    });

    if (context.options.autoStart) {
        enable();
    }

    return () => {
        unregisterMock(request, options);
    };
}

/**
 * @description Unregister a mock object.
 * @param {(RegExp|string)} request - Request.
 * @param {mockRegisterOptions} [options] - Options.
 * @returns {void} Void.
 */
function unregisterMock(request, options) {
    console.log('UNREGISTER');
    context.registeredMocks.delete(getKey(request, options));

    if (context.options.autoStart && !context.registeredMocks.size) {
        disable();
    }
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

// TODO: AUTO GET module SOMEHOW? WOULD HAVE TO BE AN INDEPENDENT MODULE, SELF CLEARING FROM CACHE (SEE proxyquire), RECURSE FROM process.mainModule TO module.filename AND GET PARENT. DO ONLY WHEN NO module PASSED.
/**
 * @description TODO.
 * @param {string} path - Path.
 * @param {Object<string,*>} mocks - Mocks.
 * @param {Object<string,*>} module - Module.
 * @returns {*} Module.
 */
function require(path, mocks, module) {
    const toUnregister = Object.keys(mocks).map((k) => {
        return registerMock(k, mocks[k], {
            target: Module._resolveFilename(path, module)
        });
    });
    const requiredModule = module.require(path);
    toUnregister.forEach((unregisterMock) => unregisterMock());
    return requiredModule;
}

const mock = {
    config,
    enable,
    disable,
    clearCache,
    registerMock,
    unregisterMock,
    require
};

export {mock};
