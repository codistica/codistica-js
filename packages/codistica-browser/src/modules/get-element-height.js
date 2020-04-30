/** @module browser/modules/get-element-height */

/**
 * @description Returns passed element's height considering margins.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element height.
 */
function getElementHeight(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    return elem.getBoundingClientRect().height + marginTop + marginBottom;
}

export {getElementHeight};
