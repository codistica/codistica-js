import {assert} from 'chai';
import {dedupe} from './dedupe.js';

/** @see module:core/modules/array-utils/dedupe */

describe('dedupe()', () => {
    it('Should return an array with elements from input array without duplicates.', () => {
        assert.sameOrderedMembers(
            dedupe(['one', 'two', 'one', 'three', 'one', 'two', 'two']),
            ['one', 'two', 'three']
        );
        assert.sameOrderedMembers(
            dedupe([null, undefined, undefined, null, false]),
            [null, undefined, false]
        );
        assert.sameOrderedMembers(
            dedupe([null, undefined, 1, 2, 4, 4, null, 4, false]),
            [null, undefined, 1, 2, 4, false]
        );
    });
});
