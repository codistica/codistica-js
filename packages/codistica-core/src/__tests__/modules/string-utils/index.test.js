import {firstAvailableLetterTest} from './internals/first-available-letter.test.js';
import {injectBeforeTest} from './internals/inject-before.test.js';

function stringUtilsTest() {
    describe('stringUtils', () => {
        firstAvailableLetterTest();
        injectBeforeTest();
    });
}

export {stringUtilsTest};
