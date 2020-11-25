/** @module browser/classes/overscroll-blocker */

import {Types} from '@codistica/types';
import {canScrollX} from '../modules/element-utils/internals/can-scroll-x.js';
import {canScrollY} from '../modules/element-utils/internals/can-scroll-y.js';
import {whichScrollLimitReached} from '../modules/element-utils/internals/which-scroll-limit-reached.js';

// TODO: FIX STICKY ON LIMITS IN FIREFOX. (TRY THROTTLING! FIREFOX SEEMS TO CONTINUE FIRING WHEEL EVENTS WHEN OTHER BROWSERS DONT).
// TODO: TRY FIXING ISSUE WHEN TRYING TO SCROLL DIAGONALLY AGAINST A LIMIT. NON LIMIT-REACHED AXIS GETS BLOCKED TOO. (SET SCROLL MANUALLY WHEN DEFAULT PREVENTED? OPTIONALLY).

const overscrollBlockerSchema = new Types({
    options: {
        type: 'Object',
        def: {
            blockX: {type: 'boolean', def: true},
            blockY: {type: 'boolean', def: true},
            contentAware: {type: 'boolean', def: false}
        }
    }
});

/**
 * @typedef overscrollBlockerOptionsType
 * @property {boolean} [blockX=true] - Block overscroll on X axis.
 * @property {boolean} [blockY=true] - Block overscroll on Y axis.
 * @property {boolean} [contentAware=false] - Traverse DOM searching for other scrollable elements to take into consideration.
 */

/**
 * @classdesc Utility class to handle overscroll effect.
 */
class OverscrollBlocker {
    /**
     * @description Constructor.
     * @param {overscrollBlockerOptionsType} [options] - Overscroll handling options.
     */
    constructor(options) {
        ({options} = overscrollBlockerSchema.validate({options}));

        this.touchPos = {
            x: 0,
            y: 0
        };

        this.isMultiTouch = false;

        /** @type {overscrollBlockerOptionsType} */
        this.options = options;

        // BIND METHODS
        this.handler = this.handler.bind(this);
        this.shouldBlock = this.shouldBlock.bind(this);
    }

    /**
     * @instance
     * @description Handler.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    handler(e) {
        if (!e.cancelable || this.isMultiTouch) {
            return;
        }

        const delta = {
            x: null,
            y: null
        };

        // NORMALIZE EVENT
        switch (e.type) {
            case 'touchstart':
                this.touchPos.x = e.touches[0].screenX;
                this.touchPos.y = e.touches[0].screenY;
                this.isMultiTouch = e.touches.length > 1;
                return;
            case 'touchmove':
                delta.x = this.touchPos.x - e.touches[0].screenX;
                delta.y = this.touchPos.y - e.touches[0].screenY;
                this.touchPos.x = e.touches[0].screenX;
                this.touchPos.y = e.touches[0].screenY;
                break;
            case 'touchend':
                this.touchPos.x = 0;
                this.touchPos.y = 0;
                this.isMultiTouch = e.touches.length > 1;
                return;
            case 'wheel':
                delta.x = e.deltaX;
                delta.y = e.deltaY;
                break;
            default:
                // NO VALID EVENT
                return;
        }

        if (this.options.contentAware) {
            let currentElem = e.target;
            let flag = true;
            do {
                if (!this.shouldBlock(currentElem, delta.x, delta.y)) {
                    return;
                }
                if (currentElem === e.currentTarget) {
                    flag = false;
                } else {
                    currentElem = currentElem.parentElement;
                }
            } while (currentElem && flag);
            e.preventDefault();
        } else {
            if (this.shouldBlock(e.currentTarget, delta.x, delta.y)) {
                e.preventDefault();
            }
        }
    }

    /**
     * @instance
     * @description Determines if current action should be blocked for passed element.
     * @param {HTMLElement} elem - Element.
     * @param {number} deltaX - Action deltaX.
     * @param {number} deltaY - Action deltaY.
     * @returns {boolean} Result.
     */
    shouldBlock(elem, deltaX, deltaY) {
        const limitReached = whichScrollLimitReached(elem, deltaX, deltaY);

        if (
            this.options.blockX &&
            deltaX &&
            (!canScrollX(elem) ||
                limitReached === 'left' ||
                limitReached === 'right')
        ) {
            return true;
        } else if (
            this.options.blockY &&
            deltaY &&
            (!canScrollY(elem) ||
                limitReached === 'top' ||
                limitReached === 'bottom')
        ) {
            return true;
        }

        return false;
    }
}

export {OverscrollBlocker};
