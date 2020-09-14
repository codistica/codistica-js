/** @module browser/classes/viewport-monitor */

import {EventEmitter} from '@codistica/core';
import {addStyles} from '../modules/element-utils/internals/add-styles.js';

// TODO: CHECK/IMPROVE/REWRITE!
// TODO: CHECK MULTI-TOUCH AWARENESS AND ZOOM BEHAVIOUR.
// TODO: FIX UNITS CORRECTION MODEL. CORRECTION MUST BE BY A COEFFICIENT (CHECK 0 BEHAVIOUR) (?)
// TODO: CHECK ALL IMPLEMENTATIONS... (WAYS IN WHICH CORRECTED UNITS ARE OFFERED TO USERS)
// TODO: TEST PERFORMANCE! AND OPTIMIZE EVENT LISTENERS ACCORDINGLY. ADD EVENT LISTENERS FOR MOBILE. ALSO FOR ROTATION. APPLY THROTTLING/DE-BOUNCING. USE TIMER TOO (5s?). WITH OPTION
// TODO: RUN ON EVENTS END (DEPENDING ON EVENTS)?

// TODO: MAKE SIMPLE! REMOVE UNNECESSARY FEATURES.

/**
 * @typedef viewportMonitorOptionsType
 * @property {number} [deltaThreshold=2] - Minimum delta value to interpretate as inconsistency.
 * @property {boolean} forcePageTop - Keep the current document at the top.
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

        if (typeof options !== 'object') {
            options = {
                deltaThreshold: 2,
                forcePageTop: false
            };
        } else {
            if (typeof options.deltaThreshold !== 'number') {
                options.deltaThreshold = 2;
                options.forcePageTop = false;
            }
        }

        this.deltaThreshold = options.deltaThreshold;
        this.forcePageTop = options.forcePageTop;

        this.measureBoxViewport = null;
        this.measureBoxPercent = null;
        this.windowRatio = null;
        this.zoom = null;
        this.scrollbar = 0;
        this.deltaVh = 0;
        this.deltaVw = 0;
        this.ratioVh = 1;
        this.ratioVw = 1;
        // TODO: MAKE BOOLEAN.
        this.minimalUI = null;

        // BIND METHODS
        this.attach = this.attach.bind(this);
        this.detach = this.detach.bind(this);
        this.viewportFix = this.viewportFix.bind(this);
        this.getViewportHeight = this.getViewportHeight.bind(this);
        this.getViewportWidth = this.getViewportWidth.bind(this);

        // APPEND MEASURE BOXES TO DOM
        // TODO: IMPROVE.
        const measureAreas = [
            {
                position: 'fixed',
                height: '100vh',
                width: '100vw',
                visibility: 'hidden',
                pointerEvents: 'none',
                zIndex: '-100',
                top: '0',
                left: '0'
            },
            {
                position: 'fixed',
                height: '100%',
                width: '100%',
                visibility: 'hidden',
                pointerEvents: 'none',
                zIndex: '-100',
                top: '0',
                left: '0'
            }
        ].map((style) => {
            let elem = document.createElement('div');
            addStyles(elem, style);
            return document.getElementsByTagName('body')[0].appendChild(elem);
        });

        this.measureBoxViewport = measureAreas[0];
        this.measureBoxPercent = measureAreas[1];

        // FIRST RUN
        this.viewportFix();

        this.attach();
    }

    /**
     * @instance
     * @description Adds event listeners.
     * @returns {void} Void.
     */
    attach() {
        // TODO: TEMP EVENT LISTENERS!
        document.addEventListener('readystatechange', this.viewportFix);
        window.addEventListener('resize', this.viewportFix);
        window.addEventListener('focus', this.viewportFix);
        window.addEventListener('scroll', this.viewportFix);
        window.addEventListener('touch', this.viewportFix);
        window.addEventListener('click', this.viewportFix);
    }

    /**
     * @instance
     * @description Removes event listeners.
     * @returns {void} Void.
     */
    detach() {
        // TODO: TEMP EVENT LISTENERS!
        document.removeEventListener('readystatechange', this.viewportFix);
        window.removeEventListener('resize', this.viewportFix);
        window.removeEventListener('focus', this.viewportFix);
        window.removeEventListener('scroll', this.viewportFix);
        window.removeEventListener('touch', this.viewportFix);
        window.removeEventListener('click', this.viewportFix);
    }

    /**
     * @instance
     * @description Measures viewport and checks for inconsistencies. Results are emitted through EventEmitter. Global CSS variables are set too.
     * @returns {void} Void.
     */
    // TODO: CHANGE NAME.
    viewportFix() {
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
        if (deltaVh <= this.deltaThreshold) {
            deltaVh = 0;
        } else {
            deltaVh = Math.round(deltaVh);
        }
        if (deltaVw <= this.deltaThreshold) {
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

            // UPDATE CSS CUSTOM PROPERTIES
            cssRoot = /** @type {HTMLElement} */ (document.querySelector(
                ':root'
            ));
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

        if (this.forcePageTop && this.zoom === 0) {
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
