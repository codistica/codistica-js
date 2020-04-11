import {getCircularObject} from './get-circular-object.js';

/**
 * @description Generates an object with other objects references and internal circular references for testing.
 * @returns {Object<string,*>} Generated object.
 */
function getComplexObject() {
    const obj = {
        val1: false,
        val2: false,
        val3: false
    };
    return {
        prop1: {
            val1: obj,
            val2: [0, 1, 2],
            val3: 'A'
        },
        prop2: 'B',
        prop3: {
            prop4: {
                val4: obj,
                val5: [{a: 'A', b: 'B', c: [0, 1, 2]}],
                val6: getCircularObject()
            }
        },
        prop5: obj
    };
}

export {getComplexObject};
