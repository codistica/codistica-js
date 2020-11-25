import {assert} from 'chai';
import {stringifyPrimitive} from '../../modules/stringify-primitive.js';

/** @see module:core/modules/stringify-primitive */
function stringifyPrimitiveTest() {
    describe('stringifyPrimitive()', () => {
        it('Should stringify the primitive input', () => {
            assert.strictEqual(stringifyPrimitive(null), 'null');
            assert.strictEqual(stringifyPrimitive(true), 'true');
        });
        it("Should return 'undefined'", () => {
            assert.strictEqual(stringifyPrimitive(undefined), 'undefined');
        });
    });
}

export {stringifyPrimitiveTest};
