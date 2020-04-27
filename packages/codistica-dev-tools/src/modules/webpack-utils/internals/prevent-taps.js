/** @module dev-tools/modules/webpack-utils/prevent-taps */

import {arrayUtils, regExpUtils, log} from '@codistica/core';

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} preventTapsRawExpType */

/**
 * @typedef preventTapsTapInfoType
 * @property {string} type - Type.
 * @property {string} name - Name.
 * @property {Function} fn - Fn.
 */

/**
 * @callback preventTapsCallbackType
 * @param {preventTapsTapInfoType} tapInfo - Tap object.
 * @returns {boolean} Boolean indicating if passed tap should be prevented or not.
 */

/**
 * @typedef preventTapsOptionsType
 * @property {(preventTapsRawExpType|null)} [test=null] - Tap names to be intercepted.
 * @property {(preventTapsRawExpType|null)} [ignore=null] - Tap names to be ignored.
 * @property {*} [returnValue=undefined] - Default value for hooks expecting a returned value.
 * @property {(preventTapsCallbackType|null)} [shouldPrevent=null] - Function to dynamically determining if a tap should be prevented.
 */

/**
 * @description Utility function to prevent taps in selected hooks.
 * @param {(Object<string,*>|Array<Object<string,*>>)} hooks - Hooks to prevent taps in.
 * @param {preventTapsOptionsType} [options] - Prevention options.
 * @returns {void} Void.
 */
function preventTaps(hooks, options) {
    hooks = arrayUtils.normalize(hooks);
    options =
        typeof options === 'object'
            ? options
            : {
                  test: null,
                  ignore: null,
                  returnValue: undefined,
                  shouldPrevent: null
              };
    options.test = typeof options.test !== 'undefined' ? options.test : null;
    options.ignore =
        typeof options.ignore !== 'undefined' ? options.ignore : null;
    options.shouldPrevent =
        typeof options.shouldPrevent === 'function'
            ? options.shouldPrevent
            : null;
    hooks.forEach((hook) => {
        hook.intercept({
            register: function register(tapInfo) {
                /**
                 * @function composeFn
                 * @description Generates composed function to allow switching between real and mocked tap function.
                 * @param {Function} mockFn - Mocked tap function.
                 * @param {Function} realFn - Real tap function.
                 * @returns {Function} Composed function.
                 */
                const composeFn = function composeFn(mockFn, realFn) {
                    return function composedFn(...args) {
                        if (
                            options.shouldPrevent &&
                            !options.shouldPrevent(tapInfo)
                        ) {
                            log.info(
                                'preventTaps()',
                                `ALLOWED: ${tapInfo.name}`
                            )();
                            return realFn(...args);
                        } else {
                            log.info(
                                'preventTaps()',
                                `PREVENTED: ${tapInfo.name}`
                            )();
                            return mockFn(...args);
                        }
                    };
                };
                if (
                    (!options.test ||
                        regExpUtils.checkOne(tapInfo.name, options.test)) &&
                    regExpUtils.checkNone(tapInfo.name, options.ignore)
                ) {
                    switch (tapInfo.type) {
                        case 'promise':
                            tapInfo.fn = composeFn(
                                () => Promise.resolve(options.returnValue),
                                tapInfo.fn
                            );
                            break;
                        case 'async':
                            tapInfo.fn = composeFn(
                                (...args) =>
                                    args[args.length - 1](options.returnValue),
                                tapInfo.fn
                            );
                            break;
                        default:
                            tapInfo.fn = composeFn(
                                () => options.returnValue,
                                tapInfo.fn
                            );
                            break;
                    }
                }
                return tapInfo;
            }
        });
    });
}

export {preventTaps};
