/**
 * @description Generates a simple object for testing.
 * @returns {Object<string,*>} Generated object.
 */
function getObject() {
    return {
        prop1: {
            val1: null,
            val2: [0, 1, 2],
            val3: 'A'
        },
        prop2: 'B',
        prop3: {
            prop4: {
                val4: undefined,
                val5: [{a: 'A', b: 'B', c: [0, 1, 2]}]
            }
        }
    };
}

export {getObject};
