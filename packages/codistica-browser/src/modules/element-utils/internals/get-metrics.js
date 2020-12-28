/** @module browser/modules/element-utils/get-metrics */

/**
 * @typedef getMetricsOutput
 * @property {number} height - Height.
 * @property {number} width - Width.
 * @property {number} top - Top.
 * @property {number} left - Left.
 * @property {number} marginTop - Margin top.
 * @property {number} marginRight - Margin right.
 * @property {number} marginBottom - Margin bottom.
 * @property {number} marginLeft - Margin left.
 * @property {number} borderTop - Border top.
 * @property {number} borderRight - Border right.
 * @property {number} borderBottom - Border bottom.
 * @property {number} borderLeft - Border left.
 * @property {number} paddingTop - Padding top.
 * @property {number} paddingRight - Padding right.
 * @property {number} paddingBottom - Padding bottom.
 * @property {number} paddingLeft - Padding left.
 */

/**
 * @description Returns passed element's computed metrics.
 * @param {HTMLElement} elem - Element.
 * @returns {getMetricsOutput} Element's computed metrics.
 */
function getMetrics(elem) {
    const rect = elem.getBoundingClientRect();
    const cs = window.getComputedStyle(elem);
    const borderTop = parseFloat(cs.borderTop);
    const borderRight = parseFloat(cs.borderRight);
    const borderBottom = parseFloat(cs.borderBottom);
    const borderLeft = parseFloat(cs.borderLeft);
    return {
        height: rect.height - borderTop - borderBottom,
        width: rect.width - borderLeft - borderRight,
        top: rect.top + borderTop,
        left: rect.left + borderLeft,
        marginTop: parseFloat(cs.marginTop),
        marginRight: parseFloat(cs.marginRight),
        marginBottom: parseFloat(cs.marginBottom),
        marginLeft: parseFloat(cs.marginLeft),
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        paddingTop: parseFloat(cs.paddingTop),
        paddingRight: parseFloat(cs.paddingRight),
        paddingBottom: parseFloat(cs.paddingBottom),
        paddingLeft: parseFloat(cs.paddingLeft)
    };
}

export {getMetrics};
