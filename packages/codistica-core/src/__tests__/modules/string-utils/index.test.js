import {capitalizeFirstTest} from './internals/capitalize-first.test.js';
import {firstAvailableLetterTest} from './internals/first-available-letter.test.js';
import {injectBeforeTest} from './internals/inject-before.test.js';
import {toCamelCaseTest} from './internals/to-camel-case.test.js';

function stringUtilsTest() {
    describe('stringUtils', () => {
        capitalizeFirstTest();
        firstAvailableLetterTest();
        injectBeforeTest();
        toCamelCaseTest();
    });
}

export {stringUtilsTest};
