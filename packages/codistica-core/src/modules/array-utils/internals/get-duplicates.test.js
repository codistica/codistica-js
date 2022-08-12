import {assert} from 'chai';
import {getDuplicates} from './get-duplicates.js';

/** @see module:core/modules/array-utils/get-duplicates*/

describe('getDuplicates()', () => {
    it('Should return elements that are duplicates.', () => {
        assert.sameOrderedMembers(
            getDuplicates(['one', 'two', 'three', 'two', 'four']),
            ['two']
        );
        assert.sameOrderedMembers(getDuplicates([0, 2, 4, 2, 7, 0, 2]), [0, 2]);
        assert.sameOrderedMembers(
            getDuplicates([null, undefined, true, false, null, true]),
            [null, true]
        );
    });
});
