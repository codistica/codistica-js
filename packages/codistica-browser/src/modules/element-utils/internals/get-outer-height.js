/** @module browser/modules/element-utils/get-outer-height */

/**
 * @description Returns passed element's outer height including margins.
 * @param {HTMLElement} elem - Element.
 * @returns {number} Element's outer height.
 */
function getOuterHeight(elem) {
    const cs = window.getComputedStyle(elem);
    return (
        elem.getBoundingClientRect().height +
        parseFloat(cs.marginTop) +
        parseFloat(cs.marginBottom)
    );
}

export {getOuterHeight};
