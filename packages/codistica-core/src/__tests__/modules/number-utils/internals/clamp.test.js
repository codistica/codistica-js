import {assert} from 'chai';
import {clamp} from '../../../../modules/number-utils/internals/clamp.js';

/** @see module:core/modules/number-utils/clamp */
function clampTest() {
    describe('clamp()', () => {
        it('Should clamp numbers between specified limits.', () => {
            assert.strictEqual(clamp(10, -10, 10), 10);
            assert.strictEqual(clamp(0, -10, 10), 0);
            assert.strictEqual(clamp(2.5, 2, 3), 2.5);
            assert.strictEqual(clamp(10, -10, 5), 5);
            assert.strictEqual(clamp(Math.PI, -10, 3), 3);
            assert.strictEqual(clamp(Math.PI, -10, 10), Math.PI);
        });
    });
}

export {clampTest};
