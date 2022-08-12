import {assert} from 'chai';
import {REG_EXPS} from '../../../constants/reg-exps.js';
import {checkOne} from './check-one.js';

/** @see module:core/modules/reg-exp-utils/check-one */

describe('checkOne()', () => {
    it('Should return a boolean indicating if the input matches any item in rawExp.', () => {
        assert.isTrue(
            checkOne('I match all rawExp', [
                REG_EXPS.LOW_LETTERS,
                REG_EXPS.NON_SPECIALS
            ])
        );
        assert.isTrue(
            checkOne('I match some rawExp', [
                REG_EXPS.LETTERS,
                REG_EXPS.NON_SPECIALS,
                /\d/
            ])
        );
        assert.isFalse(
            checkOne('I do not match any rawExp', [
                /\d/,
                REG_EXPS.IS_EMAIL,
                REG_EXPS.SPECIALS
            ])
        );
        assert.isFalse(
            checkOne('I wont be tested', 'I am not a regex expression')
        );
    });
});
