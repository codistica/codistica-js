import {assert} from 'chai';
import {STRINGS} from '../../../../constants/strings.js';
import {prettify} from '../../../../modules/object-utils/internals/prettify.js';

/** @see module:core/modules/object-utils/prettify */
function prettifyTest() {
    describe('prettify()', () => {
        it('Should return a prettified stringified object.', () => {
            const tab = STRINGS.STD_TAB_SPACE;
            assert.strictEqual(
                prettify({
                    objA: 1,
                    objB: {nestedObjA: null, nestedObjB: 'test'}
                }),
                '{\n' +
                    tab +
                    '"objA": 1,\n' +
                    tab +
                    '"objB": {\n' +
                    tab +
                    tab +
                    '"nestedObjA": null,\n' +
                    tab +
                    tab +
                    '"nestedObjB": "test"\n' +
                    tab +
                    '}\n' +
                    '}'
            );
        });
    });
}

export {prettifyTest};
