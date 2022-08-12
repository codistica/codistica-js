import {assert} from 'chai';
import {getCircularObject} from '../../../test-utils/get-circular-object.js';
import {stringifyCircular} from './stringify-circular.js';

/** @see module:core/modules/object-utils/stringify-circular */

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
