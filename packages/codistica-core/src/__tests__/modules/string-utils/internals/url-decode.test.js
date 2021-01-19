import {assert} from 'chai';
import {urlDecode} from '../../../../modules/string-utils/internals/url-decode.js';

/** @see module:core/modules/string-utils/url-decode */
function urlDecodeTest() {
    describe('urlDecode()', () => {
        it('Should correctly URL decode passed string.', () => {
            assert.strictEqual(urlDecode('Hello%2C+World!'), 'Hello, World!');
        });
    });
}

export {urlDecodeTest};
