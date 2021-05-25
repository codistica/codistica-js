/** @module browser/modules/get-scrolling-element */

/**
 * @description Gets document's scrolling element.
 * @returns {Element} - Scrolling element.
 */
function getScrollingElement() {
    const body = document.getElementsByTagName('BODY')[0];
    const html = body ? body.parentElement : null;
    const scrollingElement = document.scrollingElement;
    return scrollingElement || html || body;
}

export {getScrollingElement};
