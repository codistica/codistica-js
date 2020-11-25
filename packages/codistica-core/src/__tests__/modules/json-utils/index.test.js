import {parseTest} from './internals/parse.test.js';
import {stringifyTest} from './internals/stringify.test.js';

function jsonUtilsTest() {
    describe('jsonUtils', () => {
        parseTest();
        stringifyTest();
    });
}

export {jsonUtilsTest};
