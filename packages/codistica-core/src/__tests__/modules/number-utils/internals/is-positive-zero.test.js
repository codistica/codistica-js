import {assert} from 'chai';
import {isPositiveZero} from '../../../../modules/number-utils/internals/is-positive-zero.js';

/** @see module:codistica-core/modules/number-utils/is-positive-zero */
function isPositiveZeroTest() {
    describe('isNegativeZero()', () => {
        it('Should return boolean indicating if input is a positive zero.', () => {
            assert.isTrue(isPositiveZero(0));
            assert.isTrue(isPositiveZero(0 / 5));
            assert.isFalse(isPositiveZero(-0));
            assert.isFalse(isPositiveZero(0.05));
        });
    });
}

export {isPositiveZeroTest};
