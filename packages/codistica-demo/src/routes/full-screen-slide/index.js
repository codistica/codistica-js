/** @flow */

import {TrackSlide, DotNavigation} from '@codistica/react';
import React, {useState} from 'react';
import {Body} from '../../components/body/index.js';
import componentClassNames from './index.module.scss';

// TODO: REMAKE! USE FullScreenSlide WHEN READY.
// TODO: TEST IN ALL MOBILE BROWSERS!
// TODO: MOVE TO slides ROUTE.

/**
 * @description Full screen slide route.
 * @returns {Object<string,*>} Route.
 */
function FullScreenSlideRoute() {
    const [slideControls, setSlideControls] = useState({
        switchBy: null,
        switchTo: null
    });

    const [dotIndex, setDotIndex] = useState(0);
    return (
        <Body noOverscroll={true} headerSpacer={false}>
            <TrackSlide
                responsive={true}
                direction={'column'}
                onMount={(controls) => {
                    setSlideControls(controls);
                }}
                onPositionChange={setDotIndex}
                customStyles={{
                    root: {height: '100vh', width: '100vw'}
                }}>
                {[
                    'rgba(0,0,0,0.1)',
                    'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.1)',
                    'rgba(0,0,0,0.3)'
                ].map((color, index) => (
                    <span
                        key={index}
                        style={{backgroundColor: color}}
                        className={componentClassNames.slideItem}>
                        {index}
                    </span>
                ))}
            </TrackSlide>

            <DotNavigation
                quantity={4}
                direction={'column'}
                onSwitch={slideControls.switchTo}
                dotIndex={dotIndex}
                auto={false}
                customStyles={{
                    root: {
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    },
                    dot: {
                        backgroundColor: '#dededd',
                        borderColor: '#dededd'
                    },
                    dotActive: {
                        backgroundColor: '#8ba63e',
                        borderColor: '#dededd'
                    }
                }}
            />
        </Body>
    );
}

export {FullScreenSlideRoute};
