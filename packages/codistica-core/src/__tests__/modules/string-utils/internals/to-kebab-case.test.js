import {assert} from 'chai';
import {toKebabCase} from '../../../../modules/string-utils/internals/to-kebab-case.js';

/** @see module:core/modules/string-utils/to-kebab-case */
function toKebabCaseTest() {
    describe('toKebabCase()', () => {
        it('Should correctly convert passed string to kebab case.', () => {
            assert.strictEqual(toKebabCase('ES Lint'), 'es-lint');
        });
    });
}

export {toKebabCaseTest};
