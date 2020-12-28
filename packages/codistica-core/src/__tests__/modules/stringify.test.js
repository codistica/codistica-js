import {assert} from 'chai';
import {stringify} from '../../modules/stringify.js';

/** @see module:core/modules/stringify */
function stringifyTest() {
    describe('stringify()', () => {
        it('Should stringify the primitive input.', () => {
            assert.strictEqual(stringify(null), 'null');
            assert.strictEqual(stringify(true), 'true');
        });
        it("Should return 'undefined'", () => {
            assert.strictEqual(stringify(undefined), 'undefined');
        });
    });
}

export {stringifyTest};
