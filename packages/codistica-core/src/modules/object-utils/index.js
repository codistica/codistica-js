import {addReadOnlyProperty} from './internals/add-read-only-property.js';
import {deepClone} from './internals/deep-clone.js';
import {forEachSync} from './internals/for-each-sync.js';
import {forEach} from './internals/for-each.js';
import {getKeys} from './internals/get-keys.js';
import {getLength} from './internals/get-length.js';
import {getValuesArray} from './internals/get-values-array.js';
import {hasKeys} from './internals/has-keys.js';
import {isArrayPath} from './internals/is-array-path.js';
import {isObject} from './internals/is-object.js';
import {isPrimitive} from './internals/is-primitive.js';
import {isPureObject} from './internals/is-pure-object.js';
import {isReference} from './internals/is-reference.js';
import {parseCircular} from './internals/parse-circular.js';
import {pathToKey} from './internals/path-to-key.js';
import {renameProperty} from './internals/rename-property.js';
import {seek} from './internals/seek.js';
import {stringToPathArray} from './internals/string-to-path-array.js';
import {stringifyCircular} from './internals/stringify-circular.js';
import {truncate} from './internals/truncate.js';

// TODO: CREATE compare() AND matches() METHODS (SAME LEVEL AS DEEP CLONE METHOD, USE STRING?)
// TODO: IMPROVE seek ARGUMENTS
// TODO: CREATE merge() METHOD
// TODO: LOG WARNING IN CASES LIKE deepClone FINDING FUNCTIONS, ETC. (WHEN SOMETHING MAY PRODUCE UNEXPECTED RESULTS)
// TODO: Use object, array and object/array TERMINOLOGY. MAKE REPLACEMENTS WHERE NEEDED.

export {
    addReadOnlyProperty,
    deepClone,
    forEachSync,
    forEach,
    getKeys,
    getLength,
    getValuesArray,
    hasKeys,
    isArrayPath,
    isObject,
    isPrimitive,
    isPureObject,
    isReference,
    parseCircular,
    pathToKey,
    renameProperty,
    seek,
    stringToPathArray,
    stringifyCircular,
    truncate
};
