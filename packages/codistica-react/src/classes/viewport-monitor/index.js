/** @flow */

/** @module react/classes/viewport-monitor */

import {objectUtils} from '@codistica/core';
import {EventEmitter} from 'eventemitter3';
import React from 'react';
import styles from './index.module.scss';

type HOCProps = {
    style: Object,
    children: any,
    forwardedRef: Function
};

type HOCState = {
    viewportStyle: Object
};

/**
 * @typedef viewportMonitorOptionsType
 * @property {number} [deltaThreshold=2] - Minimum delta value to interpretate as inconsistency.
 * @property {boolean} forcePageTop - Keep the current document at the top.
 */

/**
 * @typedef viewportMonitorHOCPropsType
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {*} [children=null] - React prop.
 * @property {Function} [forwardedRef=null] - React prop.
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
        (this: Function).init = this.init.bind(this);
        (this: Function).viewportFix = this.viewportFix.bind(this);
        (this: Function).getViewportHeight = this.getViewportHeight.bind(this);
        (this: Function).getViewportWidth = this.getViewportWidth.bind(this);
        (this: Function).HOC = this.HOC.bind(this);
    }

    init() {
        // TODO: MOVE TO CONSTRUCTOR AND REMOVE CALL FROM module?
        // TODO: TEST PERFORMANCE! AND OPTIMIZE EVENT LISTENERS ACCORDINGLY. ADD EVENT LISTENERS FOR MOBILE. ALSO FOR ROTATION. APPLY THROTTLING/DE-BOUNCING. USE TIMER TOO (5s?). WITH OPTION

        // APPEND MEASURE BOXES TO DOM
        const measureAreas = [
            styles.measureBoxViewport,
            styles.measureBoxPercent
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
    viewportFix(e: Object) {
        let outerMeasure = null;
        let innerMeasure = null;
        let deltaVh = null;
        let deltaVw = null;
        let ratioVh = null;
        let ratioVw = null;
        let cssRoot = null;

        if (typeof e === 'object' && e.type === 'touch') {
            e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING
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

    /**
     * @instance
     * @description Creates a higher order component with viewport units auto-correction capabilities.
     * @param {(Object<string,*>|string)} Component - React component.
     * @returns {Object<string,*>} Created higher order component.
     */
    HOC(Component: Object | string) {
        const that = this; // ALLOW THIS METHOD RETURNED HOCs TO BE TIED TO THE CLASS INSTANCE :)

        /**
         * @classdesc Higher order component.
         */
        class _HOC extends React.Component<HOCProps, HOCState> {
            static defaultProps = {
                style: {},
                children: null,
                forwardedRef: null
            };

            /**
             * @description Constructor.
             * @param {viewportMonitorHOCPropsType} [props] - Component props.
             */
            constructor(props) {
                super(props);

                // BIND METHODS
                (this: Function).onViewportChange = this.onViewportChange.bind(
                    this
                );
                (this: Function).setComponentRef = this.setComponentRef.bind(
                    this
                );

                this.state = {
                    viewportStyle: _HOC.replaceUnits(props.style)
                };
            }

            componentDidMount() {
                that.on('shift', this.onViewportChange); // TODO: DETACH ON UNMOUNT?
            }

            onViewportChange() {
                this.setState({
                    viewportStyle: _HOC.replaceUnits(this.props.style)
                });
            }

            /**
             * @instance
             * @description Save and pass component reference.
             * @param {Object<string,*>} ref - Component reference.
             * @returns {void} Void.
             */
            setComponentRef(ref) {
                // FORWARD REF
                const {forwardedRef} = this.props;
                if (typeof forwardedRef === 'function') {
                    forwardedRef(ref);
                } else if (
                    typeof forwardedRef === 'object' &&
                    forwardedRef !== null &&
                    typeof forwardedRef.current !== 'undefined'
                ) {
                    forwardedRef.current = ref;
                }
            }

            /**
             * @instance
             * @description React render method.
             * @returns {React.Component} React component.
             */
            render() {
                const {children, forwardedRef, style, ...others} = this.props;
                const {viewportStyle} = this.state;
                return (
                    <Component
                        {...others}
                        style={viewportStyle}
                        ref={this.setComponentRef}>
                        {children}
                    </Component>
                );
            }

            /**
             * @description Replace units in incoming styles.
             * @param {Object<string,*>} props - Incoming react props.
             * @returns {Object<string,*>} State update object.
             */
            static getDerivedStateFromProps(props) {
                return {
                    viewportStyle: _HOC.replaceUnits(props.style)
                };
            }

            /**
             * @description Replace viewport units in incoming styles.
             * @param {Object<string,*>} styleObj - React style object.
             * @returns {Object<string,*>} Resulting style object.
             */
            static replaceUnits(styleObj) {
                return objectUtils.forEachSync(
                    objectUtils.deepClone(styleObj),
                    (elem, API) => {
                        let newValue = elem;
                        if (typeof elem === 'string') {
                            if (that.deltaVh !== 0) {
                                newValue = newValue.replace(
                                    /(?<val>[\d.]+)vh/g,
                                    `calc($<val>vh * ${that.ratioVh})`
                                );
                            }
                            if (that.deltaVw !== 0) {
                                newValue = newValue.replace(
                                    /(?<val>[\d.]+)vw/g,
                                    `calc($<val>vw * ${that.ratioVw})`
                                );
                            }
                            if (newValue !== elem) {
                                API.replaceValue(newValue);
                            }
                        }
                    }
                );
            }
        }

        return (React: Function).forwardRef((props, ref) => {
            return <_HOC {...props} forwardedRef={ref} />;
        });
    }
}

export {ViewportMonitor};
