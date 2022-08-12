import {assert} from 'chai';
import {urlEncode} from './url-encode.js';

/** @see module:core/modules/string-utils/url-encode */

describe('urlEncode()', () => {
    it('Should correctly URL encode passed string.', () => {
        assert.strictEqual(urlEncode('Hello, World!'), 'Hello%2C+World!');
    });
});
