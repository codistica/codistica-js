import {assert} from 'chai';
import {isPrimitive} from './is-primitive.js';

/** @see module:core/modules/object-utils/is-primitive */

describe('isPrimitive()', () => {
    it('Should return true is input is of primitive type variable and false otherwise.', () => {
        assert.isTrue(isPrimitive('A'));
        assert.isTrue(isPrimitive(0));
        assert.isFalse(isPrimitive([]));
        assert.isFalse(isPrimitive({}));
        assert.isTrue(isPrimitive(null));
        assert.isTrue(isPrimitive(undefined));
        assert.isFalse(isPrimitive(() => {}));
    });
});
