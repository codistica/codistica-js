import {assert} from 'chai';
import {parse} from './parse.js';

/** @see module:core/modules/parse */

describe('parse()', () => {
    it('Should return the correct boolean.', () => {
        assert.isTrue(parse('true'));
        assert.isFalse(parse('False'));
    });
    it('Should return null.', () => {
        assert.isNull(parse('null'));
    });
    it('Should return undefined.', () => {
        assert.isUndefined(parse(' UNDEFINED '));
    });
    it('Should return a number.', () => {
        assert.strictEqual(parse('5'), 5);
    });
    it('Should return a string.', () => {
        assert.strictEqual(parse('Test'), 'Test');
    });
});
