/** @flow */

import React from 'react';
import {useTheme, ThemeProvider} from '../../../src/index.js';
import {MyClassComponent} from './internals/my-class-component.js';
import {MyComponentA} from './internals/my-component-a.js';
import {MyComponentB} from './internals/my-component-b.js';
import {lightTheme, darkTheme} from './internals/styles.js';

function App() {
    const [theme, setTheme] = useTheme();
    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexShrink: 0}}>
                <MyComponentA
                    myBorderColor={'#ff8811'}
                    myWidth={100}
                    text={'A'}
                />
                <MyComponentA
                    myBorderColor={'#008811'}
                    myWidth={200}
                    text={'A'}
                />
                <MyComponentB
                    myBorderColor={'#0000ff'}
                    myWidth={100}
                    text={'B'}
                />
                <MyComponentB
                    myBorderColor={'#5f0fff'}
                    myWidth={200}
                    text={'B'}
                />
                <MyClassComponent
                    myBorderColor={'#5555ff'}
                    myWidth={100}
                    text={'Class'}
                />
                <MyClassComponent
                    myBorderColor={'#220022'}
                    myWidth={200}
                    text={'Class'}
                />
            </div>
            <div
                style={{
                    margin: 100
                }}>
                <button
                    style={{
                        marginRight: 40
                    }}
                    onClick={() => {
                        if (theme === lightTheme) {
                            setTheme(darkTheme);
                        } else {
                            setTheme(lightTheme);
                        }
                    }}>
                    {'Change Theme'}
                </button>
                <span>{theme === lightTheme ? 'Light' : 'Dark'}</span>
            </div>
        </div>
    );
}

/**
 * @description A Sophistication demo.
 * @returns {Object<string,*>} React component.
 */
function Sophistication() {
    return (
        <ThemeProvider value={lightTheme}>
            <App />
        </ThemeProvider>
    );
}

const meta = {
    title: 'Sophistication'
};

export {Sophistication};
export default meta;
