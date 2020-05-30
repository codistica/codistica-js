/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {WithOnScrollActionSection} from './sections/with-on-scroll-action/index.js';
import {WithOverscrollBlockerSection} from './sections/with-overscroll-blocker/index.js';

/**
 * @description Scrolling route.
 * @returns {Object<string,*>} Route.
 */
function ScrollingRoute() {
    return (
        <Body>
            <WithOnScrollActionSection />
            <WithOverscrollBlockerSection />
        </Body>
    );
}

export {ScrollingRoute};
