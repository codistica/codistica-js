import {daysInMonthTest} from './internals/days-in-months.test.js';
import {getValidFullYearTest} from './internals/get-valid-full-years.test.js';
import {isLeapYearTest} from './internals/is-leap-year.test.js';
import {isValidDateTest} from './internals/is-valid-date.test.js';

function dateUtilsTest() {
    describe('DateUtils', () => {
        daysInMonthTest();
        getValidFullYearTest();
        isLeapYearTest();
        isValidDateTest();
    });
}

export {dateUtilsTest};
