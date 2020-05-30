/** @module browser/modules/element-utils/get-height */

/**
 * @description Returns passed element's height considering margins.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element height.
 */
function getHeight(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    return elem.getBoundingClientRect().height + marginTop + marginBottom;
}

export {getHeight};
