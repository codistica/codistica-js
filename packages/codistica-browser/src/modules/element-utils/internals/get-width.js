/** @module browser/modules/element-utils/get-width */

/**
 * @description Returns passed element's width considering margins.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element width.
 */
function getWidth(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const marginLeft = parseFloat(computedStyle.marginLeft);
    const marginRight = parseFloat(computedStyle.marginRight);
    return elem.getBoundingClientRect().width + marginLeft + marginRight;
}

export {getWidth};
