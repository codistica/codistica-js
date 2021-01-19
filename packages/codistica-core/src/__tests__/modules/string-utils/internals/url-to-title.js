import {assert} from 'chai';
import {urlToTitle} from '../../../../modules/string-utils/internals/url-to-title.js';

/** @see module:core/modules/string-utils/url-to-title */
function urlToTitleTest() {
    describe('urlToTitle()', () => {
        it('Should correctly convert passed URL encoded string into a title-like one.', () => {
            assert.strictEqual(urlToTitle('hello-world'), 'Hello World');
            assert.strictEqual(urlToTitle('hello-world-!'), 'Hello World!');
            assert.strictEqual(urlToTitle('test'), 'Test');
            assert.strictEqual(
                urlToTitle('hello-%2C-world-!'),
                'Hello, World!'
            );
        });
    });
}

export {urlToTitleTest};
