/** @module browser/modules/element-utils/add-styles */

/**
 * @description Adds passed styles to specified DOM element.
 * @param {HTMLElement} elem - Element.
 * @param {Object<string,(string|null)>} styles - Styles to be added.
 * @returns {void} Void.
 */
function addStyles(elem, styles) {
    for (const i in styles) {
        if (!Object.prototype.hasOwnProperty.call(styles, i)) {
            continue;
        }
        elem.style[i] = styles[i] === null ? '' : styles[i];
    }
}

export {addStyles};
