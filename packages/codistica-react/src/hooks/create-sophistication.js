/** @flow */

/** @module react/hooks/create-sophistication */

import {useMemo, useLayoutEffect} from 'react';
import {Sophistication} from '../classes/sophistication.js';
import type {StylesType} from '../classes/sophistication.js';
import {useJssOptions} from './use-jss-options.js';
import {useTheme} from './use-theme.js';

/**
 * @description Creates sophistication hook.
 * @param {Object<string,*>} styles - Styles.
 * @returns {function(*): Object<string,string>} - Hook.
 */
function createSophistication(styles: StylesType) {
    const sophistication = new Sophistication(styles);

    return function useSophistication(data: any): {[string]: string} {
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

        // UPDATE
        useLayoutEffect(() => {
            sophistication.updateDynamicRules(styleSheet, dynamicRules, data);
        }, [data, dynamicRules, styleSheet]);

        // CLEANUP
        useLayoutEffect(() => {
            return () => {
                sophistication.unmanageStyleSheet(theme);
                sophistication.deleteDynamicRules(styleSheet, dynamicRules);
            };
        }, [dynamicRules, styleSheet, theme]);

        // GENERATE CLASS NAMES
        return sophistication.getClassNames(styleSheet, dynamicRules);
    };
}

export {createSophistication};
