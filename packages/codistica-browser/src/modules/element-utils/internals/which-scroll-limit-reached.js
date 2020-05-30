/** @module browser/modules/element-utils/which-scroll-limit-reached */

/**
 * @description Indicates which scrolling limit has been reached if any.
 * @param {HTMLElement} elem - Element.
 * @param {number} deltaX - Scroll deltaX.
 * @param {number} deltaY - Scroll deltaY.
 * @returns {(string|null)} Result.
 */
function whichScrollLimitReached(elem, deltaX, deltaY) {
    const directionX = deltaX ? Math.sign(deltaX) : null;
    const directionY = deltaY ? Math.sign(deltaY) : null;
    if (!elem) {
        return null;
    }
    if (elem.scrollTop <= 0 && directionY === -1) {
        return 'top';
    } else if (
        elem.scrollTop + elem.clientHeight >= elem.scrollHeight - 1 &&
        directionY === 1
    ) {
        return 'bottom';
    } else if (elem.scrollLeft <= 0 && directionX === -1) {
        return 'left';
    } else if (
        elem.scrollLeft + elem.clientWidth >= elem.scrollWidth - 1 &&
        directionX === 1
    ) {
        return 'right';
    } else {
        return null;
    }
}

export {whichScrollLimitReached};
