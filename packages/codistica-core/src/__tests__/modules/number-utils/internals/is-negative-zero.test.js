import {assert} from 'chai';
import {isNegativeZero} from '../../../../modules/number-utils/internals/is-negative-zero.js';

/** @see module:codistica-core/modules/number-utils/is-negative-zero */
function isNegativeZeroTest() {
    describe('isNegativeZero()', () => {
        it('Should return boolean indicating if input is a negative zero.', () => {
            assert.isTrue(isNegativeZero(-0));
            assert.isTrue(isNegativeZero(0 / -5));
            assert.isFalse(isNegativeZero(0));
            assert.isFalse(isNegativeZero(-0.05));
        });
    });
}

export {isNegativeZeroTest};
