import {assert} from 'chai';
import {once} from '../../modules/once.js';

/** @see module:core/modules/once */
function onceTest() {
    describe('once()', () => {
        it('Should allow function execution only once.', () => {
            const fn = once((a, b) => {
                return a + b;
            });

            assert.strictEqual(fn(5, 10), 15);
            assert.isUndefined(fn(5, 10));
        });
    });
}

export {onceTest};
