/** @flow */

import React from 'react';
import {CarouselSlide, createSophistication} from '../../../../src/index.js';

const useSophistication = createSophistication({
    slideItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        width: '50vw',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: '#ffffff',
        fontSize: 40
    }
});

function Responsive() {
    const jssClassNames = useSophistication();
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
                <span key={i} className={jssClassNames.slideItem}>
                    {i}
                </span>
            ))}
        </CarouselSlide>
    );
}

export {Responsive};
