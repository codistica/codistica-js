import {assert} from 'chai';
import {isLeapYear} from './is-leap-year.js';

/** @see module:core/modules/date-utils/is-leap-year */

describe('isLeapYear()', () => {
    it('Should return a boolean indicated is the input is a leap year.', () => {
        assert.isFalse(isLeapYear(1995));
        assert.isFalse(isLeapYear(2100));
        assert.isFalse(isLeapYear(1900));
        assert.isTrue(isLeapYear(2020));
        assert.isTrue(isLeapYear(2000));
    });
});
