/** @flow */

import React, {useEffect, useRef} from 'react';
import {default as SineWaves} from 'sine-waves';
import componentClassNames from './index.module.scss';

// TODO: MAKE OWN WAVES PACKAGE! (@codistica/waves?) (FROM CLONED REPOSITORY).
// TODO: CLEAN AND CUSTOMIZE.
// TODO: MAKE RESPONSIVE IF POSSIBLE.

/**
 * @description Waves component.
 * @returns {Object<string,*>} React component.
 */
function Waves() {
    const canvasRef = useRef(null);
    const wavesRef = useRef(null);

    useEffect(() => {
        wavesRef.current = new SineWaves({
            // Canvas Element
            el: canvasRef.current,

            // General speed of entire wave system
            speed: 2,

            // How many degrees should we rotate all of the waves
            rotate: 0,

            // Ease function from left to right
            ease: 'Linear',

            // Specific how much the width of the canvas the waves should be
            // This can either be a number or a percent
            waveWidth: '95%',

            // An array of wave options
            waves: [
                {
                    timeModifier: 1, // This is multiplied against `speed`
                    lineWidth: 3, // Stroke width
                    amplitude: 150, // How tall is the wave
                    wavelength: 200, // How long is the wave
                    segmentLength: 20, // How smooth should the line be
                    strokeStyle: 'rgba(255, 255, 255, 0.5)', // Stroke color and opacity
                    type: 'sine' // Wave type
                },
                {
                    timeModifier: 1,
                    lineWidth: 2,
                    amplitude: 150,
                    wavelength: 100,
                    strokeStyle: 'rgba(255, 255, 255, 0.3)'
                }
            ],

            // Perform any additional initializations here
            initialize: function () {},

            // This function is called whenever the window is resized
            resizeEvent: function () {
                // Here is an example on how to create a gradient stroke
                const gradient = this.ctx.createLinearGradient(
                    0,
                    0,
                    this.width,
                    0
                );
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                const length = this.waves.length;
                let index = 0;
                while (index < length) {
                    this.waves[index].strokeStyle = gradient;
                    index++;
                }
            }
        });
    }, []);

    return (
        <div className={componentClassNames.root}>
            <canvas ref={canvasRef} className={componentClassNames.canvas} />
        </div>
    );
}

export {Waves};
