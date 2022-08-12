import {assert} from 'chai';
import {hasKeys} from './has-keys.js';

/** @see module:core/modules/object-utils/has-keys */

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
