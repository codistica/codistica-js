/** @module core/modules/parse-primitive */

/**
 * @description Receives a raw string and returns its corresponding primitive value if found.
 * @param {string} str - Input string.
 * @returns {*} Parsed value.
 */
function parsePrimitive(str) {
    // TODO: CAN JSON.parse() BE USED INSTEAD? NOT FOR undefined

    let parsedNum = 0;
    let normStr = str.trim().toLowerCase();

    switch (normStr) {
        case 'true':
            return true;
        case 'false':
            return false;
        case 'null':
            return null;
        case 'undefined':
            return undefined;
        default:
            parsedNum = parseFloat(normStr); // TODO: TEST. USE deepParseInt() AND/OR CREATE deepParseFloat()
            if (
                !Number.isNaN(parsedNum) &&
                parsedNum.toString().length === normStr.length
            ) {
                return parsedNum;
            } else {
                return str;
            }
    }
}

export {parsePrimitive};
