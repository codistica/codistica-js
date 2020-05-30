/** @flow */

import {DotNavigation, FullScreenSlide, Button} from '@codistica/react';
import React, {useState, useRef} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

// TODO: CHECK OVERSCROLL BLOCKER IN MOBILE.

const category = 'COMPONENT';
const title = '<FullScreenSlide>';
const description = 'TODO.';

/**
 * @description Full screen slide section A.
 * @returns {Object<string,*>} Section.
 */
function FullScreenSlideSectionA() {
    const [toggle, setToggle] = useState(false);
    const controlsRef = useRef(null);
    const [dotIndex, setDotIndex] = useState(0);

    const dotNavigation = (
        <DotNavigation
            quantity={4}
            direction={'column'}
            onSwitch={(val) => {
                controlsRef.current && controlsRef.current.goTo(val);
            }}
            dotIndex={dotIndex}
            auto={false}
            customStyles={{
                root: {
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)'
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
                {[
                    'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.5)',
                    'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.5)'
                ].map((color, index) => (
                    <span
                        key={index}
                        style={{backgroundColor: color}}
                        className={componentClassNames.slideItem}>
                        <Button
                            title={'CLOSE'}
                            onClick={() => setToggle(false)}
                        />
                    </span>
                ))}
            </FullScreenSlide>
        </Section>
    );
}

export {FullScreenSlideSectionA};
