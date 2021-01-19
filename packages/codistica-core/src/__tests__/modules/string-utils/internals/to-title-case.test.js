import {assert} from 'chai';
import {toTitleCase} from '../../../../modules/string-utils/internals/to-title-case.js';

/** @see module:core/modules/string-utils/to-title-case */
function toTitleCaseTest() {
    describe('toTitleCase()', () => {
        it('Should correctly convert passed string to title case.', () => {
            assert.strictEqual(toTitleCase('thisIsATitle'), 'This Is A Title');
            assert.strictEqual(
                toTitleCase('thisIsANOTHERTitle'),
                'This Is ANOTHER Title'
            );
            assert.strictEqual(toTitleCase('hello,world!'), 'Hello, World!');
            assert.strictEqual(toTitleCase('(hello)-world!'), '(Hello) World!');
            assert.strictEqual(
                toTitleCase('(hello)- world!'),
                '(Hello) - World!'
            );
            assert.strictEqual(
                toTitleCase("WeCan'tLetThisTest -Fail"),
                "We Can't Let This Test - Fail"
            );
        });
    });
}

export {toTitleCaseTest};
