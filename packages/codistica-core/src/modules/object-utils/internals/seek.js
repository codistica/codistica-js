/** @module core/modules/object-utils/seek */

import {isArrayPath} from './is-array-path.js';
import {isObject} from './is-object.js';
import {isPureObject} from './is-pure-object.js';
import {pathToKey} from './path-to-key.js';
import {stringToPathArray} from './string-to-path-array.js';

/**
 * @description Allows getting or setting values from/to an object/array structure. Recreates indicated path structure when not already existent.
 * @param {(Object<string,*>|Array<*>)} root - The object root for seek.
 * @param {(string|Array<*>)} path - The seeked element path.
 * @param {*} [newValue] - In SET mode, the value to be written.
 * @param {boolean} [force=false] - Allow overwriting existent structure/value.
 * @returns {*} Resulting element.
 */
function seek(root, path, newValue, force) {
    // TODO: SUPPORT PUSH TO ARRAY WHEN [].
    // TODO: TODO: DISALLOW EMPTY [] WHEN GET?
    // TODO: SUPPORT MODE: DEL (DELETE) (USING delete KEYWORD).

    const pathArray = Array.isArray(path) ? path : stringToPathArray(path);
    const MODE = typeof newValue === 'undefined' ? 'GET' : 'SET';
    const length = pathArray.unshift(''); // INCLUDE ROOT
    const lastIndex = length - 1;

    let i = 0;
    let key;
    let currentElem = root;
    let currentValue = null;

    /**
     * @function setValue
     * @description Set value.
     * @param {*} value - Value to be set.
     * @returns {void} Void.
     */
    const setValue = function setValue(value) {
        if (key !== '') {
            currentElem[key] = value;
        } else {
            root = value;
        }
        currentValue = value;
    };

    force = typeof force === 'boolean' ? force : false;

    while (i < length) {
        key = pathToKey(pathArray[i]);
        currentValue = key !== '' ? currentElem[key] : currentElem;

        if (i !== lastIndex) {
            if (
                !isObject(currentValue) ||
                (isPureObject(currentValue) && isArrayPath(pathArray[i + 1])) ||
                (Array.isArray(currentValue) && !isArrayPath(pathArray[i + 1]))
            ) {
                if (MODE === 'GET') {
                    return undefined;
                } else {
                    if (typeof currentValue !== 'undefined' && !force) {
                        return null;
                    } else {
                        setValue(isArrayPath(pathArray[i + 1]) ? [] : {});
                    }
                }
            }
        } else {
            if (MODE === 'GET') {
                return currentValue;
            } else {
                if (typeof currentValue !== 'undefined' && !force) {
                    return null;
                } else {
                    setValue(newValue);
                }
            }
        }

        currentElem = currentValue;
        i++;
    }

    return root;
}

export {seek};
