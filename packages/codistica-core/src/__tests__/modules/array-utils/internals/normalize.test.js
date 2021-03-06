import {assert} from 'chai';
import {normalize} from '../../../../modules/array-utils/internals/normalize.js';

/** @see module:core/modules/array-utils/normalize */
function normalizeTest() {
    describe('normalize()', () => {
        it('Should always return and array, eventually containing input element if not array itself.', () => {
            assert.deepEqual(normalize([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
            assert.deepEqual(normalize('A'), ['A']);
        });
    });
}

export {normalizeTest};
