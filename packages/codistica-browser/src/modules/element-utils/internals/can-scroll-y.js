/** @module browser/modules/element-utils/can-scroll-y */

/**
 * @description Determines if element can scroll vertically.
 * @param {HTMLElement} elem - Element.
 * @returns {boolean} Result.
 */
function canScrollY(elem) {
    const computedStyle = window.getComputedStyle(elem);
    return !(
        computedStyle.overflowY === 'hidden' ||
        computedStyle.overflowY === 'visible' ||
        elem.clientHeight === elem.scrollHeight
    );
}

export {canScrollY};
