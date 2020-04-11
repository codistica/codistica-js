import {assert} from 'chai';
import {deepClone} from '../../../../modules/object-utils/internals/deep-clone.js';

/** @see module:codistica-core/modules/object-utils/deep-clone */
function deepCloneTest() {
    describe('deepClone()', () => {
        it('Should clone every object value one by one.', () => {
            const obj = {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop2: [null],
                val: 'A'
            };
            const clonedObj = deepClone(obj);
            clonedObj.prop1.array[2].val = true;
            clonedObj.val = 'B';
            assert.deepEqual(obj, {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop2: [null],
                val: 'A'
            });
        });
    });
}

export {deepCloneTest};
