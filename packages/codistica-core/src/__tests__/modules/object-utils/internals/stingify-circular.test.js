import {assert} from 'chai';
import {stringifyCircular} from '../../../../modules/object-utils/internals/stringify-circular.js';
import {getCircularObject} from '../../../test-utils/get-circular-object.js';

/** @see module:codistica-core/modules/object-utils/stringify-circular */
function stringifyCircularTest() {
    describe('stringifyCircular()', () => {
        it('Should convert all circular references to a string with reference object parsable path.', () => {
            assert.deepEqual(stringifyCircular(getCircularObject()), {
                prop1: {
                    val1: null,
                    val2: [0, 1, 2, '[CIRCULAR:]'],
                    val3: 'A'
                },
                prop2: 'B',
                prop3: {
                    prop4: {
                        val4: undefined,
                        val5: '[CIRCULAR:prop3.prop4]'
                    }
                },
                prop5: '[CIRCULAR:]'
            });
        });
    });
}

export {stringifyCircularTest};
