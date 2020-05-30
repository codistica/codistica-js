/** @flow */

import {stringUtils} from '@codistica/core';
import {TracklessSlide, Button} from '@codistica/react';
import React, {useRef} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const category = 'COMPONENT';
const title = '<TracklessSlide>';
const description = 'A flexible slide without a track.';

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/**
 * @description Trackless slide section A.
 * @returns {Object<string,*>} Section.
 */
function TracklessSlideSectionA() {
    const controlsRef = useRef(null);
    return (
        <Section category={category} title={title} description={description}>
            <TracklessSlide
                direction={'column'}
                itemsPerView={4}
                dimensions={{
                    height: '30vh',
                    width: '80%',
                    minHeight: 200
                }}
                emulateTrack={false}
                onMount={(controls) => (controlsRef.current = controls)}
                className={componentClassNames.slide}>
                {items.map((item, key) => (
                    <div
                        key={key}
                        className={
                            item % 2 !== 0
                                ? componentClassNames.slideChildOdd
                                : componentClassNames.slideChildEven
                        }>
                        {item}
                    </div>
                ))}
            </TracklessSlide>
            <div className={componentClassNames.controlsContainer}>
                <div className={componentClassNames.controlPanel}>
                    <Button
                        title={'- ITEM'}
                        onClick={() =>
                            controlsRef.current &&
                            controlsRef.current.previous()
                        }
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'+ ITEM'}
                        onClick={() =>
                            controlsRef.current && controlsRef.current.next()
                        }
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'- GROUP'}
                        onClick={() =>
                            controlsRef.current &&
                            controlsRef.current.previous(true)
                        }
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'+ GROUP'}
                        onClick={() =>
                            controlsRef.current &&
                            controlsRef.current.next(true)
                        }
                        className={componentClassNames.button}
                    />
                </div>
                <div className={componentClassNames.controlPanel}>
                    {items.map((item, key) => (
                        <Button
                            key={key}
                            title={stringUtils.injectBefore(
                                item,
                                items[items.length - 1].toString().length,
                                '0'
                            )}
                            onClick={() =>
                                controlsRef.current &&
                                controlsRef.current.goTo(item)
                            }
                            className={componentClassNames.goToButton}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}

export {TracklessSlideSectionA};
