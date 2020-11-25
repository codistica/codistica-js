import {assert} from 'chai';
import {shuffle} from '../../../../modules/array-utils/internals/shuffle.js';

/** @see module:core/modules/array-utils/shuffle */
function shuffleTest() {
    describe('shuffle()', () => {
        // TODO: PREVENT ERROR WHEN OUTPUT IS EQUAL TO INPUT
        it('Should return an array with randomly shuffled elements from input array.', () => {
            assert.notSameOrderedMembers(shuffle([1, 2, 3, 4, 5]), [
                1,
                2,
                3,
                4,
                5
            ]);
            assert.notSameOrderedMembers(
                shuffle([undefined, null, undefined, null]),
                [null, undefined, false]
            );
            assert.notSameOrderedMembers(shuffle(['Test1', {prop1: 'A'}], 3), [
                'Test1',
                {prop1: 'A'}
            ]);
        });
    });
}

export {shuffleTest};
