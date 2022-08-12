import {assert} from 'chai';
import {stringToPathArray} from './string-to-path-array.js';

/** @see module:core/modules/object-utils/string-to-path-array */

describe('stringToPathArray()', () => {
    it('Should convert an object path string to an array with path segments as elements.', () => {
        assert.sameOrderedMembers(
            stringToPathArray('prop1.val1[0][0].finalProp.finalArray[1]'),
            ['prop1', 'val1', '[0]', '[0]', 'finalProp', 'finalArray', '[1]']
        );
        assert.sameOrderedMembers(stringToPathArray('[0][1].prop.value[1]'), [
            '[0]',
            '[1]',
            'prop',
            'value',
            '[1]'
        ]);
    });
});
