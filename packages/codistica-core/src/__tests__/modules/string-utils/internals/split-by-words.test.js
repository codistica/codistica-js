import {assert} from 'chai';
import {splitByWords} from '../../../../modules/string-utils/internals/split-by-words.js';

/** @see module:core/modules/string-utils/split-by-words */
function splitByWordsTest() {
    describe('splitByWords()', () => {
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
            assert.deepEqual(splitByWords('Hello, World!'), [
                'Hello',
                ',',
                ' ',
                'World',
                '!'
            ]);
            assert.deepEqual(splitByWords('Hello,%$#  World!'), [
                'Hello',
                ',',
                '%',
                '$',
                '#',
                ' ',
                ' ',
                'World',
                '!'
            ]);
            assert.deepEqual(splitByWords('Hello,123  World!!'), [
                'Hello',
                ',',
                '123',
                ' ',
                ' ',
                'World',
                '!',
                '!'
            ]);
            assert.deepEqual(splitByWords('hello,world'), [
                'hello',
                ',',
                'world'
            ]);
            assert.deepEqual(splitByWords("WeCan'tLetThisTest-Fail"), [
                'We',
                "Can't",
                'Let',
                'This',
                'Test',
                '-',
                'Fail'
            ]);
        });
    });
}

export {splitByWordsTest};
