import {assert} from 'chai';
import {toSentenceCase} from '../../../../modules/string-utils/internals/to-sentence-case.js';

/** @see module:core/modules/string-utils/title-to-url */
function toSentenceCaseTest() {
    describe('toSentenceCase()', () => {
        it('Should correctly convert passed string to sentence case.', () => {
            assert.strictEqual(
                toSentenceCase('thisIsASentence'),
                'This is a sentence.'
            );
            assert.strictEqual(
                toSentenceCase('thisIsANOTHERSentence'),
                'This is another sentence.'
            );
            assert.strictEqual(toSentenceCase('hello,world!'), 'Hello, world!');
            assert.strictEqual(
                toSentenceCase('(hello)-world!'),
                '(hello) world!'
            );
            assert.strictEqual(
                toSentenceCase('(hello)- world!'),
                '(hello) - world!'
            );
            assert.strictEqual(
                toSentenceCase("WeCan'tLetThisTest -Fail"),
                "We can't let this test - fail."
            );
            assert.strictEqual(
                toSentenceCase('thisIsASentence. isThisASentence??? yesItIs!'),
                'This is a sentence. Is this a sentence??? Yes it is!'
            );
        });
    });
}

export {toSentenceCaseTest};
