/** @flow */

import {numberUtils, stringUtils} from '@codistica/core';
import {TracklessSlide, Button} from '@codistica/react';
import React, {useRef, useState} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const category = 'COMPONENT';
const title = '<TracklessSlide>';
const description = 'A flexible slide without a track.';

function TracklessSlideSectionA() {
    const controlsRef = useRef(null);
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);
    const [itemsPerView, setItemsPerView] = useState(4);
    const [useColumn, setUseColumn] = useState(true);
    const [useLazyRender, setUseLazyRender] = useState(true);
    return (
        <Section category={category} title={title} description={description}>
            <TracklessSlide
                direction={useColumn ? 'column' : 'row'}
                itemsPerView={itemsPerView}
                dimensions={{
                    height: '30vh',
                    width: '80%',
                    minHeight: 200
                }}
                lazyRender={useLazyRender}
                onMount={(controls) => (controlsRef.current = controls)}
                className={componentClassNames.slide}>
                {items.map((item, index) => (
                    <div
                        key={item}
                        className={
                            index % 2 !== 0
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
                    <Button
                        title={'- PER VIEW'}
                        onClick={() =>
                            setItemsPerView((x) => (x > 1 ? x - 1 : 1))
                        }
                        className={componentClassNames.button}
                    />
                    <Button
                        title={'+ PER VIEW'}
                        onClick={() => setItemsPerView((x) => x + 1)}
                        className={componentClassNames.button}
                    />
                    <Button
                        title={useColumn ? 'ROW' : 'COLUMN'}
                        onClick={() => setUseColumn((x) => !x)}
                        className={componentClassNames.button}
                    />
                    <Button
                        title={useLazyRender ? 'NO LAZY RENDER' : 'LAZY RENDER'}
                        onClick={() => setUseLazyRender((x) => !x)}
                        className={componentClassNames.button}
                    />
                </div>
                <div className={componentClassNames.controlPanel}>
                    {items.map((item, index) => (
                        <Button
                            key={item}
                            title={stringUtils.injectBefore(
                                item,
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

export {TracklessSlideSectionA};
