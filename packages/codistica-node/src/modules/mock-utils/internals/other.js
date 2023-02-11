/** @module node/modules/mock */

import {log} from '@codistica/core';
import {Module} from './module.js';

// TODO: CHECK 'target' MEANING/USAGE.
// TODO: REPLACE requester WITH maxDepth

// TODO: ENABLE FULL LOG SUPPORT! (BY ADDING log TO SAFELIST?)

// TODO: ADD ENTIRE MOCK SUITE TO SAFELIST!

// TODO: REMEMBER TO CLEAN REFERENCES FROM REAL MODULE TREE (?). DURING CACHE CLEAN AND AFTER NORMALLY LOADING A TARGET MODULE. (SEE MOCKERY SOURCE CODE. DO BETTER). REMOVE MODULES WHEN CLEARED FROM CACHE? GO FROM main? OR SAVE "toBeCleaned" MODULES ON THE WAY?

// TODO: CONSIDER ALL LOADING CASES AND COMBINATIONS (LAZY AND NORMAL require, ASYNC import, STATIC import...).

// TODO: LAZY/DYNAMIC LOADING SHOULD NOT CAUSE PROBLEMS AS THEY ARE EXECUTED LATER IN RUNTIME. WE WILL NOT HAVE STACKS FOR THEM, BUT WE WILL HAVE module AND rawRequest (request). HANDLE THAT LIMITATION AS BETTER AS POSSIBLE AND DOCUMENT IT.

// TODO: ADD OPTION TO USE rawRequest (request) INSTEAD OF resolvedRequest (filename) FOR request PATTERN?

// TODO: RUN CURRENT CACHE AGAINST NEW MOCK ON REGISTRATION, IGNORING REQUEST/CHILDREN, CLEARING MATCHED ENTRIES. (MAKE CONFIGURABLE)

// TODO: TRY require.cache INSTEAD OF Module._cache, IMPLEMENT BOTH IF IT WORKS (PRIORITY TO Module._cache).

// TODO: REPLACE Module._resolveFilename WITH resolve PACKAGE OR SIMILAR?

// TODO: PRINT SUGGESTION OF EARLY MOCK ENABLING.

// TODO: WHAT TO DO WITH CACHE AND OTHER INTERNAL STRUCTURES WHEN REGISTERING A NEW MOCK?

// TODO: CHECK request/id/filename/identifier USAGE

// TODO: ADD virtualModules UTILS? isChild? isParent? ...

// TODO: ALIGN/CHECK JSDOCS

// TODO: REVIEW CACHE MODES

// TODO: COMMENT EXAMPLES ABOUT TARGETING LEVELS (EX: target ONLY MOCKS FIRST LEVEL)

// TODO: ONLY CLEAR INTERESTED MODULES? AUTO RESOLVE MODULE POISONING?

// TODO: ADD TESTS FOR 2nd AND MULTIPLE LEVEL POISONING?

// TODO: FINISH SPLITTING IN SEPARATE FILES

// TODO: COLLECT POISONED MODULES AND CLEAN ON REGISTER AND UNREGISTER. FIRST DEFINE WHAT IS A POISONED MODULE.

// TODO: OPTIONALLY ALLOW "ONLINE PATCHING". CHANGE exports VALUE WITHOUT HAVING TO REQUIRE MODULE AGAIN.

// TODO: DOCUMENT PROXY LIMITATIONS (own non-configurable, non-writable properties). SUGGEST NON SWAPPABLE EXPORTS STRATEGY.

/**
 * @typedef mockTypeInternal
 * @property {*} exportsMock - Mock exports source.
 * @property {*} exportsOriginal - Mock exports originals (fallback).
 * @property {*} exportsProxy - Mock exports proxy.
 * @property {*} exports - Mock exports.
 * @property {(RegExp|string)} request - Request pattern.
 * @property {(RegExp|string)} target - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [requester] - Requester pattern.
 */

/**
 * @typedef moduleType
 * @property {string} id - The identifier for the module. Typically, this is the fully resolved filename.
 * @property {string} filename - The fully resolved filename of the module.
 * @property {Array<moduleType>} children - The module objects required for the first time by this one.
 * @property {*} exports - Module exports.
 * @property {boolean} isPreloading - Is 'true' if the module is running during the Node.js preload phase.
 * @property {boolean} loaded - Whether the module is done loading, or is in the process of loading.
 * @property {string} path - The directory name of the module.
 * @property {Array<string>} paths - The search paths for the module.
 * @property {function(string): *} require - Require a module as if it were required from inside this one.
 */

/**
 * @typedef virtualModuleType
 * @property {string} filename - Original module's fully resolved filename.
 * @property {(moduleType|null)} module - Original module's instance.
 * @property {boolean} exists - Whether the module exists or not in the filesystem.
 * @property {Set<(virtualModuleType|null)>} _parents - Virtual module's parents (private).
 * @property {Array<(virtualModuleType|null)>} parents - Virtual module's parents.
 * @property {(virtualModuleType|null)} parent - Virtual module's last parent.
 * @property {Set<(virtualModuleType)>} _children - Virtual module's children (private).
 * @property {Array<virtualModuleType>} children - Virtual module's children.
 * @property {virtualModuleType} child - Virtual module's last child.
 */

/**
 * @typedef mockConfigTypeOptional
 * @property {boolean} [auto] - Enables auto-start and auto-stop hooking based on mock registrations.
 * @property {('enable'|'disable'|'preserve')} [cacheMode] - Cache mode.
 * @property {Array<(RegExp|string)>} [cacheSafeList] - List of module patterns to always keep in cache.
 */

/**
 * @typedef mockConfigType
 * @property {boolean} auto - Enables auto-start and auto-stop hooking based on mock registrations.
 * @property {('enable'|'disable'|'preserve')} cacheMode - Cache mode.
 * @property {Array<(RegExp|string)>} cacheSafeList - List of module patterns to always keep in cache.
 */

/** @type {mockConfigType} */
const defaultConfig = {
    auto: true,
    cacheMode: 'preserve',
    cacheSafeList: []
};

/**
 * @typedef mockContextType
 * @property {Map<string,mockTypeInternal>} mocks - Registered mocks.
 * @property {function(string, (moduleType|null), boolean): *} originalLoader - Original module loader.
 * @property {Object<string,moduleType>} originalCache - Original module cache.
 * @property {Map<string,virtualModuleType>} virtualModules - Virtual modules map.
 * @property {mockConfigType} config - Config.
 */

/** @type {mockContextType} */
const context = {
    mocks: new Map(),
    originalLoader: null,
    originalCache: null,
    virtualModules: new Map(),
    config: defaultConfig
};

const syms = {
    init: Symbol('syms-init'),
    null: Symbol('syms-null')
};

/**
 * @description Generates a deterministic string key based on passed request and options.
 * @param {(RegExp|string)} request - Request pattern.
 * @param {Object<string,*>} [options] - Options.
 * @returns {string} Generated key.
 */
function getKey(request, options) {
    const key = [];

    if (typeof request === 'string') {
        key.push(request);
    } else {
        key.push(request.toString());
    }

    if (options) {
        Object.values(options).forEach((v) => {
            if (v) {
                if (typeof v === 'string') {
                    key.push(v);
                } else {
                    key.push(v.toString());
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
function check(value, pattern) {
    if (typeof pattern === 'string') {
        return pattern === value;
    } else {
        return pattern.test(value);
    }
}

/**
 * @description Tests request against mocks and returns the first match.
 * @param {(string|null)} request - Request.
 * @param {string} target - Requester filename.
 * @returns {(mockTypeInternal|null)} Matched mock or null.
 */
function getMatchingMock(request, target) {
    // TODO: REVIEW.
    const targetVirtualModule = virtualModule({filename: target});

    const mocks = Array.from(context.mocks.values());

    for (const mock of mocks) {
        if (mock.target !== '*' && !check(target, mock.target)) {
            continue;
        }

        if (mock.ignore) {
            if (check(target, mock.ignore)) {
                continue;
            }
        }

        if (mock.requester) {
            // TODO: CREATE isChild FUNCTION?
            let passed = false;
            let current = targetVirtualModule;

            // TODO: HANDLE CIRCULAR REFERENCES.
            while (current) {
                if (check(current.filename, mock.requester)) {
                    passed = true;
                    break;
                }
                // CURRENT MODULE LOAD STACK SHOULD BE OBTAINED BY TRAVERSING VIRTUAL TREE USING LATEST INSERTED PARENT
                current = current.parent;
            }

            if (!passed) {
                continue;
            }
        }

        if (request) {
            if (!check(request, mock.request)) {
                continue;
            }
        } else {
            // TODO: RETHINK/MOVE THIS BRANCH, THEN MOVE UP mock.request CHECK
            // TODO: SKIP IF VALID TARGET AFTER target/ignore?
            // TODO: CREATE hasChild FUNCTION?
            let children = [];

            const requesterCachedModule = Module._cache[target];

            if (targetVirtualModule.children.length) {
                children = targetVirtualModule.children;
            } else if (
                requesterCachedModule &&
                requesterCachedModule.children.length
            ) {
                // THESE ARE ONLY THE CHILDREN MODULES THAT HAVE BEEN REQUIRED FOR THE FIRST TIME BY THE CURRENT MODULE, BUT IS THE BEST ALTERNATIVE BEFORE CLEARING CACHE.
                children = requesterCachedModule.children;
            }

            if (
                !children.some((child) => {
                    return check(child.filename, mock.request);
                })
            ) {
                continue;
            }
        }

        return mock;
    }

    return null;
}

/**
 * @description Tests if passed filename corresponds to a targeted module.
 * @param {string} filename - Module filename.
 * @returns {boolean} Result.
 */
function isTargetModule(filename) {
    return !!getMatchingMock(null, filename);
}

function createExportsProxy(exportsOriginal, exportsMock) {
    // TODO: TEST ALL CASES... ESM, CJS, NON OBJECT EXPORTS, ESM default EXPORTS...
    // TODO: ALLOW TO BYPASS exportsMock (USE ONLY FALLBACK (undefined IN CASE OF NON EXISTENT)) WITH A METHOD. THIS SHOULD HELP BUT NOT REPLACE PROPER CLEANUP (SEE NOTES)

    if (!(exportsOriginal instanceof Object && exportsMock instanceof Object)) {
        return syms.null;
    }

    const getSource = (obj, key) => {
        const desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc && !desc.configurable && !desc.writable) {
            return obj;
        }

        return key in exportsMock ? exportsMock : obj;
    };

    return new Proxy(exportsOriginal, {
        apply(...args) {
            console.log('PROXY - apply', ...args);
            return Reflect.apply(...args);
        },

        construct(...args) {
            console.log('PROXY - construct', ...args);
            return Reflect.construct(...args);
        },

        defineProperty(...args) {
            console.log('PROXY - defineProperty', ...args);
            return Reflect.defineProperty(...args);
        },

        deleteProperty(...args) {
            console.log('PROXY - deleteProperty', ...args);
            return Reflect.deleteProperty(...args);
        },

        /**
         * @description Getter: get trap.
         * @param {Object<string,*>} obj - Object.
         * @param {(string|symbol)} key - Key.
         * @returns {*} Value.
         */
        get(obj, key) {
            const source = getSource(obj, key);
            const value = source[key];

            console.log(
                'PROXY - GET',
                Object.keys(source).length > 5 ? '[OBJECT]' : source,
                key
            );

            if (value instanceof Function) {
                return function (...args) {
                    return value.apply(source, args);
                };
            }

            return value;
        },

        getOwnPropertyDescriptor(obj, prop) {
            const source = getSource(obj, prop);
            console.log('PROXY - getOwnPropertyDescriptor', source, prop);
            return Reflect.getOwnPropertyDescriptor(source, prop);
        },

        getPrototypeOf(obj) {
            console.log('PROXY - getPrototypeOf', {...obj, ...exportsMock});
            return Reflect.getPrototypeOf({...obj, ...exportsMock});
        },

        has(...args) {
            console.log('PROXY - has', ...args);
            return Reflect.has(...args);
        },

        isExtensible(...args) {
            console.log('PROXY - isExtensible', ...args);
            return Reflect.isExtensible(...args);
        },

        ownKeys(obj) {
            console.log('PROXY - ownKeys', {...obj, ...exportsMock});
            return Reflect.ownKeys({...obj, ...exportsMock});
        },

        preventExtensions(...args) {
            console.log('PROXY - preventExtensions', ...args);
            return Reflect.preventExtensions(...args);
        },

        /**
         * @description Setter: set trap.
         * @param {Object<string,*>} obj - Object.
         * @param {(string|symbol)} key - Key.
         * @param {*} value - Value.
         * @returns {boolean} Result.
         */
        set(obj, key, value) {
            const source = getSource(obj, key);
            console.log(
                'PROXY - SET',
                Object.keys(source).length > 5 ? '[OBJECT]' : source,
                key
            );
            source[key] = value;
            return true;
        },

        setPrototypeOf(...args) {
            console.log('PROXY - setPrototypeOf', ...args);
            return Reflect.setPrototypeOf(...args);
        }
    });
}

/**
 * @typedef virtualModuleBaseType
 * @property {string} filename - Filename.
 * @property {null} [module] - Module.
 * @property {(moduleType|null)} [parent] - Parent.
 * @property {boolean} [exists] - Whether the module exists or not in the filesystem.
 */

/** @typedef {(virtualModuleBaseType|moduleType|virtualModuleType|null)} virtualModuleDataType */

/**
 * @description Creates a new virtual module or updates and returns an existing one.
 * @param {virtualModuleDataType} data - Virtual module data.
 * @returns {(virtualModuleType|null)} Virtual module.
 */
function virtualModule(data) {
    if (!data) {
        return null;
    }

    const output = context.virtualModules.get(data.filename) || {
        filename: data.filename,
        module: null,
        exists: 'exists' in data ? data.exists : true,
        _parents: new Set(),
        /**
         * @description Getter: Parents.
         * @returns {Array<(virtualModuleType|null)>} Parents.
         */
        get parents() {
            return Array.from(this._parents.values());
        },
        /**
         * @description Getter: Parent.
         * @returns {(virtualModuleType|null)} Parent.
         */
        get parent() {
            return this.parents.pop();
        },
        /**
         * @description Setter: Parent.
         * @param {(virtualModuleType|null)} p - Parent.
         * @returns {void} Void.
         */
        set parent(p) {
            if (!p) {
                if (!this.parents.length) {
                    this._parents.add(null);
                }
            } else {
                if (this.parent !== p) {
                    // DELETE AND RE-ADD SO SET VALUES ARE ALWAYS ORDERED BY REQUEST TIME
                    this._parents.delete(p);
                    this._parents.add(p);

                    // UPDATE PARENT'S CHILDREN
                    p.child = this;
                }
            }
        },
        _children: new Set(),
        /**
         * @description Getter: Children.
         * @returns {Array<virtualModuleType>} Children.
         */
        get children() {
            return Array.from(this._children.values());
        },
        /**
         * @description Getter: Child.
         * @returns {virtualModuleType} Child.
         */
        get child() {
            return this.children.pop();
        },
        /**
         * @description Setter: Child.
         * @param {virtualModuleType} c - Child.
         * @returns {void} Void.
         */
        set child(c) {
            if (this.child !== c) {
                // DELETE AND RE-ADD SO SET VALUES ARE ALWAYS ORDERED BY REQUEST TIME
                this._children.delete(c);
                this._children.add(c);

                // UPDATE CHILD'S PARENTS
                c.parent = this;
            }
        }
    };

    if ('parent' in data && data.module === null) {
        output.parent = virtualModule(data.parent);
    }

    if ('module' in data && data.module) {
        output.module = data.module;
    }

    context.virtualModules.set(output.filename, output);

    return output;
}

/**
 * @description Resolve requested module filename.
 * @param {string} request - Request.
 * @param {(moduleType|null)} parent - Parent module.
 * @returns {{filename: string, err: Object<string,*>}} Result.
 */
function resolve(request, parent) {
    try {
        return {
            filename: Module._resolveFilename(request, parent),
            err: null
        };
    } catch (err) {
        return {
            filename: request,
            err
        };
    }
}

/**
 * @description The loader replacement that is used when hooking is enabled.
 * @param {string} request - Request.
 * @param {(moduleType|null)} parent - Parent module.
 * @param {boolean} isMain - Is parent module the main module.
 * @returns {*} Loaded module exports.
 */
function customLoader(request, parent, isMain) {
    /*
     * BE CAREFUL USING DEPENDENCIES BEFORE CALLING ORIGINAL LOADER.
     * THERE IS A RISK OF UNCONTROLLED RECURSION.
     * // TODO: CHECK THIS
     */

    if (isNativeModule(request)) {
        return context.originalLoader(request, parent, isMain);
    }

    const {filename, err} = resolve(request, parent);

    const exists = !err;

    // SHOULD BE CALLED AS SOON AS POSSIBLE TO START POPULATING THE VIRTUAL MODULE TREE
    virtualModule({filename, module: null, exists, parent});

    const mock = getMatchingMock(filename, parent.filename);

    if (mock) {
        if (!mock.exportsOriginal) {
            if (
                exists &&
                (filename.endsWith('.js') ||
                    filename.endsWith('.cjs') ||
                    filename.endsWith('.mjs') ||
                    filename.endsWith('.json'))
            ) {
                console.log('LOADING ORIGINAL EXPORTS', request);
                mock.exportsOriginal = context.originalLoader(
                    request,
                    parent,
                    isMain
                );
            } else {
                if (mock.exportsMock instanceof Object) {
                    console.log(
                        'ASSIGNING EMPTY OBJECT TO EXPORTS ORIGINAL',
                        request
                    );
                    mock.exportsOriginal = new mock.exportsMock.constructor();
                } else {
                    console.log('ASSIGNING null TO EXPORTS ORIGINAL', request);
                    mock.exportsOriginal = null;
                }
            }
        }

        if (mock.exportsProxy === syms.init) {
            console.log('CREATING PROXY', request);
            mock.exportsProxy = createExportsProxy(
                mock.exportsOriginal,
                mock.exportsMock
            );
        }

        return mock.exports;
    }

    // RE-THROW RESOLVING ERROR IF NO MOCK IS FOUND
    if (err) {
        throw err;
    }

    // CONTINUE LOADING

    const cached = Module._cache[filename];

    let isLoadingTarget = isTargetModule(filename); // TODO: THIS IS TO AVOID 1st LEVEL MODULE POISONING, BUT DOES NOT REMOVE THE WHOLE PROBLEM

    // TODO: THIS IS TO AVOID 1st LEVEL MODULE POISONING, BUT DOES NOT REMOVE THE WHOLE PROBLEM
    if (isLoadingTarget) {
        if (context.config.cacheMode !== 'enable') {
            delete Module._cache[filename];
        }
    }

    // REMEMBER THAT MODULE LOADING IS RECURSIVE. ORIGINAL LOADER WILL MOST LIKELY TRIGGER ADDITIONAL CUSTOM LOADER CALLS FOR NESTED MODULES.
    // ORIGINAL LOADER WILL GET/SET CACHE ACCORDINGLY
    const exp = context.originalLoader(request, parent, isMain);

    // UPDATE VIRTUAL MODULE WITH ORIGINAL MODULE FROM CACHE
    virtualModule({filename, module: Module._cache[filename]});

    // TODO: THIS IS TO AVOID 1st LEVEL MODULE POISONING, BUT DOES NOT REMOVE THE WHOLE PROBLEM
    if (!isLoadingTarget) {
        // TODO: CHECK
        // IF FIRST CHECK WAS NEGATIVE, WE NEED TO RE-CHECK AFTER NESTED MODULE RESOLUTION TOOK PLACE, SO WE ALLOW VIRTUAL MODULE CHILDREN SET TO BE POPULATED
        isLoadingTarget = isTargetModule(filename); // TODO: THIS IS TO AVOID 1st LEVEL MODULE POISONING, BUT DOES NOT REMOVE THE WHOLE PROBLEM
    }

    // TODO: THIS IS TO AVOID 1st LEVEL MODULE POISONING, BUT DOES NOT REMOVE THE WHOLE PROBLEM
    if (isLoadingTarget) {
        if (context.config.cacheMode === 'disable') {
            delete Module._cache[filename];
        } else if (context.config.cacheMode === 'preserve') {
            if (cached) {
                Module._cache[filename] = cached;
            } else {
                delete Module._cache[filename];
            }
        }
    }

    return exp;
}

/**
 * @description Set mock config.
 * @param {mockConfigTypeOptional} config - Config.
 * @returns {void} Void.
 */
function setConfig(config) {
    context.config = {
        ...context.config,
        ...config
    };
}

/**
 * @description Checks if current Node environment has required elements.
 * @returns {boolean} Check result.
 */
function checkEnv() {
    const requiredKeys = ['_load', '_cache', '_resolveFilename'];

    if (!Module) {
        log.error(
            'mock',
            `"Module" IS NOT AVAILABLE. CURRENT NODE VERSION MIGHT NOT BE SUPPORTED. ABORTING`
        )();
        return false;
    }

    for (const k of requiredKeys) {
        if (!Module[k]) {
            log.error(
                'mock',
                `MISSING "${k}" IN "Module". CURRENT NODE VERSION MIGHT NOT BE SUPPORTED. ABORTING`
            )();
            return false;
        }
    }

    return true;
}

/**
 * @description Enable hooking.
 * @param {boolean} [clearCache] - Clear cache.
 * @returns {void} Void.
 */
function enable(clearCache) {
    if (context.originalLoader || !checkEnv()) {
        return;
    }

    context.originalCache = Module._cache;
    Module._cache = {};

    if (clearCache) {
        copyCacheEssentials(context.originalCache, Module._cache);
    } else {
        copyCacheAll(context.originalCache, Module._cache);
    }

    context.originalLoader = Module._load;
    Module._load = customLoader;
}

/**
 * @description Disable hooking.
 * @param {boolean} [keepCache] - Keep cache.
 * @returns {void} Void.
 */
function disable(keepCache) {
    if (!context.originalLoader) {
        return;
    }

    if (keepCache) {
        copyCacheAll(Module._cache, context.originalCache);
    } else {
        copyCacheEssentials(Module._cache, context.originalCache);
    }

    Module._cache = context.originalCache;
    context.originalCache = null;

    Module._load = context.originalLoader;
    context.originalLoader = null;
}

/**
 * @typedef mockOptionsType
 * @property {(RegExp|string)} target - Target pattern.
 * @property {(RegExp|string)} [ignore] - Ignore pattern.
 * @property {(RegExp|string)} [requester] - Requester pattern.
 */

/**
 * @typedef registerMockReturnType
 * @property {function(): void} unregister - Unregister.
 * @property {function(*): void} setExports - Set exports.
 */

/**
 * @description Register a mock.
 * @param {(RegExp|string)} request - Request pattern.
 * @param {*} exp - Mock exports.
 * @param {mockOptionsType} options - Options.
 * @returns {(registerMockReturnType|null)} Mock utilities.
 */
function registerMock(request, exp, options) {
    if (!options.target) {
        log.warning(
            'mock',
            `MISSING "target" FOR "${request}" MOCK. SKIPPING`
        )();
        return null;
    }

    /** @type {mockTypeInternal} */
    const mock = {
        ...options,
        request,
        exportsMock: exp,
        exportsOriginal: null,
        exportsProxy: syms.init,
        /**
         * @description Getter: Exports.
         * @returns {*} Value.
         */
        get exports() {
            if (
                this.exportsProxy !== syms.init &&
                this.exportsProxy !== syms.null
            ) {
                console.log('RETURN PROXY', request);
                return this.exportsProxy;
            } else {
                console.log('RETURN MOCK', request);
                return this.exportsMock;
            }
        },
        /**
         * @description Setter: Exports.
         * @param {*} val - Value.
         * @returns {void} Void.
         */
        set exports(val) {
            throw new Error(
                'CANNOT CHANGE MOCK EXPORTS DIRECTLY. PLEASE USE "setExports" METHOD'
            );
        }
    };

    context.mocks.set(getKey(request, options), mock);

    if (context.config.auto) {
        enable();
    }

    return {
        unregister: unregisterMock.bind(null, request, options),
        /**
         * @description Set exports.
         * @param {*} newExports - New exports.
         */
        setExports(newExports) {
            mock.exportsMock = newExports;
        }
    };
}

/**
 * @description Unregister a mock.
 * @param {(RegExp|string)} request - Request pattern.
 * @param {mockOptionsType} [options] - Options.
 * @returns {void} Void.
 */
function unregisterMock(request, options) {
    context.mocks.delete(getKey(request, options));

    if (context.config.auto && !context.mocks.size) {
        disable();
    }
}

/**
 * @description Unregister all mocks.
 * @returns {void} Void.
 */
function unregisterAll() {
    context.mocks.clear();
    disable();
}

/**
 * @description Checks if passed filename corresponds to a Node Native Module.
 * @param {string} filename - Filename.
 * @returns {boolean} Result.
 */
function isNativeModule(filename) {
    return filename.endsWith('.node');
}

/**
 * @description Copies native addons and whitelisted entries.
 * @param {Object<string,moduleType>} from - From.
 * @param {Object<string,moduleType>} to - To.
 * @param {boolean} [overwrite] - Overwrite.
 * @returns {void} Void.
 */
function copyCacheEssentials(from, to, overwrite) {
    Object.keys(from).forEach((k) => {
        const isNative = isNativeModule(k);
        const isCurrentModule = k === __filename;

        const isSafe =
            context.config.cacheSafeList.findIndex((pattern) =>
                check(k, pattern)
            ) > -1;

        if ((isNative || isCurrentModule || isSafe) && (!to[k] || overwrite)) {
            to[k] = from[k];
        }
    });
}

/**
 * @description Copies all entries.
 * @param {Object<string,moduleType>} from - From.
 * @param {Object<string,moduleType>} to - To.
 * @param {boolean} [overwrite] - Overwrite.
 * @returns {void} Void.
 */
function copyCacheAll(from, to, overwrite) {
    Object.keys(from).forEach((k) => {
        if (!to[k] || overwrite) {
            to[k] = from[k];
        }
    });
}

/**
 * @description Reset the current cache to an empty state.
 * @param {boolean} [force] - If true, also original cache will be cleared.
 * @returns {void} Void.
 */
function clearCache(force) {
    if (context.originalCache) {
        Module._cache = {};
        copyCacheEssentials(context.originalCache, Module._cache);
    } else if (force) {
        const originalCache = Module._cache;
        Module._cache = {};
        copyCacheEssentials(originalCache, Module._cache);
    } else {
        log.warning(
            'Mock',
            'CANNOT CLEAR CACHE WHEN MOCKING IS NOT ENABLED. TO CLEAR NATIVE CACHE, USE force. ABORTING'
        )();
    }
}

export {
    defaultConfig,
    context,
    getKey,
    check,
    getMatchingMock,
    virtualModule,
    customLoader,
    setConfig,
    checkEnv,
    enable,
    disable,
    registerMock,
    unregisterMock,
    unregisterAll,
    copyCacheEssentials,
    copyCacheAll,
    clearCache
};
