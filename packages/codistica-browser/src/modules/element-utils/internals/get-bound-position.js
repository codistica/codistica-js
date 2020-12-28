/** @module browser/modules/element-utils/get-bound-position */

import {numberUtils} from '@codistica/core';
import {viewportMonitor} from '../../viewport-monitor.js';
import {getFirstPositionedParent} from './get-first-positioned-parent.js';
import {getMetrics} from './get-metrics.js';
import {getOuterHeight} from './get-outer-height.js';
import {getOuterWidth} from './get-outer-width.js';

/**
 * @typedef getBoundPositionInput
 * @property {number} top - Top.
 * @property {number} left - Left.
 * @property {HTMLElement} elem - Element.
 * @property {('none'|'parent'|'viewport'|HTMLElement|null)} boundary - Boundary.
 */

/**
 * @typedef getBoundPositionOutput
 * @property {number} top - Top.
 * @property {number} left - Left.
 */

/**
 * @description Clamps passed position based on specified boundary.
 * @param {getBoundPositionInput} input - Input.
 * @returns {getBoundPositionOutput} Element's clamped position.
 */
function getBoundPosition(input) {
    const {top, left, elem, boundary} = input;
    if (boundary && boundary !== 'none') {
        let minTop = null;
        let minLeft = null;
        let travelTop = null;
        let travelLeft = null;
        let maxTop = null;
        let maxLeft = null;

        const offsetParentMetrics = getMetrics(getFirstPositionedParent(elem));

        if (boundary === 'viewport') {
            minTop = -offsetParentMetrics.top;
            minLeft = -offsetParentMetrics.left;
            travelTop = viewportMonitor.getViewportHeight();
            travelLeft = viewportMonitor.getViewportWidth();
        } else {
            const boundaryMetrics = getMetrics(
                boundary === 'parent' ? elem.parentElement : boundary
            );

            minTop =
                boundaryMetrics.top +
                boundaryMetrics.paddingTop -
                offsetParentMetrics.top;
            minLeft =
                boundaryMetrics.left +
                boundaryMetrics.paddingLeft -
                offsetParentMetrics.left;

            travelTop =
                boundaryMetrics.height -
                boundaryMetrics.paddingTop -
                boundaryMetrics.paddingBottom;
            travelLeft =
                boundaryMetrics.width -
                boundaryMetrics.paddingLeft -
                boundaryMetrics.paddingRight;
        }

        maxTop = minTop + travelTop - getOuterHeight(elem);
        maxLeft = minLeft + travelLeft - getOuterWidth(elem);

        return {
            top: numberUtils.clamp(top, minTop, maxTop),
            left: numberUtils.clamp(left, minLeft, maxLeft)
        };
    }

    return {top, left};
}

export {getBoundPosition};
