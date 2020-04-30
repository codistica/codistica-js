/** @module browser/modules/get-element-width */

/**
 * @description Returns passed element's width considering margins.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element width.
 */
function getElementWidth(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const marginLeft = parseFloat(computedStyle.marginLeft);
    const marginRight = parseFloat(computedStyle.marginRight);
    return elem.getBoundingClientRect().height + marginLeft + marginRight;
}

export {getElementWidth};
