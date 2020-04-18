import {assert} from 'chai';
import {parsePrimitive} from '../../modules/parse-primitive.js';

/** @see module:modules/parse-primitive */
function parsePrimitiveTest() {
    describe('parsePrimitive()', () => {
        it('Should return the correct boolean', () => {
            assert.isTrue(parsePrimitive('true'));
            assert.isFalse(parsePrimitive('false'));
        });
        it('Should return null', () => {
            assert.isNull(parsePrimitive('null'));
        });
        it('Should return undefined', () => {
            assert.isUndefined(parsePrimitive('undefined'));
        });
        it('Should return a number', () => {
            assert.strictEqual(parsePrimitive('5'), 5);
        });
        it('Should return a string', () => {
            assert.strictEqual(parsePrimitive('Test'), 'Test');
        });
    });
}

export {parsePrimitiveTest};
