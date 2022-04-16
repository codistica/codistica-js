/** @flow */

import {LogBrowserConsoleBinder, getScrollingElement} from '@codistica/browser';
import {log, catcher} from '@codistica/core';
import React, {useRef} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import {Background} from './components/background/index.js';
import {BodyContainer} from './components/body-container/index.js';
import {Header} from './components/header/index.js';
import {Menu} from './components/menu/index.js';
// import {Waves} from './components/waves/index.js';
import {BackgroundProvider} from './contexts/background-context.js';
import {HeaderProvider} from './contexts/header-context.js';
import {MenuProvider} from './contexts/menu-context.js';
import {ThemeProvider} from './contexts/theme-context.js';
import {FormsRoute} from './routes/forms/index.js';
import {HomeRoute} from './routes/home/index.js';
import {LoaderRoute} from './routes/loader/index.js';
import {ScrollingRoute} from './routes/scrolling/index.js';
import {SlidesRoute} from './routes/slides/index.js';
import {ViewportRoute} from './routes/viewport/index.js';
import './css/global.module.scss';
import './css/reset.module.scss';
import './themes/codistica-react/index.js';

log.setConsoleBinder(new LogBrowserConsoleBinder());

catcher.options.enableLogging = true;

// TODO: CHECK WHY PAGE CAN SCROLL HORIZONTALLY ON MOBILE WHEN MENU IS OPEN (BESIDE OF ScrollBoundary NOT BEING APPLIED YET)
// TODO: PREVENT TAB NAVIGATING MENU WHEN CLOSED.
// TODO: TEST EVERYTHING ON MOBILE IN LANDSCAPE MODE.
// TODO: ADD 404 PAGE.
// TODO: GLOBALLY CUSTOMIZE SOME COMPONENTS AS DEMO.
// TODO: SEARCH FOR UNUSED SCSS COLORS IMPORTS.
// TODO: CHECK DOUBLE RENDERINGS.

// TODO: CREATE CUSTOM Waves MODULE (SPLIT INTO REUSABLE MODULES) + REACT COMPONENT (FOR CANVAS DISPLAYING). (USE CLONED REPOSITORY)

const scrollingElement = getScrollingElement();

function App() {
    const location = useLocation();
    const locationRef = useRef(location);
    if (location !== locationRef.current) {
        scrollingElement.scrollTop = 0;
        locationRef.current = location;
    }
    return (
        <ThemeProvider>
            <HeaderProvider>
                <BackgroundProvider>
                    <MenuProvider>
                        {/*<Waves />*/}
                        <Background />
                        <Header />
                        <Menu />
                        <BodyContainer>
                            <Switch>
                                <Route
                                    path={'/'}
                                    exact={true}
                                    component={HomeRoute}
                                />
                                <Route
                                    path={'/slides'}
                                    exact={true}
                                    component={SlidesRoute}
                                />
                                <Route
                                    path={'/viewport'}
                                    exact={true}
                                    component={ViewportRoute}
                                />
                                <Route
                                    path={'/scrolling'}
                                    exact={true}
                                    component={ScrollingRoute}
                                />
                                <Route
                                    path={'/forms'}
                                    exact={true}
                                    component={FormsRoute}
                                />
                                <Route
                                    path={'/loader'}
                                    exact={true}
                                    component={LoaderRoute}
                                />
                            </Switch>
                        </BodyContainer>
                    </MenuProvider>
                </BackgroundProvider>
            </HeaderProvider>
        </ThemeProvider>
    );
}

export {App};
