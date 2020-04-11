/** @flow */

import React, {useState} from 'react';
import {Button} from '../../../../src/components/button/index.js';
import {Slide} from '../../../../src/components/slide/index.js';
import Styles from './index.module.scss';

/**
 * @description Slide viewport children demo.
 * @returns {Object<string,*>} React component.
 */
function SlideDemoViewportChildren() {
    const [slideAPI, setSlideAPI] = useState({
        switchBy: null,
        switchTo: null
    });

    return (
        <div className={Styles.container}>
            <Slide
                masterStyle={{
                    height: '10vh',
                    width: '15vw',
                    marginBottom: '50px'
                }}
                responsive={true}
                direction={'column'}
                onAPI={(API) => {
                    setSlideAPI(API);
                }}>
                {['#f2a6aa', '#a2c1cc', '#32a6aa', '#12aa21'].map(
                    (color, index) => (
                        <span
                            key={index}
                            className={Styles.slideItem}
                            style={{backgroundColor: color}}>
                            {index}
                        </span>
                    )
                )}
            </Slide>
            <Button
                className={Styles.button}
                onClick={() => {
                    slideAPI.switchBy && slideAPI.switchBy(-1);
                }}
                dark={true}
                text={'PREVIOUS'}
            />
            <Button
                className={Styles.button}
                onClick={() => {
                    slideAPI.switchBy && slideAPI.switchBy(1);
                }}
                dark={true}
                text={'NEXT'}
            />
        </div>
    );
}

export {SlideDemoViewportChildren};
