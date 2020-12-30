/** @flow */

import {numberUtils} from '@codistica/core';
import {DotNavigation, FullScreenSlide, Button} from '@codistica/react';
import React, {useState, useRef} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

// TODO: CHECK OVERSCROLL BLOCKER IN MOBILE.

const category = 'COMPONENT';
const title = '<FullScreenSlide>';
const description = 'A smart full screen slide.';

function FullScreenSlideSectionA() {
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);
    const [toggle, setToggle] = useState(false);
    const [dotIndex, setDotIndex] = useState(0);
    const controlsRef = useRef(null);

    const dotNavigation = (
        <DotNavigation
            quantity={items.length}
            direction={'column'}
            onSwitch={(val) => {
                if (controlsRef.current) {
                    controlsRef.current.goTo(val);
                }
            }}
            dotIndex={dotIndex}
            auto={false}
            customStyles={{
                root: {
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                },
                dot: {
                    backgroundColor: '#dededd',
                    borderColor: '#dededd'
                },
                dotActive: {
                    backgroundColor: '#8ba63e',
                    borderColor: '#dededd'
                }
            }}
        />
    );

    return (
        <Section category={category} title={title} description={description}>
            <Button
                title={'SHOW FULL SCREEN SLIDE'}
                onClick={() => setToggle(true)}
                style={{maxWidth: 300, alignSelf: 'center', padding: '20px'}}
            />
            <FullScreenSlide
                direction={'column'}
                onNewPosition={setDotIndex}
                onMount={(controls) => {
                    controlsRef.current = controls;
                }}
                elements={dotNavigation}
                style={{display: toggle ? 'block' : 'none', zIndex: 100}}>
                {items.map((item, index) => {
                    const backgroundColor =
                        index % 2 !== 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)';
                    return (
                        <span
                            key={index}
                            style={{backgroundColor}}
                            className={componentClassNames.slideItem}>
                            <Button
                                title={'CLOSE'}
                                onClick={() => setToggle(false)}
                            />
                            {items.length > 1 ? (
                                <Button
                                    title={'-'}
                                    onClick={() => {
                                        const newItems = [...items];
                                        newItems.pop();
                                        setItems(newItems);
                                    }}
                                />
                            ) : null}
                            <Button
                                title={'+'}
                                onClick={() => {
                                    const newItems = [
                                        ...items,
                                        numberUtils.firstAvailableInteger(items)
                                    ];
                                    setItems(newItems);
                                }}
                            />
                        </span>
                    );
                })}
            </FullScreenSlide>
        </Section>
    );
}

export {FullScreenSlideSectionA};
