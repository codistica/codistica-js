/** @flow */

import React, {
    useState,
    useEffect,
    useCallback,
    isValidElement,
    cloneElement
} from 'react';
import type {Element, ComponentType} from 'react';
import resetClassNames from '../css/reset.module.scss';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';

// TODO: ADD SUPPORT FOR FOCUSING?

type ElementType = ComponentType<any> | string;

type DefaultProps = {|
    component: ElementType,
    defaultRender: ElementType | Element<any> | null,
    onHoverRender: ElementType | Element<any> | null,
    defaultProps: {[string]: any} | null,
    onHoverProps: {[string]: any} | null,
    disable: boolean,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any}
    },
    customClassNames: {
        root?: string
    },
    globalTheme: 'default' | string | null,
    children: any | null
|};

type Props = {
    ...DefaultProps
};

type GlobalStyles = {
    [string]: {
        root?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string
    }
};

function HoverSwitch(props: Props) {
    const {
        component: Component,
        defaultRender,
        onHoverRender,
        defaultProps,
        onHoverProps,
        disable,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme,
        children,
        ...other
    } = props;

    const globalStyles = globalTheme
        ? HoverSwitch.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? HoverSwitch.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(
            {
                display: 'inline-block'
            },
            globalStyles.root,
            customStyles.root,
            style
        )
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.greedy,
            globalClassNames.root,
            customClassNames.root,
            className
        )
    };

    const [isHovered, setIsHovered] = useState(false);

    const onHoverHandler = useCallback(
        (e) => {
            if (disable) {
                return;
            }
            switch (e.type) {
                case 'mouseenter':
                    setIsHovered(true);
                    break;

                case 'mouseleave':
                    setIsHovered(false);
                    break;

                case 'touchmove':
                    // TODO.
                    break;

                default:
                    break;
            }
        },
        [disable]
    );

    useEffect(() => {
        if (disable) {
            setIsHovered(false);
        }
    }, [disable]);

    const SelectedRender: any = (isHovered && onHoverRender) || defaultRender;
    const innerProps = (isHovered && onHoverProps) || defaultProps || {};
    const mergedInnerProps = {...(other: any), ...innerProps};

    const innerElement = isValidElement(SelectedRender)
        ? cloneElement(SelectedRender, mergedInnerProps)
        : SelectedRender && (
              <SelectedRender {...mergedInnerProps}>
                  {mergedInnerProps.children || children}
              </SelectedRender>
          );

    return (
        <Component
            {...other}
            style={mergedStyles.root}
            className={mergedClassNames.root}
            onMouseEnter={onHoverHandler}
            onMouseLeave={onHoverHandler}
            onTouchMove={onHoverHandler}>
            {innerElement}
        </Component>
    );
}

HoverSwitch.defaultProps = ({
    component: 'div',
    defaultRender: null,
    onHoverRender: null,
    defaultProps: null,
    onHoverProps: null,
    disable: false,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default',
    children: null
}: DefaultProps);

HoverSwitch.globalStyles = ({
    default: {
        root: {}
    }
}: GlobalStyles);

HoverSwitch.globalClassNames = ({
    default: {
        root: ''
    }
}: GlobalClassNames);

export {HoverSwitch};
