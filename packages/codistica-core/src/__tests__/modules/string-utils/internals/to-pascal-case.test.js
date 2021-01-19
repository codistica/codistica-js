import {assert} from 'chai';
import {toPascalCase} from '../../../../modules/string-utils/internals/to-pascal-case.js';

/** @see module:core/modules/string-utils/to-pascal-case */
function toPascalCaseTest() {
    describe('toPascalCase()', () => {
        it('Should correctly convert passed string to pascal case.', () => {
            assert.strictEqual(toPascalCase('ES Lint'), 'ESLint');
            assert.strictEqual(toPascalCase('test-test'), 'TestTest');
            assert.strictEqual(
                toPascalCase('123 456 TestTest1'),
                '123456TestTest1'
            );
        });
    });
}

export {toPascalCaseTest};