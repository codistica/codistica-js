import {assert} from 'chai';
import {isPositiveZero} from './is-positive-zero.js';

/** @see module:core/modules/number-utils/is-positive-zero */

describe('isNegativeZero()', () => {
    it('Should return boolean indicating if input is a positive zero.', () => {
        assert.isTrue(isPositiveZero(0));
        assert.isTrue(isPositiveZero(0 / 5));
        assert.isFalse(isPositiveZero(-0));
        assert.isFalse(isPositiveZero(0.05));
    });
});
