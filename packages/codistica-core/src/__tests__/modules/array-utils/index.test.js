import {dedupeTest} from './internals/dedupe.test.js';
import {flattenTest} from './internals/flatten.test.js';
import {getDuplicatesTest} from './internals/get-duplicates.test.js';
import {normalizeTest} from './internals/normalize.test.js';
import {shuffleTest} from './internals/shuffle.test.js';

function arrayUtilsTest() {
    describe('arrayUtils', () => {
        dedupeTest();
        flattenTest();
        getDuplicatesTest();
        normalizeTest();
        shuffleTest();
    });
}

export {arrayUtilsTest};
