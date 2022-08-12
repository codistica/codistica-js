import {assert} from 'chai';
import {pathToKey} from './path-to-key.js';

/** @see module:core/modules/object-utils/path-to-key */

describe('pathToKey()', () => {
    it('Should return string keys for object like path segments and number keys for array like path segments.', () => {
        assert.strictEqual(pathToKey('prop1'), 'prop1');
        assert.strictEqual(pathToKey('[0]'), 0);
        assert.strictEqual(pathToKey(''), '');
    });
});
