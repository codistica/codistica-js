import {assert} from 'chai';
import {toCamelCase} from '../../../../modules/string-utils/internals/to-camel-case.js';

/** @see module:modules/string-utils/to-camel-case */
function toCamelCaseTest() {
    describe('toCamelCase()', () => {
        it('Should correctly convert passed string to camelcase.', () => {
            assert.strictEqual(toCamelCase('test'), 'test');
            assert.strictEqual(toCamelCase('camel case'), 'camelCase');
            assert.strictEqual(toCamelCase('Camel case'), 'camelCase');
            assert.strictEqual(toCamelCase('CamelCase'), 'camelCase');
            assert.strictEqual(toCamelCase('1CamelCase'), '1CamelCase');
            assert.strictEqual(
                toCamelCase('SomePARTICULARCamelCase'),
                'somePARTICULARCamelCase'
            );
            assert.strictEqual(
                toCamelCase('SOMEParticularCamelCase'),
                'someParticularCamelCase'
            );
            assert.strictEqual(
                toCamelCase(' some-strange string '),
                'someStrangeString'
            );
            assert.strictEqual(toCamelCase('ESLint'), 'esLint');
            assert.strictEqual(toCamelCase('AWSIcon'), 'awsIcon');
        });
    });
}

export {toCamelCaseTest};
