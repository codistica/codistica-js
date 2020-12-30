/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {CarouselSlideSectionA} from './sections/carousel-slide-a/index.js';
import {FullScreenSlideSectionA} from './sections/full-screen-slide-a/index.js';
import {TrackSlideSectionA} from './sections/track-slide-a/index.js';
import {TracklessSlideSectionA} from './sections/trackless-slide-a/index.js';

// TODO: TEST ALL SLIDES EQUALLY AND DYNAMICALLY. HOT REPLACING ITEMS (WITH SAME AND DIFFERENT key), ROW/COLUMN, ITEMS PER VIEW, ETC.
// TODO: TEST PASSING FROM/TO lazyRender (ADD SUPPORT IN OTHER SLIDES?)
// TODO: CHECK ALL SLIDES VARIABLES TYPES WHEN NO CHILDREN. (HANDLE NaN)
// TODO: DOES ALL SLIDES SUPPORT gap? (EXCEPT FOR CAROUSEL OBVIOUSLY) IS IT NEEDED?
// TODO: FIX children COMPARE USING ONLY length.

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
