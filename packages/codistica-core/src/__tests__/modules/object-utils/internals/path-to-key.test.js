import {assert} from 'chai';
import {pathToKey} from '../../../../modules/object-utils/internals/path-to-key.js';

/** @see module:core/modules/object-utils/path-to-key */
function pathToKeyTest() {
    describe('pathToKey()', () => {
        it('Should return string keys for object like path segments and number keys for array like path segments.', () => {
            assert.strictEqual(pathToKey('prop1'), 'prop1');
            assert.strictEqual(pathToKey('[0]'), 0);
            assert.strictEqual(pathToKey(''), '');
        });
    });
}

export {pathToKeyTest};
