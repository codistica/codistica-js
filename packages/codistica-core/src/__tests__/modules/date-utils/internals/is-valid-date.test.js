import {assert} from 'chai';
import {isValidDate} from '../../../../modules/date-utils/internals/is-valid-date.js';

/** @see module:core/modules/date-utils/is-valid-date */
function isValidDateTest() {
    describe('isValidDate()', () => {
        it('Should return a boolean indicating if the input is a valid date.', () => {
            assert.isTrue(isValidDate(new Date()));
            assert.isFalse(isValidDate({Year: 2000}));
        });
    });
}

export {isValidDateTest};
