import {capitalizeFirstTest} from './internals/capitalize-first.test.js';
import {firstAvailableLetterTest} from './internals/first-available-letter.test.js';
import {getCharTypeTest} from './internals/get-char-type.test.js';
import {injectBeforeTest} from './internals/inject-before.test.js';
import {splitByWordsTest} from './internals/split-by-words.test.js';
import {toCamelCaseTest} from './internals/to-camel-case.test.js';
import {toKebabCaseTest} from './internals/to-kebab-case.test.js';
import {toPascalCaseTest} from './internals/to-pascal-case.test.js';
import {toTitleCaseTest} from './internals/to-title-case.test.js';

function stringUtilsTest() {
    describe('stringUtils', () => {
        capitalizeFirstTest();
        firstAvailableLetterTest();
        getCharTypeTest();
        injectBeforeTest();
        splitByWordsTest();
        toCamelCaseTest();
        toKebabCaseTest();
        toPascalCaseTest();
        toTitleCaseTest();
    });
}

export {stringUtilsTest};
