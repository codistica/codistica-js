import {assert} from 'chai';
import {splitByWords} from '../../../../modules/string-utils/internals/split-by-words.js';

/** @see module:core/modules/string-utils/split-by-words */
function splitByWordsTest() {
    describe('toTitleCase()', () => {
        it('Should correctly split passed string by words.', () => {
            assert.deepEqual(splitByWords('thisIsATest'), [
                'this',
                'Is',
                'A',
                'Test'
            ]);
            assert.deepEqual(splitByWords('1test-forAllTESTS'), [
                '1',
                'test',
                '-',
                'for',
                'All',
                'TESTS'
            ]);
        });
    });
}

export {splitByWordsTest};
