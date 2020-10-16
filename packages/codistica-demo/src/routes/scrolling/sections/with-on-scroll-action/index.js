/** @flow */

import {stringUtils} from '@codistica/core';
import {withOnScrollAction} from '@codistica/react';
import React, {useState} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const OnScrollActionDiv = withOnScrollAction<{}>('div');

const category = 'HOC';
const title = 'withOnScrollAction()';
const description = 'Adds custom onScrollAction event.';

/**
 * @description With on scroll action section.
 * @returns {Object<string,*>} Section.
 */
function WithOnScrollActionSection() {
    const [scrollData, setScrollData] = useState({
        sourceX: '         ',
        sourceY: '         ',
        deltaX: 0,
        deltaY: 0,
        reachedLimit: '      '
    });

    return (
        <Section category={category} title={title} description={description}>
            <div className={componentClassNames.info}>
                <p>Scroll me!</p>
                <p>
                    TIP: Try using arrows (after focusing element), touch
                    moving, wheel and any combination.
                </p>
            </div>
            <OnScrollActionDiv
                tabIndex={1}
                onScrollAction={(e) => {
                    setScrollData({
                        sourceX: stringUtils.injectBefore(
                            e.sourceX || '         ',
                            9,
                            ' '
                        ),
                        sourceY: stringUtils.injectBefore(
                            e.sourceY || '         ',
                            9,
                            ' '
                        ),
                        deltaX: e.deltaX,
                        deltaY: e.deltaY,
                        reachedLimit: stringUtils.injectBefore(
                            e.reachedLimit || '      ',
                            6,
                            ' '
                        )
                    });
                }}
                className={componentClassNames.rectangle}>
                <div className={componentClassNames.track} />
            </OnScrollActionDiv>
            <div className={componentClassNames.info}>
                <p>
                    {'source x: ' +
                        stringUtils.injectBefore(scrollData.sourceX, 3, ' ')}
                </p>
                <p>
                    {'source y: ' +
                        stringUtils.injectBefore(scrollData.sourceY, 3, ' ')}
                </p>
                <p>{'deltaX: ' + scrollData.deltaX}</p>
                <p>{'deltaY: ' + scrollData.deltaY}</p>
                <p>{'reachedLimit: ' + scrollData.reachedLimit}</p>
            </div>
        </Section>
    );
}

export {WithOnScrollActionSection};
