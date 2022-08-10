/** @module core/modules/object-utils/deep-merge */

import {Types} from '@codistica/types';
import {deepClone} from './deep-clone.js';
import {forEachSync} from './for-each-sync.js';
import {hasKeys} from './has-keys.js';
import {isObject} from './is-object.js';
import {seek} from './seek.js';

const deepMergeSchema = new Types({
    source: {type: '!undefined'},
    target: {type: '!undefined'},
    options: {
        type: 'Object',
        def: {
            maxDepth: {type: 'number', def: Infinity},
            immutable: {type: 'boolean', def: false}
        }
    }
});

/**
 * @typedef deepMergeOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {boolean} [immutable=false] - Merge immutably.
 */

/**
 * @description Merges the source object/array own elements one-by-one into the target object/array at every depth.
 * @param {(Object<string,*>|Array<*>)} source - Source object/array.
 * @param {(Object<string,*>|Array<*>)} target - Target object/array.
 * @param {deepMergeOptionsType} [options] - Merging options.
 * @returns {(Object<string,*>|null)} Merged object/array.
 */
function deepMerge(source, target, options) {
    ({source, target, options} = deepMergeSchema.validate({
        source,
        target,
        options
    }));

    if (!deepMergeSchema.isValid()) {
        return null;
    }

    const mergedObject = options.immutable ? deepClone(target) : target;

    forEachSync(
        source,
        (val, API) => {
            if (!hasKeys(val) || options.maxDepth === API.depth) {
                seek(mergedObject, API.path, val, !isObject(val));
            }
        },
        {
            maxDepth: options.maxDepth,
            referenceCheck: true,
            onReference(val, refPath, API) {
                seek(mergedObject, API.path, seek(mergedObject, refPath));
            }
        }
    );

    return mergedObject;
}

export {deepMerge};