import {assert} from 'chai';
import {flat} from '../../../../modules/array-utils/internals/flat.js';

/** @see module:core/modules/array-utils/flat */
function flatTest() {
    describe('flat()', () => {
        it('Should return a flat array containing all elements from inputted nested array.', () => {
            [
                {
                    input: [0, 1, [2, [[3]]]],
                    output: [0, 1, 2, 3],
                    maxDepth: undefined
                },
                {
                    input: [1, 2, [3, 4, [5, 6]], 7, 8, 9],
                    output: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    maxDepth: undefined
                },
                {
                    input: [1, 2, [3, 4, [5, 6]], 7, 8, 9],
                    output: [1, 2, 3, 4, [5, 6], 7, 8, 9],
                    maxDepth: 1
                }
            ].forEach(({input, output, maxDepth}) => {
                assert.deepEqual(flat(input, maxDepth), output);
            });
        });
    });
}

export {flatTest};
