import {capitalizeFirstTest} from './internals/capitalize-first.test.js';
import {firstAvailableLetterTest} from './internals/first-available-letter.test.js';
import {getCharTypeTest} from './internals/get-char-type.test.js';
import {padStartTest} from './internals/pad-start.test.js';
import {parseTest} from './internals/parse.test.js';
import {splitByWordsTest} from './internals/split-by-words.test.js';
import {titleToUrlTest} from './internals/title-to-url.test.js';
import {toCamelCaseTest} from './internals/to-camel-case.test.js';
import {toKebabCaseTest} from './internals/to-kebab-case.test.js';
import {toPascalCaseTest} from './internals/to-pascal-case.test.js';
import {toSentenceCaseTest} from './internals/to-sentence-case.test.js';
import {toTitleCaseTest} from './internals/to-title-case.test.js';
import {urlDecodeTest} from './internals/url-decode.test.js';
import {urlEncodeTest} from './internals/url-encode.test.js';
import {urlToTitleTest} from './internals/url-to-title.js';

function stringUtilsTest() {
    describe('stringUtils', () => {
        capitalizeFirstTest();
        firstAvailableLetterTest();
        getCharTypeTest();
        padStartTest();
        parseTest();
        splitByWordsTest();
        titleToUrlTest();
        toCamelCaseTest();
        toKebabCaseTest();
        toPascalCaseTest();
        toSentenceCaseTest();
        toTitleCaseTest();
        urlDecodeTest();
        urlEncodeTest();
        urlToTitleTest();
    });
}

export {stringUtilsTest};
