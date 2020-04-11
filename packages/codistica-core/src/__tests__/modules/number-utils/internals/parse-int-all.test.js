import {assert} from 'chai';
import {parseIntAll} from '../../../../modules/number-utils/internals/parse-int-all.js';

/** @see module:codistica-core/modules/number-utils/parse-int-all */
function parseIntAllTest() {
    describe('parseIntAll()', () => {
        it('Should return an array of integers with the parsed input.', () => {
            assert.deepEqual(parseIntAll(5.4), [5.4]);
            assert.deepEqual(parseIntAll('test1.2$/h$3[,445]'), [1, 2, 3, 445]);
        });
    });
}

export {parseIntAllTest};
