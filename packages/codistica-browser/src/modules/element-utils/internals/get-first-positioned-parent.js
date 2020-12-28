/** @module browser/modules/element-utils/get-first-positioned-parent */

/**
 * @description Returns passed element's first positioned parent.
 * @param {HTMLElement} elem - Element.
 * @returns {HTMLElement} Element's first positioned parent.
 */
function getFirstPositionedParent(elem) {
    let previousElem = elem;
    let currentElem = elem.parentElement;
    while (currentElem) {
        if (
            window.getComputedStyle(/** @type {Element} */ currentElem)
                .position !== 'static'
        ) {
            return currentElem;
        }
        previousElem = currentElem;
        currentElem = currentElem.parentElement;
    }
    return previousElem;
}

export {getFirstPositionedParent};
