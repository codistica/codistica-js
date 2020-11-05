/** @flow */

import {useContext} from 'react';
import type {ThemeType} from '../contexts/theme-context.js';
import {ThemeContext} from '../contexts/theme-context.js';

/**
 * @description Custom hook for theme usage.
 * @returns {Object<string,*>} - Current theme.
 */
function useTheme(): [ThemeType, (value: ThemeType) => void] {
    return useContext(ThemeContext);
}

export {useTheme};
