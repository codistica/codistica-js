import {classFunctionCacheTest} from './classes/function-cache.test.js';
import {classLoadingBarTest} from './classes/loading-bar.test.js';
import {EventEmitterTest} from './classes/event-emitter.test.js';
import {regExpsTest} from './constants/reg-exps.test.js';
import {arrayUtilsTest} from './modules/array-utils/index.test.js';
import {controlledTimeoutTest} from './modules/controlled-timeout.test.js';
import {dateUtilsTest} from './modules/date-utils/index.test.js';
import {jsonUtilsTest} from './modules/json-utils/index.test.js';
import {numberUtilsTest} from './modules/number-utils/index.test.js';
import {objectUtilsTest} from './modules/object-utils/index.test.js';
import {parsePrimitiveTest} from './modules/parse-primitive.test.js';
import {regExpUtilsTestTest} from './modules/reg-exp-utils/index.test.js';
import {stringUtilsTest} from './modules/string-utils/index.test.js';
import {stringifyPrimitiveTest} from './modules/stringify-primitive.test.js';

describe('@codistica/core', () => {
    // CLASSES
    describe('Classes', () => {
        classFunctionCacheTest();
        classLoadingBarTest();
        EventEmitterTest();
    });

    // CONSTANTS
    describe('Constants', () => {
        regExpsTest();
    });

    // MODULES
    describe('Modules', () => {
        arrayUtilsTest();
        controlledTimeoutTest();
        dateUtilsTest();
        jsonUtilsTest();
        numberUtilsTest();
        objectUtilsTest();
        regExpUtilsTestTest();
        stringUtilsTest();
        parsePrimitiveTest();
        stringifyPrimitiveTest();
    });
});
