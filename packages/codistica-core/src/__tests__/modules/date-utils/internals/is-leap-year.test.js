import {assert} from 'chai';
import {isLeapYear} from '../../../../modules/date-utils/internals/is-leap-year.js';

/** @see module:codistica-core/modules/date-utils/is-leap-year */
function isLeapYearTest() {
    describe('isLeapYear()', () => {
        it('Should return a boolean indicated is the input is a leap year.', () => {
            assert.isFalse(isLeapYear(1995));
            assert.isFalse(isLeapYear(2100));
            assert.isFalse(isLeapYear(1900));
            assert.isTrue(isLeapYear(2020));
            assert.isTrue(isLeapYear(2000));
        });
    });
}

export {isLeapYearTest};
