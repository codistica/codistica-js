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
        });
        it('Should save the input via callback', () => {
            let output = [];
            flatten(['1', [true, [3]]], (input) => {
                output.push(input);
            });
            assert.strictEqual(output[0], '1');
            assert.isTrue(output[1]);
            assert.strictEqual(output[2], 3);
        });
    });
}

export {flattenTest};
