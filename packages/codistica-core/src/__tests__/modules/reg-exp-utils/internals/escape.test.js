import {assert} from 'chai';
import {escape} from '../../../../modules/reg-exp-utils/internals/ecape.js';

/** @see module:core/modules/reg-exp-utils/escape */
function escapeTest() {
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
}

export {escapeTest};
