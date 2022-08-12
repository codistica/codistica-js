import {assert} from 'chai';
import {stringify} from './stringify.js';

/** @see module:core/modules/stringify */

describe('stringify()', () => {
    it('Should stringify the primitive input.', () => {
        assert.strictEqual(stringify(null), 'null');
        assert.strictEqual(stringify(true), 'true');
    });
    it("Should return 'undefined'", () => {
        assert.strictEqual(stringify(undefined), 'undefined');
    });
});
