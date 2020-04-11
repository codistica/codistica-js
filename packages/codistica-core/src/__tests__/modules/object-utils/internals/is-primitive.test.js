import {assert} from 'chai';
import {isPrimitive} from '../../../../modules/object-utils/internals/is-primitive.js';

/** @see module:codistica-core/modules/object-utils/is-primitive */
function isPrimitiveTest() {
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
}

export {isPrimitiveTest};
