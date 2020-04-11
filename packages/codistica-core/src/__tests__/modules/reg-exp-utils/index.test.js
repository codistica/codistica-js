import {checkAllTest} from './internals/check-all.test.js';
import {checkNoneTest} from './internals/check-none.test.js';
import {checkOneTest} from './internals/check-one.test.js';
import {escapeTest} from './internals/escape.test.js';
import {normalizeTest} from './internals/normalize.test.js';
import {replaceTest} from './internals/replace.test.js';

function regExpUtilsTestTest() {
    describe('RegExpUtils', () => {
        checkAllTest();
        checkNoneTest();
        checkOneTest();
        escapeTest();
        normalizeTest();
        replaceTest();
    });
}

export {regExpUtilsTestTest};
