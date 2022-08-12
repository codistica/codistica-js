import {assert} from 'chai';
import {getObject} from '../../../test-utils/get-object.js';
import {truncate} from './truncate.js';

/** @see module:core/modules/object-utils/truncate */

describe('truncate()', () => {
    it('Should truncate object at the indicated depth.', () => {
        assert.deepEqual(truncate(getObject(), 2), {
            prop1: {
                val1: null,
                val2: '[ARRAY: 0 1 2]',
                val3: 'A'
            },
            prop2: 'B',
            prop3: {
                prop4: '[OBJECT: val4 val5]'
            }
        });
    });
});
