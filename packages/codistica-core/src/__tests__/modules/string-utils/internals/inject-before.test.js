import {assert} from 'chai';
import {injectBefore} from '../../../../modules/string-utils/internals/inject-before.js';

/** @see module:modules/string-utils/inject-before */
function injectBeforeTest() {
    describe('injectBefore()', () => {
        it('Should return a string with the correct character injection.', () => {
            assert.strictEqual(injectBefore('Test', 7), '   Test');
            assert.strictEqual(injectBefore('Test', 8, '$'), '$$$$Test');
            assert.strictEqual(injectBefore('Test', 4, '$'), 'Test');
        });
    });
}

export {injectBeforeTest};
