import {assert} from 'chai';
import {toCamelCase} from './to-camel-case.js';

/** @see module:core/modules/string-utils/to-camel-case */

describe('toCamelCase()', () => {
    it('Should correctly convert passed string to camel case.', () => {
        assert.strictEqual(toCamelCase('test'), 'test');
        assert.strictEqual(toCamelCase('test!'), 'test!');
        assert.strictEqual(toCamelCase('another test!'), 'anotherTest!');
        assert.strictEqual(toCamelCase('camel case'), 'camelCase');
        assert.strictEqual(toCamelCase('Camel case'), 'camelCase');
        assert.strictEqual(toCamelCase('CamelCase'), 'camelCase');
        assert.strictEqual(toCamelCase('1CamelCase'), '1CamelCase');
        assert.strictEqual(
            toCamelCase('another camel1case test!'),
            'anotherCamel1CaseTest!'
        );
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
        assert.strictEqual(toCamelCase(' test-test '), 'testTest');
        assert.strictEqual(toCamelCase('ESLint'), 'esLint');
        assert.strictEqual(toCamelCase('AWSIcon'), 'awsIcon');
        assert.strictEqual(toCamelCase('Hello, World!'), 'hello,World!');
    });
});
