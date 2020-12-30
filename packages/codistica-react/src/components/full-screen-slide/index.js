/** @flow */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {withOverscrollBlocker} from '../../hocs/with-overscroll-blocker.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {TrackSlide} from '../track-slide/index.js';

// TODO: ADD SUPPORT FOR KEYBOARD NAVIGATION (NAVIGATE WITH ARROWS, GOTO WITH NUMBERS, ETC)

const OverscrollBlockerDiv = withOverscrollBlocker<{}>('div');

type Props = {
    direction: 'row' | 'column',
    startingPosition: number,
    itemsPerView: number,
    onMount: null | ((...args: Array<any>) => any),
    onNewPosition: null | ((...args: Array<any>) => any),
    children: any,
    elements: any,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any}
    },
    customClassNames: {
        root?: string
    },
    globalTheme: 'default' | string | null
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

function FullScreenSlide(props: Props) {
    const {
        elements,
        children,
        customStyles,
        customClassNames,
        style,
        className,
        globalTheme,
        ...others
    } = props;

    const globalStyles = globalTheme
        ? FullScreenSlide.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? FullScreenSlide.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style, {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
        })
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.greedy,
            globalClassNames.root,
            customClassNames.root,
            className
        )
    };

    return (
        <OverscrollBlockerDiv
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            {elements}
            <TrackSlide
                {...others}
                dimensions={{
                    height: '100%',
                    width: '100%'
                }}
                globalTheme={null}>
                {children}
            </TrackSlide>
        </OverscrollBlockerDiv>
    );
}

FullScreenSlide.defaultProps = {
    direction: 'row',
    startingPosition: 0,
    itemsPerView: 1,
    onMount: null,
    onNewPosition: null,
    children: null,
    elements: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

FullScreenSlide.globalStyles = ({
    default: {
        root: {}
    }
}: GlobalStyles);

FullScreenSlide.globalClassNames = ({
    default: {
        root: ''
    }
}: GlobalClassNames);

export {FullScreenSlide};
