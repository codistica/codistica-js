import {assert} from 'chai';
import {SEEDS} from '../../../../constants/seeds.js';
import {firstAvailableLetter} from '../../../../modules/string-utils/internals/first-available-letter.js';

/** @see module:core/modules/string-utils/first-available-letter */
function firstAvailableLetterTest() {
    describe('firstAvailableLetter()', () => {
        it('Should return the first available letter.', () => {
            assert.strictEqual(firstAvailableLetter(['a', 'B', 'd']), 'c');
            assert.strictEqual(firstAvailableLetter(['', '', '{0}']), 'a');
            assert.strictEqual(firstAvailableLetter(['aba', 'c', 'a']), 'b');
            let arrayOfAllLetters = [];
            let i;
            let length = SEEDS.alphaLow.length;
            for (i = 0; i < length; i++) {
                arrayOfAllLetters.push(SEEDS.alphaLow[i]);
            }
            assert.isNull(firstAvailableLetter(arrayOfAllLetters));
        });
    });
}

export {firstAvailableLetterTest};
