/** @flow */

import {default as centered} from '@storybook/addon-centered/react';
import React, {useState, useRef} from 'react';
import {withOnView, mergeClassNames} from '../../../../../src/index.js';
import {useSophistication} from './index.sophistication.js';

const WithOnViewSpan = withOnView(true)('span');

function Demo() {
    const [data, setData] = useState({
        isInView: false,
        centerX: 0,
        centerY: 0,
        shownX: 0,
        shownY: 0,
        pathX: 0,
        pathY: 0,
        edgeX: 0,
        edgeY: 0
    });

    const waitRef = useRef(false);
    const scrolled = useRef(false);

    const isClose =
        scrolled.current &&
        Math.abs(data.centerX) < 20 &&
        Math.abs(data.centerY) < 20;

    const jssClassNames = useSophistication();

    const radius = Math.sqrt(data.edgeX ** 2 + data.edgeY ** 2);
    const opacity = 1 - radius / 100;

    const startScrolling = (
        <h5 className={jssClassNames.startScrolling}>{'START SCROLLING'}</h5>
    );

    const dataBox = (
        <span>
            <span>
                <p>{`isInView: ${data.isInView ? 'true' : 'false'}`}</p>
            </span>
            <span>
                <p>{`centerX: ${Math.round(data.centerX)}`}</p>
                <p>{`centerY: ${Math.round(data.centerY)}`}</p>
            </span>
            <span>
                <p>{`shownX: ${Math.round(data.shownX)}`}</p>
                <p>{`shownY: ${Math.round(data.shownY)}`}</p>
            </span>
            <span>
                <p>{`pathX: ${Math.round(data.pathX)}`}</p>
                <p>{`pathY: ${Math.round(data.pathY)}`}</p>
            </span>
            <span>
                <p>{`edgeX: ${Math.round(data.edgeX)}`}</p>
                <p>{`edgeY: ${Math.round(data.edgeY)}`}</p>
            </span>
        </span>
    );

    const arrows = [];
    if (Math.abs(data.centerX) >= 20) {
        if (Math.sign(data.centerX) === -1) {
            arrows.push(
                <span key={'arrow-left'} className={jssClassNames.arrowLeft}>
                    <i />
                </span>
            );
        } else {
            arrows.push(
                <span key={'arrow-right'} className={jssClassNames.arrowRight}>
                    <i />
                </span>
            );
        }
    }

    if (Math.abs(data.centerY) >= 20) {
        if (Math.sign(data.centerY) === 1) {
            arrows.push(
                <span key={'arrow-top'} className={jssClassNames.arrowTop}>
                    <i />
                </span>
            );
        } else {
            arrows.push(
                <span
                    key={'arrow-bottom'}
                    className={jssClassNames.arrowBottom}>
                    <i />
                </span>
            );
        }
    }

    if (
        scrolled.current &&
        Math.round(data.centerX) === 0 &&
        Math.round(data.centerY) === 0
    ) {
        if (!waitRef.current) {
            waitRef.current = true;
            alert('YOU WON!');
        }
    } else {
        waitRef.current = false;
    }

    return (
        <div className={jssClassNames.root}>
            <span className={jssClassNames.viewportTarget}>
                <span
                    className={mergeClassNames(jssClassNames.target, [
                        jssClassNames.blink,
                        isClose
                    ])}>
                    <span />
                </span>
            </span>

            <span className={jssClassNames.dataBox}>
                {scrolled.current ? dataBox : startScrolling}
            </span>

            {scrolled.current ? arrows : null}

            <div className={jssClassNames.track}>
                <WithOnViewSpan
                    style={{
                        opacity
                    }}
                    className={jssClassNames.item}
                    onView={(e) => {
                        scrolled.current = true;
                        setData(e);
                    }}>
                    <span className={jssClassNames.target}>
                        <span />
                    </span>
                </WithOnViewSpan>
            </div>
        </div>
    );
}

Demo.decorators = [centered];

export {Demo};
