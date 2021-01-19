/** @module core/modules/string-utils/to-title-case */

import {capitalizeFirst} from './capitalize-first.js';
import {parse} from './parse.js';

/**
 * @description Converts passed string to title case.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toTitleCase(str) {
    const parsedString = parse(str);

    parsedString.forEach(({content, type, previous, next, remove}) => {
        if (content === '-') {
            if (
                previous &&
                previous.content !== '-' &&
                previous.type !== 'SPACE' &&
                next &&
                next.content !== '-' &&
                next.type !== 'SPACE'
            ) {
                remove();
            }
        }
        if (type === 'SPACE') {
            remove();
        }
    });

    return parsedString.reduce((acc, {content, index, previous}) => {
        if (
            !index ||
            /[,.;!?:]/g.test(content) ||
            (previous && /[([{]/.test(previous.content)) ||
            /[)\]}]/.test(content)
        ) {
            return acc + capitalizeFirst(content);
        } else {
            return acc + ' ' + capitalizeFirst(content);
        }
    }, '');
}

export {toTitleCase};
