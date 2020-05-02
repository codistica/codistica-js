import {assert} from 'chai';
import {flatten} from '../../../../modules/array-utils/internals/flatten.js';

/** @see module:codistica-core/modules/array-utils/flatten */
function flattenTest() {
    describe('flatten()', () => {
        it('Should return a flat array containing all elements from inputted nested array.', () => {
            assert.sameOrderedMembers(flatten([0, 1, [2, [[3]]]]), [
                0,
                1,
                2,
                3
            ]);
            assert.sameOrderedMembers(
                flatten([1, 2, [3, 4, [5, 6]], 7, 8, 9]),
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            );
        });
    });
}

export {flattenTest};
