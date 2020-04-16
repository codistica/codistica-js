/** @module core/classes/loading-bar */

import {getArithmeticMean} from '../modules/number-utils/internals/get-arithmetic-mean.js';

/**
 * @classdesc Utility class for loading progress tracking with inertia capabilities.
 */
class LoadingBar {
    /**
     * @description Constructor.
     */
    constructor() {
        this.interval = null;
        this.targetPercent = 100; // [%]
        this.eta = null; // [s]
        this.currentPercent = 0;
        this.loadingSpeed = 0; // [%/s]
        this.targetResolution = 2; // [decimals] // TODO: IMPLEMENT. DO CALCULATIONS FOR AUTO FREQUENCY ADJUSTMENT
        this.frequency = 10; // [cycle/s]
        this.iniertiaArray = []; // [%/s]
        this.inertia = 1;
    }

    start() {
        if (this.interval) {
            return;
        }
        const cycleDuration = 1000 / this.frequency; // [ms]
        let add = null;
        this.interval = setInterval(() => {
            add = (this.loadingSpeed * cycleDuration) / 1000;
            this.currentPercent += add;
            if (this.currentPercent > this.targetPercent) {
                this.currentPercent = this.targetPercent;
            }
            this.eta =
                (this.targetPercent - this.currentPercent) / this.loadingSpeed;
            if (this.currentPercent === this.targetPercent) {
                this.stop();
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
        this.eta = null; // [s]
        this.currentPercent = 0;
        this.loadingSpeed = 0; // [%/s]
        this.iniertiaArray = []; // [%/s]
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
     * @param {number} newSpeed - New loading speed [%/s].
     * @returns {void} Void.
     */
    setSpeed(newSpeed) {
        // UPDATE LOADING SPEED ARITHMETIC MEAN ARRAY
        if (this.iniertiaArray.length < this.inertia) {
            // ADD NEW VALUE
            this.iniertiaArray[this.iniertiaArray.length] = newSpeed;
        } else {
            // REMOVE OLDEST VALUE AND ADD NEW ONE
            this.iniertiaArray.shift();
            this.iniertiaArray[this.inertia - 1] = newSpeed;
        }
        // SET NEW LOADING SPEED
        this.loadingSpeed = getArithmeticMean(this.iniertiaArray);
    }

    /**
     * @instance
     * @description Updates loading bar data.
     * @param {number} newEta - New estimated time of arrival [s].
     * @returns {void} Void.
     */
    setEta(newEta) {
        this.setSpeed((100 - this.currentPercent) / newEta);
    }
}

export {LoadingBar};
