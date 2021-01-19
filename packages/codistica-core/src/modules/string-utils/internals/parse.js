/** @module core/modules/string-utils/parse */

import {REG_EXPS} from '../../../constants/reg-exps.js';
import {getCharType} from './get-char-type.js';

/** @type {Map<string, ('LETTERS'|'NUMBERS'|'SPACE'|'SPECIAL')>} */
const typesMap = new Map([
    ['LOWER', 'LETTERS'],
    ['UPPER', 'LETTERS'],
    ['DIGIT', 'NUMBERS'],
    ['SPACE', 'SPACE'],
    ['SPECIAL', 'SPECIAL']
]);

/**
 * @typedef parseObjectType
 * @property {string} content - Content.
 * @property {number} index - Index.
 * @property {('LETTERS'|'NUMBERS'|'SPACE'|'SPECIAL')} type - Type.
 * @property {(parseObjectType|null)} next - Next item.
 * @property {(parseObjectType|null)} previous - Previous item.
 * @property {function(): void} remove - Remove item.
 */

/**
 * @description Splits passed string by words.
 * @param {string} str - Input string.
 * @returns {Array<parseObjectType>} Results array.
 */
function parse(str) {
    if (!str.length || typeof str !== 'string') {
        return [];
    }

    /** @type {Array<parseObjectType>} */
    const output = [];

    const chars = str.split(REG_EXPS.SPLIT_BY_CHAR);

    let acc = '';
    let accIndex = 0;
    let accType = null;

    let previousType = null;
    let currentType = null;
    let nextType = null;

    /**
     * @description Flushes current acc into output.
     * @param {string} [char] - Char.
     * @param {number} [index] - Index.
     * @param {string} [type] - Type.
     */
    const flush = function flush(char, index, type) {
        if (acc) {
            const item = {
                content: acc,
                index: accIndex,
                type: typesMap.get(accType),
                /**
                 * @description Next item.
                 * @returns {parseObjectType} Item.
                 */
                get next() {
                    return output[output.indexOf(item) + 1] || null;
                },
                /**
                 * @description Previous item.
                 * @returns {parseObjectType} Item.
                 */
                get previous() {
                    return output[output.indexOf(item) - 1] || null;
                },
                /**
                 * @description Remove item.
                 * @returns {void} Void.
                 */
                remove() {
                    output.splice(output.indexOf(item), 1);
                }
            };

            output.push(item);
        }

        acc = char;
        accIndex = index;
        accType = type;
    };

    chars.forEach((char, index) => {
        currentType = getCharType(char);
        nextType = getCharType(chars[index + 1] || '');

        if (!index) {
            flush(char, index, currentType);
        } else if (char === "'") {
            acc += char;
        } else if (currentType === 'SPECIAL' || currentType === 'SPACE') {
            flush(char, index, currentType);
        } else if (
            currentType === 'LOWER' &&
            (previousType === 'UPPER' || chars[index - 1] === "'")
        ) {
            acc += char;
        } else if (
            currentType === previousType &&
            (currentType !== 'UPPER' || nextType !== 'LOWER')
        ) {
            acc += char;
        } else {
            flush(char, index, currentType);
        }

        previousType = currentType;
    });

    if (acc) {
        flush();
    }

    return output;
}

export {parse};
