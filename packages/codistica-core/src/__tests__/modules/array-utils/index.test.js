import {dedupeTest} from './internals/dedupe.test.js';
import {flatTest} from './internals/flat.test.js';
import {getDuplicatesTest} from './internals/get-duplicates.test.js';
import {getShortestPathTest} from './internals/get-shortest-path.test.js';
import {normalizeTest} from './internals/normalize.test.js';
import {shuffleTest} from './internals/shuffle.test.js';

function arrayUtilsTest() {
    describe('arrayUtils', () => {
        dedupeTest();
        flatTest();
        getDuplicatesTest();
        getShortestPathTest();
        normalizeTest();
        shuffleTest();
    });
}

export {arrayUtilsTest};
