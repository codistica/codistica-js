/** @flow */

/** @module react/classes/sophistication */

import {create} from 'jss';
import type {StyleSheet} from 'jss';
import {default as jssPresetDefault} from 'jss-preset-default';
import type React from 'react';

const customJss = create().setup(jssPresetDefault());

// TODO: ADD HOOKS SUPPORT FOR FUNCTIONAL COMPONENTS.
// TODO: SEE react-jss SOURCE CODE TO SEE HOW STYLESHEETS ARE HANDLED. CREATION, UPDATE AND DELETION! TO BE AS OPTIMIZED AS POSSIBLE.

/**
 * @classdesc A class for library components sophistication.
 */
class Sophistication<Styles: {[string]: any}, Params: {[string]: any}> {
    styles: Styles;
    styleSheets: WeakMap<any, StyleSheet>;

    /**
     * @description Constructor.
     * @param {Object<string,*>} styles - JSS styles object.
     */
    constructor(styles: Styles) {
        this.styles = styles;
        this.styleSheets = new WeakMap();
    }

    /**
     * @description Attached stylesheet.
     * @param {Object<string,*>} component - Component instance.
     * @returns {void} Void.
     */
    setup(component: React.Component<any, any>) {
        if (this.styleSheets.has(component)) {
            return;
        }
        const styleSheet = customJss.createStyleSheet(this.styles, {
            link: true
        });
        styleSheet.attach();
        this.styleSheets.set(component, styleSheet);
    }

    /**
     * @description Detaches stylesheet and removes it from registry.
     * @param {Object<string,*>} component - Component instance.
     * @returns {void} Void.
     */
    destroy(component: React.Component<any, any>) {
        const styleSheet = this.styleSheets.get(component);
        if (!styleSheet) {
            return;
        }
        customJss.removeStyleSheet(styleSheet);
        this.styleSheets.delete(component);
    }

    /**
     * @description Updates stylesheet and returns classes object.
     * @param {Object<string,*>} component - Component instance.
     * @param {Object<string,*>} params - Styles parameters.
     * @returns {Object<string,string>} Classes object.
     */
    getClassNames(
        component: React.Component<any, any>,
        params: Params
    ): {[$Keys<Styles>]: string} {
        const styleSheet = this.styleSheets.get(component);
        if (!styleSheet) {
            return {};
        }
        styleSheet.update(params);
        return styleSheet.classes;
    }
}

export {Sophistication};
