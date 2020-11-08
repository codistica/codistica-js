/** @module core/classes/loading-bar */

import {getArithmeticMean} from '../modules/number-utils/internals/get-arithmetic-mean.js';

// TODO: IS THIS REALLY NECESSARY? WHY NOT MAKE BAR ALWAYS FOLLOW REAL PERCENT AND CREATE A GENERIC REUSABLE SMOOTHER FOR ETA. IMPORTANT!!!

// TODO: PREVENT FROM LOOPING ETERNALLY.
// TODO: RECEIVE ALSO REAL PERCENT FOR WHEN ETA IS NOT AVAILABLE.
// TODO: ADD METHOD TO USE REAL PERCENT TO RECENTER BAR.
// TODO: RECEIVE DONE WORK TOO (EX. 1 of 110)
// TODO: PLACING BIGGEST FILES FIRST COULD HELP WITH PERFORMANCE CALCULATIONS.

/**
 * @typedef loadingBarOptionsType
 * @property {number} inertia - Loading bar inertia.
 * @property {(Function|null)} callback - Callback.
 */

/**
 * @classdesc Utility class for loading progress tracking with inertia capabilities.
 */
class LoadingBar {
    /**
     * @description Constructor.
     * @param {loadingBarOptionsType} options - LoadingBar options.
     */
    constructor(options) {
        if (typeof options === 'object') {
            /** @type {loadingBarOptionsType} */
            this.options = options;

            this.options.inertia =
                typeof options.inertia === 'number' ? options.inertia : 1;

            this.options.callback =
                typeof options.callback === 'function'
                    ? options.callback
                    : null;
        } else {
            /** @type {loadingBarOptionsType} */
            this.options = {
                inertia: 1,
                callback: null
            };
        }

        this.interval = null;
        this.targetPercent = 100; // [%]
        this.eta = null; // [ms]
        this.currentPercent = 0; // [%]
        this.loadingSpeed = 0; // [%/ms]
        this.targetResolution = 2; // [decimals] // TODO: IMPLEMENT. DO CALCULATIONS FOR AUTO FREQUENCY ADJUSTMENT
        this.frequency = 0.01; // [cycle/ms]
        this.speedsArray = []; // [%/ms]
        this.inertia = this.options.inertia;
    }

    start() {
        if (this.interval) {
            return;
        }
        const cycleDuration = 1 / this.frequency; // [ms]
        let add = null;
        this.interval = setInterval(() => {
            add = this.loadingSpeed * cycleDuration;
            this.currentPercent += add;
            if (this.currentPercent > this.targetPercent) {
                this.currentPercent = this.targetPercent;
            }
            this.eta =
                (this.targetPercent - this.currentPercent) / this.loadingSpeed;
            if (this.currentPercent === this.targetPercent) {
                this.stop();
            }
            if (this.options.callback) {
                this.options.callback(this.currentPercent);
            }
        }, cycleDuration);
    }

    stop() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.interval = null;
        this.targetPercent = 100; // [%]
        this.eta = null; // [ms]
        this.currentPercent = 0; // [%]
        this.loadingSpeed = 0; // [%/ms]
        this.speedsArray = []; // [%/ms]
    }

    /**
     * @instance
     * @description Set new target percent.
     * @param {number} newTargetPercent - New target percent [%].
     * @returns {void} Void.
     */
    setTarget(newTargetPercent) {
        this.targetPercent = newTargetPercent;
    }

    /**
     * @instance
     * @description Set new loading bar speed.
     * @param {number} newSpeed - New loading speed [%/ms].
     * @returns {void} Void.
     */
    setSpeed(newSpeed) {
        // UPDATE LOADING SPEED ARITHMETIC MEAN ARRAY
        if (this.speedsArray.length < this.inertia) {
            // ADD NEW VALUE
            this.speedsArray[this.speedsArray.length] = newSpeed;
        } else {
            // REMOVE OLDEST VALUE AND ADD NEW ONE
            this.speedsArray.shift();
            this.speedsArray[this.inertia - 1] = newSpeed;
        }
        // SET NEW LOADING SPEED
        this.loadingSpeed = getArithmeticMean(this.speedsArray);
    }

    /**
     * @instance
     * @description Updates loading bar data.
     * @param {number} newEta - New estimated time of arrival [ms].
     * @returns {void} Void.
     */
    setEta(newEta) {
        this.setSpeed((100 - this.currentPercent) / newEta);
    }
}

export {LoadingBar};
