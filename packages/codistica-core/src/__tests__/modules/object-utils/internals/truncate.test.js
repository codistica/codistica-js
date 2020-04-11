import {assert} from 'chai';
import {truncate} from '../../../../modules/object-utils/internals/truncate.js';
import {getObject} from '../../../test-utils/get-object.js';

/** @see module:codistica-core/modules/object-utils/truncate */
function truncateTest() {
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
}

export {truncateTest};
