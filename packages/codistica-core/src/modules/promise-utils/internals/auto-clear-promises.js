/** @module core/modules/auto-clear-promises */

import {getValuesArray} from '../../object-utils/internals/get-values-array.js';
import {createStatePromise} from './create-state-promise.js';

/**
 * @description Tracks and clears resolved promises.
 * @param {(Array<Promise<*>>|Object<string,Promise<*>>)} promises - Promises.
 * @param {function(): void} [callback] - Callback.
 * @returns {void} Void.
 */
function autoClearPromises(promises, callback) {
    let promisesArray = [];

    if (Array.isArray(promises)) {
        promisesArray = promises;
    } else {
        promisesArray = getValuesArray(promises);
    }

    /**
     * @description Promise handler.
     * @returns {void} Void.
     */
    const handler = function handler() {
        let remainingPromises = null;
        if (Array.isArray(promises)) {
            let i = 0;
            while (i < promises.length) {
                const promise = (promises[i] = createStatePromise(promises[i]));
                if (!promise.isPending || !promise.isPending()) {
                    promises.splice(i, 1);
                } else {
                    i++;
                }
            }
            remainingPromises = promises.length;
        } else {
            for (const i in promises) {
                if (!Object.hasOwnProperty.call(promises, i)) {
                    continue;
                }
                const promise = (promises[i] = createStatePromise(promises[i]));
                if (!promise.isPending || !promise.isPending()) {
                    delete promises[i];
                }
            }
            remainingPromises = Object.getOwnPropertyNames(promises).length;
        }
        if (!remainingPromises && callback) {
            callback();
        }
    };

    promisesArray.forEach((promise) => {
        promise.then(handler).catch(handler);
    });
}

export {autoClearPromises};
