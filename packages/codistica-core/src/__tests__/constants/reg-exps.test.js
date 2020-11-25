import {assert} from 'chai';
import {REG_EXPS} from '../../constants/reg-exps.js';
import {SEEDS} from '../../constants/seeds.js';
import {checkAll} from '../../modules/reg-exp-utils/internals/check-all.js';

/** @see module:codistica-core/constants/reg-exps */
function regExpsTest() {
    describe('REG_EXPS', () => {
        const specialChars = SEEDS.special
            .replace(SEEDS.alpha, '')
            .replace(SEEDS.num, '');

        it('Should match e-mail like strings.', () => {
            assert.isTrue(checkAll('test@test.com', REG_EXPS.IS_EMAIL));
            assert.isTrue(checkAll('tt-ne_25@tst-test.com', REG_EXPS.IS_EMAIL));
            assert.isFalse(checkAll('test@test%p.com', REG_EXPS.IS_EMAIL));
            assert.isFalse(checkAll('no space@test.com', REG_EXPS.IS_EMAIL));
            assert.isFalse(checkAll('not-ending@test', REG_EXPS.IS_EMAIL));
        });

        it('Should match RegExp reserved characters.', () => {
            assert.isTrue(
                checkAll(REG_EXPS.LETTERS.toString(), REG_EXPS.REG_EXP_RESERVED)
            );
            assert.isTrue(checkAll('Test /^H+/', REG_EXPS.REG_EXP_RESERVED));
            assert.isFalse(checkAll('abc', REG_EXPS.REG_EXP_RESERVED));
        });

        it('Should match letters.', () => {
            SEEDS.alpha.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.LETTERS));
            });
            SEEDS.num.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.LETTERS));
            });
            specialChars.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.LETTERS));
            });
            assert.isTrue(checkAll('000T000', REG_EXPS.LETTERS));
            assert.isFalse(checkAll('12!@3()-/?|{}<>.,', REG_EXPS.LETTERS));
        });

        it('Should match non-capital letters.', () => {
            SEEDS.alphaLow.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.LOW_LETTERS));
            });
            SEEDS.alphaUp.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.LOW_LETTERS));
            });
            SEEDS.num.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.LOW_LETTERS));
            });
            specialChars.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.LOW_LETTERS));
            });
            assert.isTrue(checkAll('445 15m {}:', REG_EXPS.LOW_LETTERS));
            assert.isFalse(checkAll('0(^.> MM', REG_EXPS.LOW_LETTERS));
        });

        it('Should match capital letters.', () => {
            SEEDS.alphaUp.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.UP_LETTERS));
            });
            SEEDS.alphaLow.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.UP_LETTERS));
            });
            SEEDS.num.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.UP_LETTERS));
            });
            specialChars.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.UP_LETTERS));
            });
            assert.isTrue(checkAll('445 15M {}:', REG_EXPS.UP_LETTERS));
            assert.isFalse(checkAll('445 15m {}:', REG_EXPS.UP_LETTERS));
        });

        it('Should match special characters.', () => {
            specialChars.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.SPECIALS));
            });
            SEEDS.alphaNum.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.SPECIALS));
            });
            assert.isTrue(checkAll('445 15M {}:', REG_EXPS.SPECIALS));
            assert.isFalse(checkAll('445 15 TYm', REG_EXPS.SPECIALS));
        });

        it('Should match non-letter characters.', () => {
            SEEDS.alpha.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.NON_LETTERS));
            });
            SEEDS.num.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.NON_LETTERS));
            });
            specialChars.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.NON_LETTERS));
            });
            assert.isFalse(checkAll('TEST', REG_EXPS.NON_LETTERS));
            assert.isTrue(checkAll('T3ST', REG_EXPS.NON_LETTERS));
        });

        it('Should match non-special characters.', () => {
            specialChars.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isFalse(checkAll(char, REG_EXPS.NON_SPECIALS));
            });
            SEEDS.alphaNum.split(REG_EXPS.SPLIT_BY_CHAR).forEach((char) => {
                assert.isTrue(checkAll(char, REG_EXPS.NON_SPECIALS));
            });
            assert.isFalse(checkAll('--+?/:"><', REG_EXPS.NON_SPECIALS));
            assert.isFalse(checkAll('', REG_EXPS.NON_SPECIALS));
            assert.isTrue(checkAll('12!@3()-/?|{}<>.,', REG_EXPS.NON_SPECIALS));
        });

        it('Should match strings starting with a letter.', () => {
            assert.isFalse(checkAll('445 15M {}:', REG_EXPS.FIRST_LETTERS));
            assert.isTrue(checkAll('5654 T765', REG_EXPS.FIRST_LETTERS));
            assert.isTrue(checkAll('j785 1121', REG_EXPS.FIRST_LETTERS));
        });

        it('Should match every not empty string.', () => {
            assert.isFalse(checkAll('', REG_EXPS.SPLIT_BY_CHAR));
            assert.isTrue(checkAll(' ', REG_EXPS.SPLIT_BY_CHAR));
            assert.isTrue(checkAll('t', REG_EXPS.SPLIT_BY_CHAR));
        });

        it('Should match short HEX colors.', () => {
            assert.isFalse(checkAll('#111111', REG_EXPS.SHORTHEX));
            assert.isTrue(checkAll('#111', REG_EXPS.SHORTHEX));
            assert.isTrue(checkAll('#AaA', REG_EXPS.SHORTHEX));
            assert.isFalse(checkAll('#zzz', REG_EXPS.SHORTHEX));
        });

        it('Should match long HEX colors.', () => {
            assert.isFalse(checkAll('#111', REG_EXPS.LONGHEX));
            assert.isTrue(checkAll('#111111', REG_EXPS.LONGHEX));
            assert.isTrue(checkAll('#A9ff10', REG_EXPS.LONGHEX));
            assert.isFalse(checkAll('#a9fF1z', REG_EXPS.LONGHEX));
        });
    });
}

export {regExpsTest};
