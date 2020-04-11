import {deepParseIntTest} from './internals/deep-parse-int.test.js';
import {firstAvailableIntegerTest} from './internals/first-available-integer.test.js';
import {getFloorAtTest} from './internals/get-floor-at.test.js';
import {isNegativeZeroTest} from './internals/is-negative-zero.test.js';
import {isPositiveZeroTest} from './internals/is-positive-zero.test.js';
import {parseIntAllTest} from './internals/parse-int-all.test.js';

function numberUtilsTest() {
    describe('NumberUtils', () => {
        deepParseIntTest();
        firstAvailableIntegerTest();
        getFloorAtTest();
        isNegativeZeroTest();
        isPositiveZeroTest();
        parseIntAllTest();
    });
}

export {numberUtilsTest};
