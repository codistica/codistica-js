/** @module browser/modules/element-utils/get-inner-height */

/**
 * @description Returns passed element's inner height without padding.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element's inner height.
 */
function getInnerHeight(elem) {
    const cs = window.getComputedStyle(elem);
    const border =
        parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    const padding = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    return elem.getBoundingClientRect().height - border - padding;
}

export {getInnerHeight};
