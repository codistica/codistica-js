import {assert} from 'chai';
import {seek} from '../../../../modules/object-utils/internals/seek.js';

/** @see module:core/modules/object-utils/seek */
function seekTest() {
    describe('seek()', () => {
        it('Should get or set a value from/to the specified object path.', () => {
            const obj = {
                prop1: {
                    val1: ['A', 'B'],
                    val2: false
                },
                prop2: undefined
            };

            const arr = [
                {
                    prop1: false
                }
            ];

            const value1 = seek(obj, 'prop1.val1[1]');
            const value2 = seek(arr, '[0].prop1');

            seek(obj, 'prop1.val2', true, true);
            seek(obj, 'prop1.val3', value1);
            seek(obj, 'prop3[0][0].val', value1);

            seek(arr, '[0].prop1', !value2, true);

            assert.deepEqual(obj, {
                prop1: {
                    val1: ['A', 'B'],
                    val2: true,
                    val3: 'B'
                },
                prop2: undefined,
                prop3: [[{val: 'B'}]]
            });

            assert.deepEqual(arr, [
                {
                    prop1: true
                }
            ]);
        });
    });
}

export {seekTest};
