import {assert} from 'chai';
import {titleToUrl} from './title-to-url.js';

/** @see module:core/modules/string-utils/title-to-url */

describe('titleToUrl()', () => {
    it('Should correctly convert passed string into a valid URL encoded one.', () => {
        assert.strictEqual(titleToUrl('Hello World'), 'hello-world');
        assert.strictEqual(titleToUrl('helloWorld!'), 'hello-world-!');
        assert.strictEqual(titleToUrl('--Test--'), 'test');
        assert.strictEqual(titleToUrl('Hello, World!'), 'hello-%2C-world-!');
    });
});
