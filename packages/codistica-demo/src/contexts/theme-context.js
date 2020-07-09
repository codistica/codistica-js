/** @flow */

import {ThemeProvider as MaterialThemeProvider} from '@material-ui/core';
import React, {useState, createContext} from 'react';
import {materialUiThemes} from '../themes/material-ui/index.js';

type Props = {
    children: any
};

const ThemeContext: Object = createContext({
    theme: 'dark',
    setTheme: null
});

ThemeStore.defaultProps = {
    children: null
};

function ThemeStore(props: Props) {
    const [theme, setTheme] = useState('dark');
    const {children} = props;
    return (
        <MaterialThemeProvider theme={materialUiThemes[theme]}>
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme
                }}>
                {children}
            </ThemeContext.Provider>
        </MaterialThemeProvider>
    );
}

export {ThemeContext, ThemeStore};
