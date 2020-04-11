import {assert} from 'chai';
import {getLength} from '../../../../modules/object-utils/internals/get-length.js';

/** @see module:codistica-core/modules/object-utils/get-length */
function getLengthTest() {
    describe('getLength()', () => {
        it('Should return the number of found keys.', () => {
            assert.strictEqual(getLength(['A', 'B', 'C']), 3);
            assert.strictEqual(getLength({a: true, b: true, c: true}), 3);
            assert.strictEqual(getLength([]), 0);
            assert.strictEqual(getLength({}), 0);
            assert.strictEqual(getLength(null), 0);
            assert.strictEqual(getLength(undefined), 0);
            assert.strictEqual(
                getLength(() => {}),
                0
            );
        });
    });
}

export {getLengthTest};
