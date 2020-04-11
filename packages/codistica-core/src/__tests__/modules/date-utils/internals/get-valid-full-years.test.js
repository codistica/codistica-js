import {assert} from 'chai';
import {getValidFullYear} from '../../../../modules/date-utils/internals/get-valid-full-year.js';

/** @see module:codistica-core/modules/date-utils/get-valid-full-year */
function getValidFullYearTest() {
    describe('getValidFullYear()', () => {
        it('Should return an integer with the closer full year matching of a two digit input.', () => {
            const currentYear = new Date().getFullYear();
            assert.strictEqual(getValidFullYear(19), 2019);
            assert.strictEqual(
                getValidFullYear(currentYear - 2000),
                currentYear
            );
            assert.strictEqual(
                getValidFullYear(currentYear - 1999),
                currentYear - 99
            );
        });
    });
}

export {getValidFullYearTest};
