import {assert} from 'chai';
import {parseCircular} from '../../../../modules/object-utils/internals/parse-circular.js';
import {getCircularObject} from '../../../__utils__/get-circular-object.js';

/** @see module:core/modules/object-utils/parse-circular */
function parseCircularTest() {
    describe('parseCircular()', () => {
        it('Should revive all stringified circular references in input object.', () => {
            assert.deepEqual(
                parseCircular({
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
                }),
                getCircularObject()
            );
        });
    });
}

export {parseCircularTest};
