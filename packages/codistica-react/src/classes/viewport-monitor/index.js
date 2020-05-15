/** @flow */

/** @module react/classes/viewport-monitor */

import {EventEmitter} from 'eventemitter3';
import componentClassNames from './index.module.scss';

// TODO: MAKE STYLES IN JS. DROP SCSS FILE AND REMOVE WRAPPING DIRECTORY.
// TODO: USE mount/unmount PATTERN LIKE WITH OverscrollMonitor.
// TODO: FIX STYLE REPLACEMENT. ERROR WRITING TO read-only? CREATE DEEP CLONE FUNCTION? FIX ALL objectUtils? AND ADJUST USAGE (IN codistica AND PROJECTS, CHECK)
// TODO: FIX UNITS CORRECTION MODEL. CORRECTION MUST BE BY A COEFFICIENT (CHECK 0 BEHAVIOUR)
// TODO: TEST PERFORMANCE! AND OPTIMIZE EVENT LISTENERS ACCORDINGLY. ADD EVENT LISTENERS FOR MOBILE. ALSO FOR ROTATION. APPLY THROTTLING/DE-BOUNCING. USE TIMER TOO (5s?). WITH OPTION

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
     * @param {viewportMonitorOptionsType} [options] - Overscroll handling options.
     */
    constructor(options: {deltaThreshold: number, forcePageTop: boolean}) {
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
        this.minimalUI = null;

        // BIND METHODS
        (this: any).viewportFix = this.viewportFix.bind(this);
        (this: any).getViewportHeight = this.getViewportHeight.bind(this);
        (this: any).getViewportWidth = this.getViewportWidth.bind(this);

        // APPEND MEASURE BOXES TO DOM
        const measureAreas = [
            componentClassNames.measureBoxViewport,
            componentClassNames.measureBoxPercent
        ].map((className) => {
            let elem = document.createElement('div');
            elem.className = className;
            return document.getElementsByTagName('body')[0].appendChild(elem);
        });

        this.measureBoxViewport = measureAreas[0];
        this.measureBoxPercent = measureAreas[1];

        // FIRST RUN
        this.viewportFix();

        // ADD EVENT LISTENERS // TODO: TEMP EVENT LISTENERS!
        document.addEventListener('readystatechange', this.viewportFix);
        window.addEventListener('resize', this.viewportFix);
        window.addEventListener('focus', this.viewportFix);
        window.addEventListener('scroll', this.viewportFix);
        window.addEventListener('touch', this.viewportFix);
        window.addEventListener('click', this.viewportFix);
    }

    /**
     * @instance
     * @description Measures viewport and checks for inconsistencies. Results are emitted through EventEmitter. Global CSS variables are set too.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    viewportFix(e?: {[string]: any}) {
        let outerMeasure = null;
        let innerMeasure = null;
        let deltaVh = null;
        let deltaVw = null;
        let ratioVh = null;
        let ratioVw = null;
        let cssRoot = null;

        if (typeof e === 'object' && e.type === 'touch') {
            e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING // TODO: REMOVE?
        }

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
            cssRoot = document.querySelector(':root');
            if (cssRoot) {
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
            (document.documentElement || {}).scrollTop = 0;
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
