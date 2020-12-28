/** @module browser/modules/element-utils/get-outer-width */

/**
 * @description Returns passed element's outer width including margins.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element's outer width.
 */
function getOuterWidth(elem) {
    const cs = window.getComputedStyle(elem);
    return (
        elem.getBoundingClientRect().width +
        parseFloat(cs.marginLeft) +
        parseFloat(cs.marginRight)
    );
}

export {getOuterWidth};
