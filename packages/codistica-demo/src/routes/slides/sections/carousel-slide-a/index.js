/** @flow */

import {stringUtils} from '@codistica/core';
import {CarouselSlide, Button} from '@codistica/react';
import React, {useRef} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const category = 'COMPONENT';
const title = '<CarouselSlide>';
const description = 'A flexible carousel slide.';

const items = [0, 1, 2, 3, 4, 5];

/**
 * @description Carousel slide section A.
 * @returns {Object<string,*>} Section.
 */
function CarouselSlideSectionA() {
    const controlsRef = useRef(null);
    return (
        <Section category={category} title={title} description={description}>
            <CarouselSlide
                dimensions={{
                    height: '30vh',
                    width: '100%',
                    minHeight: 200
                }}
                offset={150}
                showOverflow={true}
                onMount={(controls) => (controlsRef.current = controls)}
                className={componentClassNames.slide}>
                {items.map((item, key) => (
                    <div
                        key={key}
                        onClick={() => alert('CLICKED ON: ' + key)}
                        className={
                            item % 2 !== 0
                                ? componentClassNames.slideChildOdd
                                : componentClassNames.slideChildEven
                        }>
                        {item}
                    </div>
                ))}
            </CarouselSlide>
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

export {CarouselSlideSectionA};
