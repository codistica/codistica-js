/** @module core/modules/object-utils/for-each */

import {Types} from '@codistica/types';
import {checkOne} from '../../reg-exp-utils/internals/check-one.js';
import {getKeys} from './get-keys.js';
import {hasKeys} from './has-keys.js';

// TODO: ACCEPT keys OPTIONS. AN ARRAY OF OBJECTS KEYS TO BE USED ON EACH ITERATION INSTEAD OF TRYING TO GET KEYS.

const rawExpSchema = {
    type: ['string', 'RegExp', 'Array<string|RegExp>'],
    def: null
};

const forEachSchema = new Types({
    root: {type: '!undefined'},
    callback: {type: 'Function'},
    options: {
        type: 'Object',
        def: {
            maxDepth: {type: 'number', def: Infinity},
            ignore: rawExpSchema,
            only: rawExpSchema,
            circularCheck: {type: 'boolean', def: false},
            onCircular: {type: ['Function', 'null'], def: null},
            referenceCheck: {type: 'boolean', def: false},
            onReference: {type: ['Function', 'null'], def: null}
        }
    }
});

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} forEachRawExpType */

/**
 * @callback forEachReplaceValueType
 * @param {*} newValue - Replacing value.
 * @param {boolean} [shouldRecurse] - Indicates if new valued should be included in the recursion queue.
 * @returns {void} Void.
 */

/**
 * @typedef forEachAPIType
 * @property {function(): void} stopCurrentRecursion - Requests to stop the current branch recursion.
 * @property {function(): void} stopGlobalRecursion - Requests to stop the whole recursion.
 * @property {forEachReplaceValueType} replaceValue - Requests to replace the current value.
 * @property {string} path - Current element object path.
 * @property {number} depth - Current element depth in object.
 */

/**
 * @callback forEachOnCircularType
 * @param {*} elem - Circular element.
 * @param {string} refPath - Path to original circular reference.
 * @param {forEachAPIType} API - Recursion API.
 * @returns {void} Void.
 */

/**
 * @callback forEachOnReferenceType
 * @param {*} elem - Reference element.
 * @param {string} refPath - Path to original reference.
 * @param {forEachAPIType} API - Recursion API.
 * @returns {void} Void.
 */

/**
 * @callback forEachCallbackType
 * @param {*} elem - Current element.
 * @param {forEachAPIType} API - Recursion API.
 * @returns {(void|Promise<void>)} Void.
 */

/**
 * @typedef forEachOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {forEachRawExpType} [ignore=null] - Expression whose matched object paths should be ignored.
 * @property {forEachRawExpType} [only=null] - Expression whose matched object paths should be the only ones to be allowed.
 * @property {boolean} [circularCheck=false] - Check for circular references and skip them.
 * @property {(forEachOnCircularType|null)} [onCircular=null] - Callback to be executed for each circular reference found.
 * @property {boolean} [referenceCheck=false] - Check for variables references and skip them.
 * @property {(forEachOnReferenceType|null)} [onReference=null] - Callback to be executed for each variable reference found.
 */

/**
 * @async
 * @description Recurse through the whole passed object executing callback for every found element.
 * @param {*} root - Starting element to be recursed.
 * @param {forEachCallbackType} callback - Function to be executed for each found element.
 * @param {forEachOptionsType} [options] - Recursion options.
 * @returns {Promise<*>} Promise. Resulting object.
 */
async function forEach(root, callback, options) {
    ({root, callback, options} = forEachSchema.validate({
        root,
        callback,
        options
    }));

    if (!forEachSchema.isValid()) {
        return null;
    }

    let globalReferenceCache = new WeakMap();
    let branchCircularCache = new WeakMap();
    let stopGlobalFlag = false;
    let stopCurrentFlag = false;
    let replaceObj = {
        shouldReplace: false,
        newValue: undefined,
        shouldRecurse: false
    };

    /**
     * @function getAPI
     * @description Get recursion API.
     * @param {string} path - Current path.
     * @param {number} depth - Current depth.
     * @returns {forEachAPIType} Recursion API.
     */
    const getAPI = function getAPI(path, depth) {
        return {
            stopCurrentRecursion() {
                stopCurrentFlag = true;
            },
            stopGlobalRecursion() {
                stopCurrentFlag = true;
                stopGlobalFlag = true;
            },
            /**
             * @description Replace value callback.
             * @param {*} newValue - New value.
             * @param {boolean} [shouldRecurse] - Should recurse.
             * @returns {void} Void.
             */
            replaceValue(newValue, shouldRecurse) {
                replaceObj.shouldReplace = true;
                replaceObj.newValue = newValue;
                replaceObj.shouldRecurse = shouldRecurse;
            },
            path,
            depth
        };
    };

    if (hasKeys(root)) {
        await callback(root, getAPI('', 0)); // INCLUDE ROOT

        // REPLACE VALUE
        if (replaceObj.shouldReplace) {
            root = replaceObj.newValue;
            if (!replaceObj.shouldRecurse) {
                return root;
            }
            replaceObj.shouldReplace = false;
            replaceObj.newValue = undefined;
            replaceObj.shouldRecurse = false;
        }

        if (options.referenceCheck) {
            globalReferenceCache.set(root, '');
        }
        if (options.circularCheck) {
            branchCircularCache.set(root, '');
        }

        if (!stopGlobalFlag && !stopCurrentFlag) {
            await recurse(root, '', 0);
        }
    }

    return root;

    /**
     * @async
     * @description Recursive function.
     * @param {*} elem - Element to be recursed.
     * @param {string} path - Current element object path.
     * @param {number} depth - Current element depth.
     * @returns {Promise<void>} Promise. Void.
     */
    async function recurse(elem, path, depth) {
        let keysArray = getKeys(elem);
        let length = keysArray.length;
        let key = null;
        let newPath = '';
        let globalReferenceCacheSet = null;
        let branchCircularCacheSet = null;

        depth++;

        // SCAN SIBLINGS
        for (let i = 0; i < length; i++) {
            if (stopGlobalFlag) {
                return;
            }

            globalReferenceCacheSet = false;
            branchCircularCacheSet = false;

            key = keysArray[i];

            // COMPOSE NEW PATH
            if (Array.isArray(elem)) {
                newPath = path + `[${key}]`;
            } else {
                newPath = path + (depth > 1 ? '.' : '') + key;
            }

            // CHECK IGNORE
            if (checkOne(newPath, options.ignore)) {
                continue;
            }

            // CHECK ONLY
            if (options.only !== null && !checkOne(newPath, options.only)) {
                continue;
            }

            if (hasKeys(elem[key])) {
                // CHECK FOR CIRCULAR REFERENCES
                if (options.circularCheck) {
                    if (branchCircularCache.has(elem[key])) {
                        stopCurrentFlag = true;
                        if (typeof options.onCircular === 'function') {
                            options.onCircular(
                                elem[key],
                                branchCircularCache.get(elem[key]),
                                getAPI(newPath, depth)
                            );
                        }
                    } else {
                        branchCircularCache.set(elem[key], newPath);
                        branchCircularCacheSet = true;
                    }
                }
                // CHECK FOR REFERENCE
                if (options.referenceCheck) {
                    if (globalReferenceCache.has(elem[key])) {
                        stopCurrentFlag = true;
                        if (typeof options.onReference === 'function') {
                            options.onReference(
                                elem[key],
                                globalReferenceCache.get(elem[key]),
                                getAPI(newPath, depth)
                            );
                        }
                    } else {
                        globalReferenceCache.set(elem[key], newPath);
                        globalReferenceCacheSet = true;
                    }
                }
                if (!stopCurrentFlag) {
                    await callback(elem[key], getAPI(newPath, depth));
                }
            } else {
                await callback(elem[key], getAPI(newPath, depth));
            }

            // REPLACE VALUE
            if (replaceObj.shouldReplace) {
                if (globalReferenceCacheSet) {
                    // REMOVE OLD ENTRY
                    globalReferenceCache.delete(elem[key]);
                }
                if (branchCircularCacheSet) {
                    // REMOVE OLD ENTRY
                    branchCircularCache.delete(elem[key]);
                }
                elem[key] = replaceObj.newValue;
                if (replaceObj.shouldRecurse) {
                    length++;
                    keysArray.push(key);
                }
                replaceObj.shouldReplace = false;
                replaceObj.newValue = undefined;
                replaceObj.shouldRecurse = false;
                continue;
            }

            if (
                !stopCurrentFlag &&
                hasKeys(elem[key]) &&
                depth < options.maxDepth
            ) {
                // GO DEEPER
                await recurse(elem[key], newPath, depth);
            } else {
                stopCurrentFlag = false;
            }

            if (branchCircularCacheSet) {
                branchCircularCache.delete(elem[key]);
            }
        }
    }
}

export {forEach};
