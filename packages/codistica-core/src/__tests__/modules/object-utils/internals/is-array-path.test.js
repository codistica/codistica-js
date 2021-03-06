import {assert} from 'chai';
import {isArrayPath} from '../../../../modules/object-utils/internals/is-array-path.js';

/** @see module:core/modules/object-utils/is-array-path */
function isArrayPathTest() {
    describe('isArrayPath()', () => {
        it('Should return true if given path segment is an array like path and false otherwise.', () => {
            assert.isTrue(isArrayPath('[0]'));
            assert.isTrue(isArrayPath('[]'));
            assert.isFalse(isArrayPath('[a]'));
            assert.isFalse(isArrayPath('prop1'));
            assert.isFalse(isArrayPath('0'));
        });
    });
}

export {isArrayPathTest};
