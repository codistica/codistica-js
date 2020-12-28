import {assert} from 'chai';
import {parse} from '../../modules/parse.js';

/** @see module:core/modules/parse */
function parseTest() {
    describe('parse()', () => {
        it('Should return the correct boolean.', () => {
            assert.isTrue(parse('true'));
            assert.isFalse(parse('false'));
        });
        it('Should return null.', () => {
            assert.isNull(parse('null'));
        });
        it('Should return undefined.', () => {
            assert.isUndefined(parse('undefined'));
        });
        it('Should return a number.', () => {
            assert.strictEqual(parse('5'), 5);
        });
        it('Should return a string.', () => {
            assert.strictEqual(parse('Test'), 'Test');
        });
    });
}

export {parseTest};
