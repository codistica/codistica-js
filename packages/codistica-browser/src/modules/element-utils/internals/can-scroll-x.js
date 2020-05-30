/** @module browser/modules/element-utils/can-scroll-x */

/**
 * @description Determines if element can scroll horizontally.
 * @param {HTMLElement} elem - Element.
 * @returns {boolean} Result.
 */
function canScrollX(elem) {
    const computedStyle = window.getComputedStyle(elem);
    return !(
        computedStyle.overflowX === 'hidden' ||
        computedStyle.overflowX === 'visible' ||
        elem.clientWidth === elem.scrollWidth
    );
}

export {canScrollX};
