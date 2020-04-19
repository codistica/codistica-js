/**
 * @description Generates an object with internal circular references for testing.
 * @returns {Object<string,*>} Generated object.
 */
function getCircularObject() {
    const obj = {
        prop1: {
            val1: null,
            val2: [0, 1, 2],
            val3: 'A'
        },
        prop2: 'B',
        prop3: {
            prop4: {
                val4: undefined
            }
        }
    };
    /** @type {Array<*>} */ (obj.prop1.val2)[3] = obj;
    obj.prop5 = obj;
    obj.prop3.prop4.val5 = obj.prop3.prop4;
    return obj;
}

export {getCircularObject};
