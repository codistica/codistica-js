/** @flow */

/** @module react/hooks/create-get-sophistication */

import {useMemo, useLayoutEffect} from 'react';
import {Sophistication} from '../classes/sophistication.js';
import type {StylesType} from '../classes/sophistication.js';
import {useJssOptions} from './use-jss-options.js';
import {useTheme} from './use-theme.js';

/**
 * @description Creates get sophistication hook.
 * @param {Object<string,*>} styles - Styles.
 * @returns {function(*): (function(*): Object<string,string>)} - Hook.
 */
function createGetSophistication(styles: StylesType) {
    const sophistication = new Sophistication(styles);

    return function useGetSophistication(
        fallbackData: any
    ): (data: any) => {[string]: string} {
        const [theme] = useTheme();
        const [jssOptions] = useJssOptions();

        // CREATE
        const [styleSheet, dynamicRules] = useMemo(() => {
            sophistication.setTheme(theme);
            sophistication.setJssOptions(jssOptions);

            const styleSheet = sophistication.createStyleSheet();
            const dynamicRules = sophistication.addDynamicRules(styleSheet);

            sophistication.manageStyleSheet(theme);

            return [styleSheet, dynamicRules];
        }, [jssOptions, theme]);

        // CLEANUP
        useLayoutEffect(() => {
            return () => {
                sophistication.unmanageStyleSheet(theme);
                sophistication.deleteDynamicRules(styleSheet, dynamicRules);
            };
        }, [dynamicRules, styleSheet, theme]);

        return function getSophistication(data: any) {
            // UPDATE
            sophistication.updateDynamicRules(
                styleSheet,
                dynamicRules,
                data || fallbackData
            );

            // GENERATE CLASS NAMES
            return sophistication.getClassNames(styleSheet, dynamicRules);
        };
    };
}

export {createGetSophistication};
