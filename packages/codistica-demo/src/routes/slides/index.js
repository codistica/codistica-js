/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {CarouselSlideSectionA} from './sections/carousel-slide-a/index.js';
import {FullScreenSlideSectionA} from './sections/full-screen-slide-a/index.js';
import {TrackSlideSectionA} from './sections/track-slide-a/index.js';
import {TracklessSlideSectionA} from './sections/trackless-slide-a/index.js';

/**
 * @description Slides route.
 * @returns {Object<string,*>} Route.
 */
function SlidesRoute() {
    return (
        <Body>
            <CarouselSlideSectionA />
            <FullScreenSlideSectionA />
            <TrackSlideSectionA />
            <TracklessSlideSectionA />
        </Body>
    );
}

export {SlidesRoute};
