import {assert} from 'chai';
import {urlDecode} from './url-decode.js';

/** @see module:core/modules/string-utils/url-decode */

describe('urlDecode()', () => {
    it('Should correctly URL decode passed string.', () => {
        assert.strictEqual(urlDecode('Hello%2C+World!'), 'Hello, World!');
    });
});
