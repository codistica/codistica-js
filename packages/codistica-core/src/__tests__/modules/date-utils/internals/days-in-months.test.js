import {assert} from 'chai';
import {daysInMonth} from '../../../../modules/date-utils/internals/days-in-month.js';

/** @see module:codistica-core/modules/date-utils/days-in-month */
function daysInMonthTest() {
    describe('daysInMonth()', () => {
        it('Should return the number of days of the specified month/year couple.', () => {
            assert.strictEqual(daysInMonth(2, 1996), 29);
            assert.strictEqual(daysInMonth(2, 1995), 28);
            assert.strictEqual(daysInMonth(3, 2000), 31);
            assert.strictEqual(daysInMonth(4, 1998), 30);
        });
    });
}

export {daysInMonthTest};
