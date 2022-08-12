import {assert} from 'chai';
import {escape} from './ecape.js';

/** @see module:core/modules/reg-exp-utils/escape */

describe('escape()', () => {
    it('Should return a string whose RegExp reserved characters have escaped.', () => {
        assert.strictEqual(
            escape('No escaped parameters @#%&\n'),
            'No escaped parameters @#%&\n'
        );
        assert.strictEqual(
            escape('Escaped parameters $^?()'),
            'Escaped parameters \\$\\^\\?\\(\\)'
        );
    });
});
