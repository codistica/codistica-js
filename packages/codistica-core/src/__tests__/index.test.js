import {eventEmitterTest} from './classes/event-emitter.test.js';
import {functionCacheTest} from './classes/function-cache.test.js';
import {loadingBarTest} from './classes/loading-bar.test.js';
import {regExpsTest} from './constants/reg-exps.test.js';
import {arrayUtilsTest} from './modules/array-utils/index.test.js';
import {composeFnTest} from './modules/compose-fn.test.js';
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
        eventEmitterTest();
        functionCacheTest();
        loadingBarTest();
    });

    // CONSTANTS
    describe('Constants', () => {
        regExpsTest();
    });

    // MODULES
    describe('Modules', () => {
        arrayUtilsTest();
        composeFnTest();
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
