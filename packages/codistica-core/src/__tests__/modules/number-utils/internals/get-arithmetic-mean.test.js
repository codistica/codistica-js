import {assert} from 'chai';
import {getArithmeticMean} from '../../../../modules/number-utils/internals/get-arithmetic-mean.js';

function getArithmeticMeanTest() {
    describe('getArithmeticMean()', () => {
        it('Should return the arithmetic mean', () => {
            assert.strictEqual(getArithmeticMean([2, 4, 6]), 4);
            assert.strictEqual(getArithmeticMean([1.25, 6, 10]), 5.75);
        });
        it('Should return the wighted arithmetic mean', () => {
            assert.strictEqual(getArithmeticMean([1, 2, 3], [3, 1, 0]), 1.25);
        });
        it('Should return null', () => {
            assert.isNull(getArithmeticMean([1, 2, 3], [1, 3]));
        });
    });
}

export {getArithmeticMeanTest};
