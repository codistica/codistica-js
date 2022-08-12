import {assert} from 'chai';
import {renameProperty} from './rename-property.js';

/** @see module:core/modules/object-utils/rename-property */

describe('renameProperty()', () => {
    it('Should rename indicated property inside object. Returns true if successful and false otherwise.', () => {
        const obj = {
            propA: {
                val1: null,
                val2: []
            },
            propB: '',
            propC: null
        };
        assert.isFalse(renameProperty(obj, 'propA', 'propC'));
        assert.isTrue(renameProperty(obj, 'propA', 'propD'));
        assert.hasAllDeepKeys(obj, {
            propD: {
                val1: null,
                val2: []
            },
            propB: '',
            propC: null
        });
    });
});
