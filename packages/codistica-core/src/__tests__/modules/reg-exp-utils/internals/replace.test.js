import {assert} from 'chai';
import {replace} from '../../../../modules/reg-exp-utils/internals/replace.js';

/** @see module:modules/reg-exp-utils/replace */
function replaceTest() {
    describe('replace()', () => {
        it('Should return a replaced string.', () => {
            assert.strictEqual(
                replace('Test', (x) => {
                    return x.replace('es', 'oas');
                }),
                'Toast'
            );
            assert.strictEqual(
                replace('Test', [
                    (x) => {
                        return x + 'ing';
                    },
                    (x) => {
                        return x.replace('es', 'oas');
                    }
                ]),
                'Toasting'
            );
            assert.strictEqual(
                replace('Test', [
                    {search: ['e', /s/], val: 'x'},
                    {search: /x+/, val: 'oas'}
                ]),
                'Toast'
            );
        });
    });
}

export {replaceTest};
