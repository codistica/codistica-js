import {assert} from 'chai';
import {padStart} from '../../../../modules/string-utils/internals/pad-start.js';

/** @see module:core/modules/string-utils/pad-start */
function padStartTest() {
    describe('padStart()', () => {
        it('Should return a string with the correct character injection.', () => {
            assert.strictEqual(padStart('Test', 7), '   Test');
            assert.strictEqual(padStart('Test', 8, '$'), '$$$$Test');
            assert.strictEqual(padStart('Test', 4, '$'), 'Test');
        });
    });
}

export {padStartTest};
