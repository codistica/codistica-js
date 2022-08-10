import {forEachTest} from './internals/for-each.test.js';

function asyncUtilsTest() {
    describe('asyncUtils', () => {
        forEachTest();
    });
}

export {asyncUtilsTest};
