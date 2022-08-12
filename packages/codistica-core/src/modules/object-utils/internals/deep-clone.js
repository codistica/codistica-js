/** @module core/modules/object-utils/deep-clone */

import {Types} from '@codistica/types';
import {log} from '../../log.js';
import {forEachSync} from './for-each-sync.js';
import {hasKeys} from './has-keys.js';
import {isPureObject} from './is-pure-object.js';
import {seek} from './seek.js';

const deepCloneTypes = new Types({
    obj: {type: '!undefined'},
    options: {
        type: 'Object',
        def: {
            copyPrototype: {type: 'boolean', def: false},
            maxDepth: {type: 'number', def: Infinity}
        }
    }
});

/**
 * @typedef deepCloneOptionsType
 * @property {boolean} [copyPrototype=false] - Copy input object prototype to cloned object.
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 */

/**
 * @description Clones the input object/array own elements one-by-one at every depth.
 * @param {(Object<string,*>|Array<*>)} obj - Object/array to be cloned.
 * @param {deepCloneOptionsType} [options] - Cloning options.
 * @returns {(Object<string,*>|null)} Cloned object/array.
 */
function deepClone(obj, options) {
    // TODO: ADD OPTION TO SKIP FUNCTIONS AND OTHER NON CLONABLE ELEMENTS. OR CLONE WITH OTHER METHODS? (STRING/EVAL?). NOT BY DEFAULT.
    // TODO: ADD reference (?) PATTERN OPTION TO COPY BY REFERENCE SPECIFIED PATHS RATHER THAN VALUE PER VALUE COPYING. (CASE WHEN WE WANT A FRESH OBJECT WITHOUT BREAKING SOME INTERNAL STRUCTURES (LIKE REFERENCED INSTANCES))

    ({obj, options} = deepCloneTypes.validate({obj, options}));

    if (!deepCloneTypes.isValid()) {
        log.error('deepClone()', 'ARGUMENTS ERROR. ABORTING')();
        return null;
    }

    const objClone = isPureObject(obj) // TODO: CHECK/FIX. COPY PROTOTYPE WHEN REQUESTED AND INPUT HAS PROTOTYPE (CHECK PROTOTYPE EXISTENCE).
        ? options.copyPrototype
            ? Object.create(obj)
            : {}
        : Array.isArray(obj)
        ? []
        : null;

    forEachSync(
        obj,
        (val, API) => {
            if (!hasKeys(val) || options.maxDepth === API.depth) {
                seek(objClone, API.path, val);
            }
        },
        {
            maxDepth: options.maxDepth,
            referenceCheck: true,
            onReference(val, refPath, API) {
                seek(objClone, API.path, seek(objClone, refPath));
            }
        }
    );

    return objClone;
}

export {deepClone};
