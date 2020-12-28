/** @module browser/modules/element-utils/get-inner-width */

/**
 * @description Returns passed element's inner width without padding.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element's inner width.
 */
function getInnerWidth(elem) {
    const cs = window.getComputedStyle(elem);
    const border =
        parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    const padding = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    return elem.getBoundingClientRect().width - border - padding;
}

export {getInnerWidth};
