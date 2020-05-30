/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {ViewportMonitorSection} from './sections/viewport-monitor.js';
import {WithViewportMonitorSection} from './sections/with-viewport-monitor/index.js';

/**
 * @description Viewport route.
 * @returns {Object<string,*>} Route.
 */
function ViewportRoute() {
    return (
        <Body>
            <ViewportMonitorSection />
            <WithViewportMonitorSection />
        </Body>
    );
}

export {ViewportRoute};
