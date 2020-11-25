import {assert} from 'chai';
import {REG_EXPS} from '../../../../constants/reg-exps.js';
import {checkAll} from '../../../../modules/reg-exp-utils/internals/check-all.js';

/** @see module:core/modules/reg-exp-utils/check-all */
function checkAllTest() {
    describe('checkAll()', () => {
        it('Should return a boolean indicating if the input matches all items in rawExp.', () => {
            assert.isTrue(
                checkAll('I match all rawExp', [
                    REG_EXPS.LOW_LETTERS,
                    REG_EXPS.NON_SPECIALS
                ])
            );
            assert.isFalse(
                checkAll('I match some rawExp', [
                    REG_EXPS.LETTERS,
                    REG_EXPS.NON_SPECIALS,
                    /\d/
                ])
            );
            assert.isFalse(
                checkAll('I do not match any rawExp', [
                    /\d/,
                    REG_EXPS.IS_EMAIL,
                    REG_EXPS.SPECIALS
                ])
            );
            assert.isFalse(
                checkAll('I wont be tested', 'I am not a regex expression')
            );
        });
    });
}

export {checkAllTest};
