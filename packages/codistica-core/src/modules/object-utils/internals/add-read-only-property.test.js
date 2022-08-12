import {assert} from 'chai';
import {addReadOnlyProperty} from './add-read-only-property.js';

/** @see module:core/modules/object-utils/add-read-only-property */

describe('addReadOnlyProperty()', () => {
    it('Should add a read-only property.', () => {
        const obj = {};
        assert.isTrue(addReadOnlyProperty(obj, 'roProp', true));
        obj.roProp = false;
        assert.isTrue(obj.roProp);
    });
    it('Should return false.', () => {
        const obj = {roProp: true};
        assert.isFalse(addReadOnlyProperty(obj, 'roProp', true));
    });
});
