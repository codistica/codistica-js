import {assert} from 'chai';
import {getKeys} from './get-keys.js';

/** @see module:core/modules/object-utils/get-keys */

describe('getKeys()', () => {
    it('Should return an array of keys with correct type values (string|number) depending on input.', () => {
        assert.sameOrderedMembers(getKeys(['A', 'B', 'C']), [0, 1, 2]);
        assert.sameOrderedMembers(getKeys({a: true, b: true, c: true}), [
            'a',
            'b',
            'c'
        ]);
        assert.sameOrderedMembers(getKeys([]), []);
        assert.sameOrderedMembers(getKeys({}), []);
        assert.sameOrderedMembers(getKeys(null), []);
        assert.sameOrderedMembers(getKeys(undefined), []);
        assert.sameOrderedMembers(
            getKeys(() => {}),
            []
        );
    });
});
