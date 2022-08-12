import {assert} from 'chai';
import {isReference} from './is-reference.js';

/** @see module:core/modules/object-utils/is-reference */

describe('isReference()', () => {
    it('Should return true is input is of reference type variable and false otherwise.', () => {
        assert.isTrue(isReference(['A', 'B', 'C']));
        assert.isTrue(isReference({a: true, b: true, c: true}));
        assert.isTrue(isReference([]));
        assert.isTrue(isReference({}));
        assert.isFalse(isReference(null));
        assert.isFalse(isReference(undefined));
        assert.isTrue(isReference(() => {}));
    });
});
