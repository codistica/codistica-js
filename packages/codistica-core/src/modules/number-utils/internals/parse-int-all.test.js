import {assert} from 'chai';
import {parseIntAll} from './parse-int-all.js';

/** @see module:core/modules/number-utils/parse-int-all */

describe('parseIntAll()', () => {
    it('Should return an array of integers with the parsed input.', () => {
        assert.deepEqual(parseIntAll(5.4), [5.4]);
        assert.deepEqual(parseIntAll('test1.2$/h$3[,445]'), [1, 2, 3, 445]);
    });
});
