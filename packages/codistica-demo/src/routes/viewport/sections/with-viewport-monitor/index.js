/** @flow */

import {elementUtils, viewportMonitor} from '@codistica/browser';
import {withViewportMonitor} from '@codistica/react';
import React, {useEffect, useRef, useState} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const ViewportMonitorDiv = withViewportMonitor<{}>('div');

const category = 'HOC';
const title = 'withViewportMonitor()';
const description =
    'Enhances passed component to have automatic viewport units correction capabilities.';

const sizeStyle = {
    height: '30vh',
    width: '100%'
};

/**
 * @description With viewport monitor section.
 * @returns {Object<string,*>} Section.
 */
function WithViewportMonitorSection() {
    const elementRef = useRef(null);
    const [elementSize, setElementSize] = useState({});

    useEffect(() => {
        refreshSize();
        viewportMonitor.on('change', refreshSize);
        return () => {
            viewportMonitor.removeListener('change', refreshSize);
        };
    }, []);

    return (
        <Section category={category} title={title} description={description}>
            <ViewportMonitorDiv
                ref={(ref) => (elementRef.current = ref)}
                style={sizeStyle}
                className={componentClassNames.rectangle}>
                <p>With Viewport Monitor</p>
                <br />
                <p>{`${elementSize.height} x ${elementSize.width}`}</p>
            </ViewportMonitorDiv>
        </Section>
    );

    function refreshSize() {
        setElementSize({
            height: Math.round(elementUtils.getHeight(elementRef.current)),
            width: Math.round(elementUtils.getWidth(elementRef.current))
        });
    }
}

export {WithViewportMonitorSection};
