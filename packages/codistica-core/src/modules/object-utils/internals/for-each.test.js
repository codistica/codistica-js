import {assert} from 'chai';
import {getCircularObject} from '../../../test-utils/get-circular-object.js';
import {getComplexObject} from '../../../test-utils/get-complex-object.js';
import {forEach} from './for-each.js';

const expected = {
    prop1: {
        val1: {
            val1: true,
            val2: true,
            val3: true
        },
        val2: [0, 1, 2],
        val3: 'A'
    },
    prop2: 'A',
    prop3: {
        prop4: {
            val4: {
                val1: true,
                val2: true,
                val3: true
            },
            val5: [{a: 'A', b: 'A', c: [0, 1, 2]}],
            val6: getCircularObject()
        }
    },
    prop5: {
        val1: true,
        val2: true,
        val3: true
    }
};

/** @see module:core/modules/object-utils/for-each */

describe('forEach()', () => {
    it('Should recurse through the entire input allowing async callback execution.', async () => {
        assert.deepEqual(
            await forEach(
                getComplexObject(),
                async (elem, API) => {
                    if (elem === false) {
                        API.replaceValue(true);
                    } else if (elem === 'B') {
                        await replaceValue('A');
                    }

                    /**
                     * @async
                     * @description Simulates an asynchronous tasks while replacing the current value using the provided API.
                     * @param {*} newValue - New value.
                     * @returns {Promise<void>} Promise. Void.
                     */
                    async function replaceValue(newValue) {
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                API.replaceValue(newValue);
                                resolve();
                            }, 10);
                        });
                    }
                },
                {
                    referenceCheck: true,
                    circularCheck: true,
                    ignore: /val6$/
                }
            ),
            expected
        );
    });
});
