import {assert} from 'chai';
import {toKebabCase} from './to-kebab-case.js';

/** @see module:core/modules/string-utils/to-kebab-case */

describe('toKebabCase()', () => {
    it('Should correctly convert passed string to kebab case.', () => {
        assert.strictEqual(toKebabCase('ES Lint'), 'es-lint');
        assert.strictEqual(toKebabCase('test-test'), 'test-test');
        assert.strictEqual(
            toKebabCase('123 456 TestTest1'),
            '123-456-test-test-1'
        );
    });
});
