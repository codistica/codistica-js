import {assert} from 'chai';
import {REG_EXPS} from '../../../../constants/reg-exps.js';
import {normalize} from '../../../../modules/reg-exp-utils/internals/normalize.js';

/** @see module:core/modules/reg-exp-utils/normalize */
function normalizeTest() {
    describe('normalize()', () => {
        it('Should return an array of RegExp.', () => {
            assert.deepEqual(normalize([REG_EXPS.SPECIALS, '/d^wTest/']), [
                REG_EXPS.SPECIALS,
                /\/d\^wTest\//
            ]);
            assert.deepEqual(normalize(/d/), [/d/]);
            assert.deepEqual(normalize('Test'), [/Test/]);
        });
    });
}

export {normalizeTest};
