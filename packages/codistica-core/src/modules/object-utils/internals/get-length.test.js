import {assert} from 'chai';
import {getLength} from './get-length.js';

/** @see module:core/modules/object-utils/get-length */

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
