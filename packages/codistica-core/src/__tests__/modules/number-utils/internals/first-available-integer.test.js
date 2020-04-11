import {assert} from 'chai';
import {firstAvailableInteger} from '../../../../modules/number-utils/internals/first-available-integer.js';

/** @see module:codistica-core/modules/number-utils/first-available-integer */
function firstAvailableIntegerTest() {
    describe('firstAvailableInteger()', () => {
        it('Should return the first not included positive integer in the input array.', () => {
            assert.strictEqual(
                firstAvailableInteger([2, 6, 70, 0, 4, 1, 5, 2]),
                3
            );
            assert.strictEqual(
                firstAvailableInteger([34, 4.6, 0, 1.1, 2, 1.8, Math.PI]),
                1
            );
        });
    });
}

export {firstAvailableIntegerTest};
