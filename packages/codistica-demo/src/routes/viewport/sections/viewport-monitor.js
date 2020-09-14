/** @flow */

import {viewportMonitor} from '@codistica/browser';
import React, {useEffect, useState} from 'react';
import {Section} from '../../../components/section/index.js';

const category = 'CLASS';
const title = 'ViewportMonitor';
const description =
    'Keeps track of viewport changes (especially in mobile browsers with dynamic UIs) and exposes different alternatives for units correction.';

/**
 * @description Viewport monitor section.
 * @returns {Object<string,*>} Section.
 */
function ViewportMonitorSection() {
    const [viewportState, setViewportState] = useState({
        windowRatio: viewportMonitor.windowRatio,
        zoom: viewportMonitor.zoom,
        scrollbar: viewportMonitor.scrollbar,
        deltaVh: viewportMonitor.deltaVh,
        deltaVw: viewportMonitor.deltaVw,
        ratioVh: viewportMonitor.ratioVh,
        ratioVw: viewportMonitor.ratioVw,
        minimalUI: viewportMonitor.minimalUI
    });

    useEffect(() => {
        viewportMonitor.on('change', onChangeHandler);
        return () => {
            viewportMonitor.off('change', onChangeHandler);
        };
    }, []);

    return (
        <Section category={category} title={title} description={description}>
            <h3 style={{textAlign: 'center', marginBottom: 10}}>
                Viewport Info
            </h3>
            <h3>
                windowRatio: {Math.round(viewportState.windowRatio * 100) / 100}
            </h3>
            <h3>zoom: {viewportState.zoom}</h3>
            <h3>scrollbar: {viewportState.scrollbar}</h3>
            <h3>deltaVh: {viewportState.deltaVh}</h3>
            <h3>deltaVw: {viewportState.deltaVw}</h3>
            <h3>ratioVh: {Math.round(viewportState.ratioVh * 100) / 100}</h3>
            <h3>ratioVw: {Math.round(viewportState.ratioVw * 100) / 100}</h3>
            <h3>minimalUI: {`${viewportState.minimalUI || 'false'}`}</h3>
        </Section>
    );

    function onChangeHandler(e) {
        setViewportState(e);
    }
}

export {ViewportMonitorSection};
