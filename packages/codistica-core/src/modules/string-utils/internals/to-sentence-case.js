/** @module core/modules/string-utils/to-sentence-case */

import {capitalizeFirst} from './capitalize-first.js';
import {parse} from './parse.js';

/**
 * @description Converts passed string to sentence case.
 * @param {string} str - Input string.
 * @returns {string} Resulting string.
 */
function toSentenceCase(str) {
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

    const output = parsedString.reduce((acc, {content, index, previous}) => {
        if (!previous || /[.;!?]$/.test(previous.content)) {
            content = capitalizeFirst(content);
        } else {
            content = content.toLowerCase();
        }

        if (
            !index ||
            /[,.;!?:]/g.test(content) ||
            (previous && /[([{]/.test(previous.content)) ||
            /[)\]}]/.test(content)
        ) {
            return acc + content;
        } else {
            return acc + ' ' + content;
        }
    }, '');

    if (/[.;!?]$/.test(output)) {
        return output;
    }

    return output.replace(/[,:]*$/, '.');
}

export {toSentenceCase};
