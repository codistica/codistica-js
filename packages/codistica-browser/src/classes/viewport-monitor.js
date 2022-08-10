/** @module browser/classes/viewport-monitor */

import {EventEmitter} from '@codistica/core';
import {Types} from '@codistica/types';
import {addStyles} from '../modules/element-utils/internals/add-styles.js';

// TODO: CHECK/IMPROVE/REWRITE!
// TODO: CHECK MULTI-TOUCH AWARENESS AND ZOOM BEHAVIOR.

// TODO: IMPORTANT. FIX UNITS CORRECTION MODEL. CORRECTION MUST BE BY A COEFFICIENT (CHECK 0 BEHAVIOR) (?)
// TODO: CREATE DEMOS IN @codistica/demo

// TODO: CHECK EVENTS.
// TODO: CHECK ALL IMPLEMENTATION STRATEGIES... (WAYS IN WHICH CORRECTED UNITS ARE OFFERED TO USERS)
// TODO: TEST PERFORMANCE! AND OPTIMIZE EVENT LISTENERS ACCORDINGLY. ADD EVENT LISTENERS FOR MOBILE. ALSO FOR ROTATION. APPLY THROTTLING/DE-BOUNCING. USE TIMER TOO (5s?). WITH OPTION
// TODO: RUN ON EVENTS END (DEPENDING ON EVENTS)?

// TODO: MAKE SIMPLE! REMOVE UNNECESSARY FEATURES.

// TODO: ADD getMinViewportHeight AND getMinViewportWidth.
// TODO: ADD getMaxViewportHeight AND getMaxViewportWidth.

// TODO: CREATE HOOK IN @codistica/react

// TODO: IMPROVE NAMING. (ESPECIALLY EVENT EMITTER NAMES! 'change', 'shift'... MAKE THEM MORE INDICATIVE).
// TODO: CREATE onEnd VERSION OF EMITTED EVENTS. CUSTOMIZABLE THRESHOLD.
// TODO: DO NOT LET STRANGE EVENTS POLLUTE USABLE EMITTED EVENTS (LIKE onClick HANDLING MAKING change FIRE).

// TODO: USE capture?

// TODO: CHECK AND ADJUST ALL USAGES.

// TODO: AVOID USING DUMMY ELEMENTS TO MAKE MEASUREMENTS. ESPECIALLY POSITION FIXED ONES. SEE VIEWPORT PROJECT FOR ALTERNATIVES.
// TODO: PLACE AND REMOVE ELEMENTS ONLY WHEN NEEDED?

const viewportMonitorTypes = new Types({
    options: {
        type: 'Object',
        def: {
            deltaThreshold: {type: 'number', def: 2},
            forcePageTop: {type: 'boolean', def: false},
            CSSCustomProperties: {type: 'boolean', def: false}
        }
    }
});

/**
 * @typedef viewportMonitorOptionsType
 * @property {number} [deltaThreshold=2] - Minimum delta value to interpretate as inconsistency.
 * @property {boolean} [forcePageTop=false] - Keep the current document at the top.
 * @property {boolean} [CSSCustomProperties=false] - Set CSS custom properties with corrected viewport units.
 */

/**
 * @classdesc Utility class to handle viewport units inconsistencies.
 */
class ViewportMonitor extends EventEmitter {
    /**
     * @description Constructor.
     * @param {viewportMonitorOptionsType} [options] - Viewport handling options.
     */
    constructor(options) {
        super();

        ({options} = viewportMonitorTypes.validate({options}));

        this.optons = options;

        this.measureBoxViewport = null;
        this.measureBoxPercent = null;
        this.windowRatio = null;
        this.zoom = null;
        this.scrollbar = 0;
        this.deltaVh = 0;
        this.deltaVw = 0;
        this.ratioVh = 1;
        this.ratioVw = 1;
        this.minimalUI = null;

        // BIND METHODS
        this.attach = this.attach.bind(this);
        this.detach = this.detach.bind(this);
        this.handler = this.handler.bind(this);
        this.getViewportHeight = this.getViewportHeight.bind(this);
        this.getViewportWidth = this.getViewportWidth.bind(this);

        // APPEND MEASURE BOXES TO DOM
        const commonStyles = {
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: '-10000',
            top: '0',
            left: '0'
        };

        const measureAreas = [
            {
                ...commonStyles,
                height: '100vh',
                width: '100vw'
            },
            {
                ...commonStyles,
                height: '100%',
                width: '100%'
            }
        ].map((style) => {
            const elem = document.createElement('div');
            addStyles(elem, style);
            return document.getElementsByTagName('body')[0].appendChild(elem);
        });

        this.measureBoxViewport = measureAreas[0];
        this.measureBoxPercent = measureAreas[1];

        this.attach();
    }

    /**
     * @instance
     * @description Adds event listeners.
     * @returns {void} Void.
     */
    attach() {
        this.handler();

        document.addEventListener('readystatechange', this.handler);
        window.addEventListener('resize', this.handler);
        window.addEventListener('focus', this.handler);
        window.addEventListener('scroll', this.handler); // TODO: CHECK IF FIRES IN STORYBOOK WITHOUT USING capture.
        window.addEventListener('touch', this.handler);
        window.addEventListener('click', this.handler);
    }

    /**
     * @instance
     * @description Removes event listeners.
     * @returns {void} Void.
     */
    detach() {
        document.removeEventListener('readystatechange', this.handler);
        window.removeEventListener('resize', this.handler);
        window.removeEventListener('focus', this.handler);
        window.removeEventListener('scroll', this.handler);
        window.removeEventListener('touch', this.handler);
        window.removeEventListener('click', this.handler);
    }

    /**
     * @instance
     * @description Measures viewport and checks for inconsistencies. Results are emitted through EventEmitter. Global CSS variables are set too.
     * @returns {void} Void.
     */
    handler() {
        let outerMeasure = null;
        let innerMeasure = null;
        let deltaVh = null;
        let deltaVw = null;
        let ratioVh = null;
        let ratioVw = null;
        let cssRoot = null;

        // GET WINDOW RATIO
        this.windowRatio = window.innerHeight / window.innerWidth;

        // CALCULATE ZOOM
        this.zoom = 1 - window.innerWidth / this.measureBoxViewport.offsetWidth; // MEASURING ZOOM USING Y AXIS IS NO RELIABLE BECAUSE OF BROWSER'S DYNAMIC UIs

        // GET SCROLLBAR WIDTH
        this.scrollbar =
            this.measureBoxViewport.offsetWidth -
            this.measureBoxPercent.offsetWidth;

        // CALCULATE VIEWPORT DELTA AND VIEWPORT RATIO

        // VH
        outerMeasure = this.measureBoxViewport.offsetHeight;
        innerMeasure =
            window.innerHeight +
            this.zoom * this.measureBoxViewport.offsetWidth * this.windowRatio;
        deltaVh = outerMeasure - innerMeasure;
        ratioVh = innerMeasure / outerMeasure;

        // VW
        outerMeasure = this.measureBoxViewport.offsetWidth;
        innerMeasure =
            window.innerWidth +
            this.zoom * this.measureBoxViewport.offsetWidth -
            this.scrollbar;
        deltaVw = outerMeasure - innerMeasure;
        ratioVw = innerMeasure / outerMeasure;

        // NORMALIZE RESULTS
        if (deltaVh <= this.optons.deltaThreshold) {
            deltaVh = 0;
        } else {
            deltaVh = Math.round(deltaVh);
        }
        if (deltaVw <= this.optons.deltaThreshold) {
            deltaVw = 0;
        } else {
            deltaVw = Math.round(deltaVw);
        }

        if (
            this.zoom >= 0 &&
            (this.deltaVh !== deltaVh || this.deltaVw !== deltaVw)
        ) {
            this.deltaVh = deltaVh;
            this.deltaVw = deltaVw;
            this.ratioVh = ratioVh;
            this.ratioVw = ratioVw;

            if (this.optons.CSSCustomProperties) {
                // UPDATE CSS CUSTOM PROPERTIES
                cssRoot = /** @type {HTMLElement} */ (
                    document.querySelector(':root')
                );
                if (cssRoot && cssRoot.style) {
                    cssRoot.style.setProperty(
                        '--vh',
                        `calc(1vh * ${this.ratioVh})`
                    );
                    cssRoot.style.setProperty(
                        '--vw',
                        `calc(1vw * ${this.ratioVw})`
                    );
                }
            }

            // DETECT MINIMAL UI
            this.minimalUI =
                this.deltaVh === 0 && this.deltaVw - this.scrollbar === 0;

            // EMIT 'shift' EVENT
            this.emit('shift', {
                windowRatio: this.windowRatio,
                zoom: this.zoom,
                scrollbar: this.scrollbar,
                deltaVh: this.deltaVh,
                deltaVw: this.deltaVw,
                ratioVh: this.ratioVh,
                ratioVw: this.ratioVw,
                minimalUI: this.minimalUI
            });
        }

        // TODO: EXTRACT TO ANOTHER UTILITY. TO HOC?
        if (this.optons.forcePageTop && this.zoom === 0) {
            document.documentElement.scrollTop = 0;
            document.getElementsByTagName('body')[0].scrollTop = 0;
        }

        // EMIT 'change' EVENT
        this.emit('change', {
            windowRatio: this.windowRatio,
            zoom: this.zoom,
            scrollbar: this.scrollbar,
            deltaVh: this.deltaVh,
            deltaVw: this.deltaVw,
            ratioVh: this.ratioVh,
            ratioVw: this.ratioVw,
            minimalUI: this.minimalUI
        });
    }

    /**
     * @instance
     * @description Returns the corrected viewport height.
     * @returns {number} Viewport height.
     */
    getViewportHeight() {
        return this.measureBoxViewport.offsetHeight - this.deltaVh;
    }

    /**
     * @instance
     * @description Returns the corrected viewport width.
     * @returns {number} Viewport width.
     */
    getViewportWidth() {
        return this.measureBoxViewport.offsetWidth - this.deltaVw;
    }
}

export {ViewportMonitor};
