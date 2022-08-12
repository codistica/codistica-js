import {assert} from 'chai';
import {LoadingBar} from './loading-bar.js';

/** @see module:core/classes/loading-bar */

// TODO: PERHAPS A OVERALL TEST AFTERWARDS.
// TODO: LOADING BAR SHOULD CLEAR INTERVAL ON RESET.
/**
 * @description Creates a testing loading bar.
 * @returns {LoadingBar} - Test loading bar.
 */
const getTestLoadingBar = () => {
    // LOADING BAR AT 10%/ms
    const outputLoadingBar = new LoadingBar();
    outputLoadingBar.setSpeed(1000);
    // CYCLE EVERY 10 ms
    outputLoadingBar.frequency = 100;
    return outputLoadingBar;
};

describe('LoadingBar', () => {
    describe('start()', () => {
        it('Should start the loading bar.', () => {
            const loadingBar = new LoadingBar();
            assert.doesNotThrow(() => {
                loadingBar.start();
            });
            loadingBar.stop();
        });
        it('Should not re-start an started loading bar', async () => {
            const loadingBar = getTestLoadingBar();
            loadingBar.start();
            // WAIT 3 UPDATE CYCLES
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    (3 * loadingBar.loadingSpeed) / loadingBar.frequency
                )
            );
            loadingBar.start();
            assert.isAtLeast(loadingBar.currentPercent, 20);
            loadingBar.stop();
        });
    });
    describe('reset()', () => {
        it('Should reset the loading bar.', async () => {
            const loadingBar = getTestLoadingBar();
            loadingBar.start();
            // WAIT 2 UPDATE CYCLES
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    (2 * loadingBar.loadingSpeed) / loadingBar.frequency
                )
            );
            // TODO: MAKE RESET TO ALSO CLEAR INTERVAL ON MAIN SO STOP IS NOT NECESSARY
            loadingBar.stop();
            loadingBar.reset();
            assert.strictEqual(loadingBar.currentPercent, 0);
            // WAIT 1 UPDATE CYCLES
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    (2 * loadingBar.loadingSpeed) / loadingBar.frequency
                )
            );
            assert.strictEqual(loadingBar.currentPercent, 0);
            assert.strictEqual(loadingBar.loadingSpeed, 0);
        });
    });
    describe('stop()', () => {
        it('Should stop the loading bar.', async () => {
            const loadingBar = getTestLoadingBar();
            loadingBar.start();
            // WAIT 2 UPDATE CYCLES
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    (2 * loadingBar.loadingSpeed) / loadingBar.frequency
                )
            );
            loadingBar.stop();
            const currentPercent = loadingBar.currentPercent;
            // WAIT 2 CYCLES
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    (2 * loadingBar.loadingSpeed) / loadingBar.frequency
                )
            );
            assert.strictEqual(loadingBar.currentPercent, currentPercent);
        });
        it('Should do nothing to a non-started loading bar', () => {
            const loadingBar = getTestLoadingBar();
            assert.doesNotThrow(() => loadingBar.stop());
            assert.strictEqual(loadingBar.currentPercent, 0);
        });
    });
    describe('setTarget()', () => {
        it('Should change the percentage target.', () => {
            const loadingBar = getTestLoadingBar();
            loadingBar.setTarget(50);
            assert.strictEqual(loadingBar.targetPercent, 50);
        });
    });
    describe('setSpeed()', () => {
        it('Should set speed without inertia.', () => {
            const loadingBar = getTestLoadingBar();
            assert.strictEqual(loadingBar.loadingSpeed, 1000);
            loadingBar.setSpeed(20);
            assert.strictEqual(loadingBar.loadingSpeed, 20);
        });
        it('Should set speed with inertia.', () => {
            const loadingBar = getTestLoadingBar();
            loadingBar.inertia = 2;
            assert.strictEqual(loadingBar.loadingSpeed, 1000);
            loadingBar.setSpeed(2000);
            assert.strictEqual(loadingBar.loadingSpeed, 1500);
        });
    });
    describe('setEta()', () => {
        it('Should set a new speed through eta.', () => {
            const loadingBar = getTestLoadingBar();
            assert.doesNotThrow(() => {
                loadingBar.setEta(0.1);
            });
        });
    });
});
