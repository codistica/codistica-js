import {assert} from 'chai';
import {hasKeys} from '../../../../modules/object-utils/internals/has-keys.js';

/** @see module:core/modules/object-utils/has-keys */
function hasKeysTest() {
    describe('hasKeys()', () => {
        it('Should return true if input has keys and false otherwise.', () => {
            assert.isTrue(hasKeys(['A', 'B', 'C']));
            assert.isTrue(hasKeys({a: true, b: true, c: true}));
            assert.isFalse(hasKeys([]));
            assert.isFalse(hasKeys({}));
            assert.isFalse(hasKeys(null));
            assert.isFalse(hasKeys(undefined));
            assert.isFalse(hasKeys(() => {}));
        });
    });
}

export {hasKeysTest};
