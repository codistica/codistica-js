import {assert} from 'chai';
import {isNegativeZero} from './is-negative-zero.js';

/** @see module:core/modules/number-utils/is-negative-zero */

describe('isNegativeZero()', () => {
    it('Should return boolean indicating if input is a negative zero.', () => {
        assert.isTrue(isNegativeZero(-0));
        assert.isTrue(isNegativeZero(0 / -5));
        assert.isFalse(isNegativeZero(0));
        assert.isFalse(isNegativeZero(-0.05));
    });
});
