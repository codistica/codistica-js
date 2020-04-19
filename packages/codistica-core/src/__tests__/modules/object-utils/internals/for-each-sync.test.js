import {assert} from 'chai';
import {forEachSync} from '../../../../modules/object-utils/internals/for-each-sync.js';
import {getCircularObject} from '../../../__utils__/get-circular-object.js';
import {getComplexObject} from '../../../__utils__/get-complex-object.js';

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

/** @see module:codistica-core/modules/object-utils/for-each-sync */
function forEachSyncTest() {
    describe('forEachSync()', () => {
        it('Should recurse through the entire input allowing sync callback execution with multiple options.', () => {
            assert.deepEqual(
                forEachSync(
                    getComplexObject(),
                    (elem, API) => {
                        if (elem === false) {
                            API.replaceValue(true);
                        } else if (elem === 'B') {
                            API.replaceValue('A');
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
}

export {forEachSyncTest};
