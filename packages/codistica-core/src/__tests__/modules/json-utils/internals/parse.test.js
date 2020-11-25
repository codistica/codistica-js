import {assert} from 'chai';
import {parse} from '../../../../modules/json-utils/internals/parse.js';
import {getCircularObject} from '../../../__utils__/get-circular-object.js';

/** @see module:core/modules/json-utils/parse */
function parseTest() {
    describe('parse()', () => {
        it('Should return a parsed object, including circular object reviving capabilities.', () => {
            let circularObject = getCircularObject();
            circularObject.prop3.prop4.val4 = null;
            assert.deepEqual(
                parse(
                    '{"prop1": {"val1": null,"val2": [0, 1, 2, "[CIRCULAR:]"], "val3": "A"}, ' +
                        '"prop2": "B", ' +
                        '"prop3": {"prop4": {"val4": "undefined", "val5": "[CIRCULAR:prop3.prop4]"}}, "prop5": "[CIRCULAR:]"}',
                    (key, val) => {
                        return val === 'undefined' ? null : val;
                    }
                ),
                circularObject
            );
        });
    });
}

export {parseTest};
