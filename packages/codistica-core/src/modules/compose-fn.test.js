import {assert} from 'chai';
import {composeFn} from './compose-fn.js';

/** @see module:core/modules/compose-fn */

describe('composeFn()', () => {
    it('Should correctly compose a function by chaining input functions.', () => {
        /**
         * @description Function A.
         * @param {string} str - String.
         * @returns {string} String.
         */
        function fnA(str) {
            return str + 'A';
        }

        /**
         * @description Function B.
         * @param {string} str - String.
         * @returns {string} String.
         */
        function fnB(str) {
            return str + 'B';
        }

        /**
         * @description Function C.
         * @param {string} str - String.
         * @returns {string} String.
         */
        function fnC(str) {
            return str + 'C';
        }

        const composedFn = composeFn(fnA, fnB, fnC);

        assert.strictEqual(composedFn('Test'), 'TestABC');
    });
});
