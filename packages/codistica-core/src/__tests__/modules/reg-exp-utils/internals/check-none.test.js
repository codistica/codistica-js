import {assert} from 'chai';
import {REG_EXPS} from '../../../../constants/reg-exps.js';
import {checkNone} from '../../../../modules/reg-exp-utils/internals/check-none.js';

/** @see module:core/modules/reg-exp-utils/check-none */
function checkNoneTest() {
    describe('checkNone()', () => {
        it('Should return a boolean indicating if the input does not matches any item in rawExp.', () => {
            assert.isFalse(
                checkNone('I match all rawExp', [
                    REG_EXPS.LOW_LETTERS,
                    REG_EXPS.NON_SPECIALS
                ])
            );
            assert.isFalse(
                checkNone('I match some rawExp', [
                    REG_EXPS.LETTERS,
                    REG_EXPS.NON_SPECIALS,
                    /\d/
                ])
            );
            assert.isTrue(
                checkNone('I do not match any rawExp', [
                    /\d/,
                    REG_EXPS.IS_EMAIL,
                    REG_EXPS.SPECIALS
                ])
            );
            assert.isTrue(
                checkNone('I wont be tested', 'I am not a regex expression')
            );
        });
    });
}

export {checkNoneTest};
