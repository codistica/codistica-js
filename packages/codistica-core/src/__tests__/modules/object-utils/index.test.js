import {addReadOnlyPropertyTest} from './internals/add-read-only-property.test.js';
import {deepCloneTest} from './internals/deep-clone.test.js';
import {forEachSyncTest} from './internals/for-each-sync.test.js';
import {forEachTest} from './internals/for-each.test.js';
import {getKeysTest} from './internals/get-keys.test.js';
import {getLengthTest} from './internals/get-length.test.js';
import {hasKeysTest} from './internals/has-keys.test.js';
import {isArrayPathTest} from './internals/is-array-path.test.js';
import {isObjectTest} from './internals/is-object.test.js';
import {isPrimitiveTest} from './internals/is-primitive.test.js';
import {isPureObjectTest} from './internals/is-pure-object.test.js';
import {isReferenceTest} from './internals/is-reference.test.js';
import {parseCircularTest} from './internals/parse-circular.test.js';
import {pathToKeyTest} from './internals/path-to-key.test.js';
import {prettifyTest} from './internals/prettify-test.js';
import {renamePropertyTest} from './internals/rename-property.test.js';
import {seekTest} from './internals/seek.test.js';
import {stringifyCircularTest} from './internals/stingify-circular.test.js';
import {stringToPathArrayTest} from './internals/string-to-path-array.test.js';
import {truncateTest} from './internals/truncate.test.js';

function objectUtilsTest() {
    describe('objectUtils', () => {
        addReadOnlyPropertyTest();
        deepCloneTest();
        forEachSyncTest();
        forEachTest();
        getKeysTest();
        getLengthTest();
        hasKeysTest();
        isArrayPathTest();
        isObjectTest();
        isPrimitiveTest();
        isPureObjectTest();
        isReferenceTest();
        parseCircularTest();
        pathToKeyTest();
        prettifyTest();
        renamePropertyTest();
        seekTest();
        stringifyCircularTest();
        stringToPathArrayTest();
        truncateTest();
    });
}

export {objectUtilsTest};
