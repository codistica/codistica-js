import {clampTest} from './internals/clamp.test.js';
import {deepParseIntTest} from './internals/deep-parse-int.test.js';
import {firstAvailableIntegerTest} from './internals/first-available-integer.test.js';
import {getArithmeticMeanTest} from './internals/get-arithmetic-mean.test.js';
import {getFloorAtTest} from './internals/get-floor-at.test.js';
import {isNegativeZeroTest} from './internals/is-negative-zero.test.js';
import {isPositiveZeroTest} from './internals/is-positive-zero.test.js';
import {parseIntAllTest} from './internals/parse-int-all.test.js';

function numberUtilsTest() {
    describe('numberUtils', () => {
        clampTest();
        deepParseIntTest();
        firstAvailableIntegerTest();
        getArithmeticMeanTest();
        getFloorAtTest();
        isNegativeZeroTest();
        isPositiveZeroTest();
        parseIntAllTest();
    });
}

export {numberUtilsTest};
