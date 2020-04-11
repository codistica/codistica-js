import {regExpsTest} from './constants/reg-exps.test.js';
import {arrayUtilsTest} from './modules/array-utils/index.test.js';
import {dateUtilsTest} from './modules/date-utils/index.test.js';
import {eventUtilsTest} from './modules/event-utils/index.test.js';
import {jsonUtilsTest} from './modules/json-utils/index.test.js';
import {numberUtilsTest} from './modules/number-utils/index.test.js';
import {objectUtilsTest} from './modules/object-utils/index.test.js';
import {regExpUtilsTestTest} from './modules/reg-exp-utils/index.test.js';
import {stringUtilsTest} from './modules/string-utils/index.test.js';

describe('@codistica/core', () => {
    // CONSTANTS
    describe('Constants', () => {
        regExpsTest();
    });

    // MODULES
    describe('Modules', () => {
        arrayUtilsTest();
        dateUtilsTest();
        eventUtilsTest();
        jsonUtilsTest();
        numberUtilsTest();
        objectUtilsTest();
        regExpUtilsTestTest();
        stringUtilsTest();
    });
});
