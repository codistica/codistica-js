import {assert} from 'chai';
import {isReference} from '../../../../modules/object-utils/internals/is-reference.js';

/** @see module:codistica-core/modules/object-utils/is-reference */
function isReferenceTest() {
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
}

export {isReferenceTest};
