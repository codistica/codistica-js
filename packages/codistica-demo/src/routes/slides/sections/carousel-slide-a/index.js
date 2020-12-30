/** @flow */

import {stringUtils, numberUtils} from '@codistica/core';
import {CarouselSlide, Button} from '@codistica/react';
import React, {useRef, useState} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const category = 'COMPONENT';
const title = '<CarouselSlide>';
const description = 'A flexible carousel slide.';

function CarouselSlideSectionA() {
    const controlsRef = useRef(null);
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);
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
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => alert('CLICKED ON: ' + index)}
                        className={
                            index % 2 !== 0
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
                        title={'PREVIOUS'}
                        onClick={() =>
                            controlsRef.current &&
                            controlsRef.current.previous()
                        }
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'NEXT'}
                        onClick={() =>
                            controlsRef.current && controlsRef.current.next()
                        }
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'- ITEM'}
                        onClick={() => {
                            const newItems = [...items];
                            newItems.pop();
                            setItems(newItems);
                        }}
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'+ ITEM'}
                        onClick={() => {
                            const newItems = [
                                ...items,
                                numberUtils.firstAvailableInteger(items)
                            ];
                            setItems(newItems);
                        }}
                        className={componentClassNames.button}
                    />
                </div>
                <div className={componentClassNames.controlPanel}>
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            title={stringUtils.injectBefore(
                                index,
                                items[items.length - 1].toString().length,
                                '0'
                            )}
                            onClick={() =>
                                controlsRef.current &&
                                controlsRef.current.goTo(index)
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
