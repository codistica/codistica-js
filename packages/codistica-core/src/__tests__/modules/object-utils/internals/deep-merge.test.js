import {assert} from 'chai';
import {deepMerge} from '../../../../modules/object-utils/internals/deep-merge.js';

/** @see module:core/modules/object-utils/deep-merge */
function deepMergeTest() {
    describe('deepMerge()', () => {
        it('Should correctly merge objects.', () => {
            const source = {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop3: [],
                prop4: {},
                val: 'A'
            };

            const target = {
                prop1: {
                    array: [0, 1],
                    val: 'B',
                    prop2: {
                        val: 0
                    }
                },
                prop3: [null],
                prop4: {
                    val: 1
                },
                val: 'A'
            };

            const mergedObj = deepMerge(source, target);

            assert.equal(mergedObj, target);
            assert.deepEqual(mergedObj, {
                prop1: {
                    array: [0, 1, {val: false}],
                    val: 'B',
                    prop2: {
                        val: 0
                    }
                },
                prop3: [null],
                prop4: {
                    val: 1
                },
                val: 'A'
            });
        });

        it('Should correctly merge objects replacing values.', () => {
            const source = {
                prop1: {
                    array: [1, 2, {val: false}]
                },
                val: 'B'
            };

            const target = {
                prop1: {
                    array: [0, 1],
                    val: 'B'
                },
                prop2: [null],
                val: 'A'
            };

            const mergedObj = deepMerge(source, target);

            assert.equal(mergedObj, target);
            assert.deepEqual(mergedObj, {
                prop1: {
                    array: [1, 2, {val: false}],
                    val: 'B'
                },
                prop2: [null],
                val: 'B'
            });
        });

        it('Should correctly merge object to empty object.', () => {
            const source = {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop2: [null],
                val: 'A'
            };

            const target = {};

            const mergedObj = deepMerge(source, target);

            assert.equal(mergedObj, target);
            assert.deepEqual(mergedObj, {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop2: [null],
                val: 'A'
            });
        });

        it('Should correctly merge objects immutably.', () => {
            const source = {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop2: [null],
                val: 'A'
            };

            const target = {
                val: 'A'
            };

            const mergedObj = deepMerge(source, target, {immutable: true});

            assert.notEqual(mergedObj, target);
            assert.deepEqual(mergedObj, {
                prop1: {
                    array: [0, 1, {val: false}]
                },
                prop2: [null],
                val: 'A'
            });
        });
    });
}

export {deepMergeTest};
