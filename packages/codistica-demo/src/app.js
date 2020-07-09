/** @flow */

import React, {useRef} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import {Background} from './components/background/index.js';
import {BodyContainer} from './components/body-container/index.js';
import {Header} from './components/header/index.js';
import {Menu} from './components/menu/index.js';
// import {Waves} from './components/waves/index.js';
import {BackgroundStore} from './contexts/background-context.js';
import {HeaderStore} from './contexts/header-context.js';
import {MenuStore} from './contexts/menu-context.js';
import {ThemeStore} from './contexts/theme-context.js';
import {FormsRoute} from './routes/forms/index.js';
import {HomeRoute} from './routes/home/index.js';
import {ScrollingRoute} from './routes/scrolling/index.js';
import {SlidesRoute} from './routes/slides/index.js';
import {ViewportRoute} from './routes/viewport/index.js';
import './css/global.module.scss';
import './css/reset.module.scss';
import './themes/codistica-react/index.js';

// TODO: CHECK WHY PAGE CAN SCROLL HORIZONTALLY ON MOBILE WHEN MENU IS OPEN (BESIDE OF ScrollBoundary NOT BEING APPLIED YET)
// TODO: PREVENT TAB NAVIGATING MENU WHEN CLOSED.
// TODO: TEST EVERYTHING ON MOBILE IN LANDSCAPE MODE.
// TODO: USE will-change PROP WHERE NEEDED.
// TODO: ADD 404 PAGE.
// TODO: GLOBALLY CUSTOMIZE SOME COMPONENTS AS DEMO.
// TODO: CREATE SLIDES ROUTE. ALL SLIDES IN ONE ROUTE.
// TODO: SEARCH FOR UN USED SCSS COLORS IMPORTS.
// TODO: CHECK DOUBLE RENDERINGS.

const scrollingElement =
    document.scrollingElement || document.getElementsByTagName('body')[0];

/**
 * @description App main component.
 * @returns {Object<string,*>} React component.
 */
function App() {
    const location = useLocation();
    const locationRef = useRef(location);
    if (location !== locationRef.current) {
        scrollingElement.scrollTop = 0;
        locationRef.current = location;
    }
    return (
        <ThemeStore>
            <HeaderStore>
                <BackgroundStore>
                    <MenuStore>
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
                            </Switch>
                        </BodyContainer>
                    </MenuStore>
                </BackgroundStore>
            </HeaderStore>
        </ThemeStore>
    );
}

export {App};
