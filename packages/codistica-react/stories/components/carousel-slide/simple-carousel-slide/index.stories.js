/** @flow */

import React from 'react';
import {CarouselSlide} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description A simple carousel slide demo.
 * @returns {Object<string,*>} React component.
 */
function SimpleCarouselSlide() {
    return (
        <CarouselSlide
            direction={'row'}
            startingPosition={0}
            dimensions={{
                height: '50vh',
                width: '100%'
            }}
            offset={50}>
            {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={componentClassNames.slideItem}>
                    {i}
                </span>
            ))}
        </CarouselSlide>
    );
}

const meta = {
    title: 'Carousel Slide'
};

export {SimpleCarouselSlide};
export default meta;
