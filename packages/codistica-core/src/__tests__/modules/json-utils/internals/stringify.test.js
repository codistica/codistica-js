import {assert} from 'chai';
import {stringify} from '../../../../modules/json-utils/internals/stringify.js';
import {getCircularObject} from '../../../__utils__/get-circular-object.js';

/** @see module:core/modules/json-utils/stringify */
function stringifyTest() {
    describe('stringify()', () => {
        it('Should return a stringified object, including circular object stringifying capabilities.', () => {
            let circularObject = getCircularObject();
            circularObject.prop3.prop4.val4 = 'undefined';
            assert.deepEqual(
                stringify(
                    circularObject,
                    (key, val) => {
                        return val === 'undefined' ? 'None' : val;
                    },
                    '$'
                ),
                '{\n$"prop1": {\n$$"val1": null,\n$$"val2": [\n$$$0,\n$$$1,\n$$$2,\n$$$"[CIRCULAR:]"\n$$],\n$$"val3": "A"\n$},' +
                    '\n$"prop2": "B",' +
                    '\n$"prop3": {\n$$"prop4": {\n$$$"val4": "None",\n$$$"val5": "[CIRCULAR:prop3.prop4]"\n$$}\n$},' +
                    '\n$"prop5": "[CIRCULAR:]"\n}'
            );
            assert.deepEqual(
                stringify(
                    circularObject,
                    (key, val) => {
                        return val === 'undefined' ? 'None' : val;
                    },
                    1
                ),
                '{\n "prop1": {\n  "val1": null,\n  "val2": [\n   0,\n   1,\n   2,\n   "[CIRCULAR:]"\n  ],\n  "val3": "A"\n },' +
                    '\n "prop2": "B",' +
                    '\n "prop3": {\n  "prop4": {\n   "val4": "None",\n   "val5": "[CIRCULAR:prop3.prop4]"\n  }\n },' +
                    '\n "prop5": "[CIRCULAR:]"\n}'
            );
        });
    });
}

export {stringifyTest};
