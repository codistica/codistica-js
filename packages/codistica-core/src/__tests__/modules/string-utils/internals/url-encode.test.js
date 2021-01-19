import {assert} from 'chai';
import {urlEncode} from '../../../../modules/string-utils/internals/url-encode.js';

/** @see module:core/modules/string-utils/url-encode */
function urlEncodeTest() {
    describe('urlEncode()', () => {
        it('Should correctly URL encode passed string.', () => {
            assert.strictEqual(urlEncode('Hello, World!'), 'Hello%2C+World!');
        });
    });
}

export {urlEncodeTest};
