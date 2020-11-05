/** @flow */

import type {Context, Element} from 'react';
import React, {useState, createContext} from 'react';

type ThemeType = {};

type ThemeContextType = Context<[ThemeType, (value: ThemeType) => void]>;

type DefaultProps = {|
    children: any,
    value: null | {[string]: any}
|};

type Props = {
    ...DefaultProps
};

const defaultTheme = {};

const ThemeContext: ThemeContextType = createContext([defaultTheme, () => {}]);

/**
 * @description Theme context provider.
 * @param {Object<string,*>} props - Props.
 * @returns {Object<string,*>} Theme context provider.
 */
function ThemeProvider(props: Props): Element<typeof ThemeContext.Provider> {
    const {children, value} = props;
    const [theme, setTheme] = useState(value || defaultTheme);
    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.defaultProps = ({
    children: null,
    value: null
}: DefaultProps);

export {ThemeContext, ThemeProvider, defaultTheme};
export type {ThemeType, ThemeContextType};
