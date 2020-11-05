/** @flow */

/** @module react/classes/sophistication */

import {SheetsManager, getDynamicStyles} from 'jss';
import type {StyleSheet, Rule as JSSRule} from 'jss';
import type {ComponentType, ElementRef} from 'react';
import {defaultJssOptions} from '../contexts/jss-options-context.js';
import type {JssOptionsType} from '../contexts/jss-options-context.js';
import {defaultTheme} from '../contexts/theme-context.js';
import type {ThemeType} from '../contexts/theme-context.js';

type Value = any | ((any) => any);
type Style = {[string]: Value | Style} | ((any) => {[string]: Value | Style});
type DynamicStyle = (any) => {[string]: Value | Style};
type StaticStyle = {[string]: Value | Style};

type StylesType = {[string]: Style} | ((ThemeType) => {[string]: Style});

type ComponentData = {
    styleSheet: StyleSheet,
    dynamicRules: {[string]: JSSRule},
    theme: ThemeType,
    jssOptions: JssOptionsType
};

/**
 * @classdesc A class for library components sophistication.
 */
class Sophistication {
    sheetsManager: SheetsManager;
    rawStyles: StylesType;
    theme: ThemeType;
    jssOptions: JssOptionsType;
    styles: {[string]: Style};
    staticStyles: {[string]: StaticStyle} | null;
    dynamicStyles: {[string]: DynamicStyle} | null;
    /** @todo FOLLOW https://github.com/facebook/flow/issues/8517 issue. */
    componentInstances: WeakMap<any, ComponentData>;

    /**
     * @description Constructor.
     * @param {Object<string,*>} styles - JSS styles.
     * @param {Object<string,*>} [theme] - Theme.
     * @param {Object<string,*>} [jssOptions] - JSS options.
     */
    constructor(
        styles: StylesType,
        theme?: ThemeType,
        jssOptions?: JssOptionsType
    ) {
        this.sheetsManager = new SheetsManager();
        this.rawStyles = styles;
        this.setTheme(theme || defaultTheme);
        this.setJssOptions(jssOptions || defaultJssOptions);
        this.componentInstances = new WeakMap();
    }

    /**
     * @instance
     * @description Get class names for specified component instance.
     * @param {Object<string,*>} componentInstance - Component instance.
     * @param {Object<string,*>} [data] - Styles data.
     * @param {Object<string,*>} [theme] - Theme.
     * @param {Object<string,*>} [jssOptions] - JSS options.
     * @returns {void} Void.
     */
    getComponentInstanceClassNames(
        componentInstance: ElementRef<ComponentType<any>>,
        data?: any,
        theme?: ThemeType,
        jssOptions?: JssOptionsType
    ) {
        let componentData = this.componentInstances.get(componentInstance);

        if (
            !componentData ||
            (theme && theme !== componentData.theme) ||
            (jssOptions && jssOptions !== componentData.jssOptions)
        ) {
            this.setTheme(theme);
            this.setJssOptions(jssOptions);

            const styleSheet = this.createStyleSheet();

            if (componentData && componentData.styleSheet !== styleSheet) {
                this.unmanageComponentInstance(componentInstance);
            }

            componentData = ({
                styleSheet,
                dynamicRules: this.addDynamicRules(styleSheet),
                theme: this.theme,
                jssOptions: this.jssOptions
            }: ComponentData);

            this.manageStyleSheet(this.theme);

            this.componentInstances.set(componentInstance, componentData);
        }

        const {styleSheet, dynamicRules} = componentData;

        this.updateDynamicRules(styleSheet, dynamicRules, data);

        return this.getClassNames(styleSheet, dynamicRules);
    }

    /**
     * @instance
     * @description Forget specified component instance and delete associated data.
     * @param {Object<string,*>} componentInstance - Component instance.
     * @returns {void} Void.
     */
    unmanageComponentInstance(
        componentInstance: ElementRef<ComponentType<any>>
    ) {
        const componentData = this.componentInstances.get(componentInstance);
        if (componentData) {
            const {theme, styleSheet, dynamicRules} = componentData;
            this.unmanageStyleSheet(theme);
            this.deleteDynamicRules(styleSheet, dynamicRules);
            this.componentInstances.delete(componentInstance);
        }
    }

    /**
     * @instance
     * @description Creates and ensures only one style sheet is present for each theme.
     * @returns {Object<string,*>} Style sheet.
     */
    createStyleSheet(): StyleSheet {
        const jss = this.jssOptions.jss;
        const existingStyleSheet = this.sheetsManager.get(this.theme);
        const newStyleSheet =
            existingStyleSheet ||
            jss.createStyleSheet(this.staticStyles, {
                link: !!this.dynamicStyles
            });

        !existingStyleSheet &&
            this.sheetsManager.add(this.theme, newStyleSheet);

        return newStyleSheet;
    }

    /**
     * @instance
     * @description Manage specified style sheet.
     * @param {Object<string,*>} theme - Theme.
     * @returns {void} Void.
     */
    manageStyleSheet(theme: ThemeType) {
        this.sheetsManager.manage(theme);
    }

    /**
     * @instance
     * @description Unmanage specified style sheet.
     * @param {Object<string,*>} theme - Theme.
     * @returns {void} Void.
     */
    unmanageStyleSheet(theme: ThemeType) {
        this.sheetsManager.unmanage(theme);
    }

    /**
     * @instance
     * @description Add dynamic rules to specified stylesheet.
     * @param {Object<string,*>} styleSheet - Style sheet.
     * @returns {Object<string,*>} Dynamic rules.
     */
    addDynamicRules(styleSheet: StyleSheet): {[string]: JSSRule} {
        const rules: {[string]: JSSRule} = {};
        const dynamicStyles = this.dynamicStyles || {};

        for (const key in dynamicStyles) {
            if (!Object.hasOwnProperty.call(dynamicStyles, key)) {
                continue;
            }
            const initialRuleCount = styleSheet.rules.index.length;
            const originalRule = styleSheet.addRule(key, dynamicStyles[key]);

            for (
                let i = initialRuleCount;
                i < styleSheet.rules.index.length;
                i++
            ) {
                const rule = styleSheet.rules.index[i];
                rules[originalRule === rule ? key : rule.key] = rule;
            }
        }

        return rules;
    }

    /**
     * @instance
     * @description Update dynamic rules in style sheet.
     * @param {Object<string,*>} styleSheet - Style sheet.
     * @param {Object<string,*>} dynamicRules - Dynamic rules.
     * @param {Object<string,*>} [data] - Styles data.
     * @returns {void} Void.
     */
    updateDynamicRules(
        styleSheet: StyleSheet,
        dynamicRules: {[string]: JSSRule},
        data?: any
    ) {
        for (const key in dynamicRules) {
            if (!Object.hasOwnProperty.call(dynamicRules, key)) {
                continue;
            }
            styleSheet.updateOne(dynamicRules[key], data);
        }
    }

    /**
     * @instance
     * @description Delete dynamic rules in style sheet.
     * @param {Object<string,*>} styleSheet - Style sheet.
     * @param {Object<string,*>} dynamicRules - Dynamic rules.
     * @returns {void} Void.
     */
    deleteDynamicRules(
        styleSheet: StyleSheet,
        dynamicRules: {[string]: JSSRule}
    ) {
        for (const key in dynamicRules) {
            if (!Object.hasOwnProperty.call(dynamicRules, key)) {
                continue;
            }
            styleSheet.deleteRule(dynamicRules[key]);
        }
    }

    /**
     * @instance
     * @description Set current stored theme and update styles.
     * @param {(Object<string,*>|undefined)} theme - Theme.
     * @returns {void} Void.
     */
    setTheme(theme: ThemeType | typeof undefined) {
        if (theme && theme !== this.theme) {
            this.theme = theme;
            this.styles = Sophistication.getStyles(this.rawStyles, this.theme);
            this.staticStyles = Sophistication.getStaticStyles(this.styles);
            this.dynamicStyles = getDynamicStyles(this.styles);
        }
    }

    /**
     * @instance
     * @description Set current stored JSS options.
     * @param {(Object<string,*>|undefined)} jssOptions - JSS options.
     * @returns {void} Void.
     */
    setJssOptions(jssOptions: JssOptionsType | typeof undefined) {
        if (jssOptions && jssOptions !== this.jssOptions) {
            this.jssOptions = jssOptions;
        }
    }

    /**
     * @instance
     * @description Get class names.
     * @param {Object<string,*>} styleSheet - Style sheet.
     * @param {Object<string,*>} dynamicRules - Dynamic rules.
     * @returns {Object<string,string>} Class names.
     */
    getClassNames(
        styleSheet: StyleSheet,
        dynamicRules: {[string]: JSSRule}
    ): {[string]: string} {
        const classNames = {};

        for (const key in this.styles) {
            if (!Object.hasOwnProperty.call(this.styles, key)) {
                continue;
            }

            if (key in (this.staticStyles || {})) {
                classNames[key] = styleSheet.classes[key];
            }

            if (key in dynamicRules) {
                if (classNames[key]) {
                    classNames[key] +=
                        ' ' + styleSheet.classes[dynamicRules[key].key];
                } else {
                    classNames[key] = styleSheet.classes[dynamicRules[key].key];
                }
            }
        }

        return classNames;
    }

    /**
     * @description Get styles.
     * @param {Object<string,*>} styles - JSS styles.
     * @param {Object<string,*>} theme - Theme.
     * @returns {(Object<string,*>|null)} Static styles.
     */
    static getStyles(styles: StylesType, theme: ThemeType): {[string]: Style} {
        if (typeof styles === 'function') {
            return styles(theme);
        } else {
            return styles;
        }
    }

    /**
     * @description Extract static styles.
     * @param {Object<string,*>} styles - JSS styles.
     * @returns {(Object<string,*>|null)} Static styles.
     */
    static getStaticStyles(styles: StylesType): {[string]: StaticStyle} | null {
        const output = {};

        for (const key in styles) {
            if (!Object.hasOwnProperty.call(styles, key)) {
                continue;
            }

            const value = styles[key];
            const type = typeof value;

            if (type === 'object' && value !== null && !Array.isArray(value)) {
                const extracted = this.getStaticStyles(value);
                if (extracted) {
                    output[key] = extracted;
                }
            } else if (type !== 'function') {
                output[key] = value;
            }
        }

        return Object.getOwnPropertyNames(output).length ? output : null;
    }
}

export {Sophistication};
export type {StylesType};
