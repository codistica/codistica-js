/** @flow */

/** @module react/components/track-slide */

import React, {useState, useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {animated, useSpring} from 'react-spring';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

// TODO: SUPPORT ADJUST SLIDE SIZE TO CURRENT ITEM SIZE (TO LEAVE SCROLLING TO DOCUMENT) (MAKE A SEPARATE COMPONENT?)
// TODO: ADD OPTION TO MAKE INITIAL ANIMATION (LIKE TracklessSlide).
// TODO: ADD OPTION TO NOT ADD INTERNAL DIMENSION STYLES.
// TODO: ADD DRAG SUPPORT VIA draggable BOOLEAN PROP (ONLY IF POSSIBLE) (USE react-use-gesture).
// TODO: ADD swipe SUPPORT IF DRAG SUPPORT IS NOT POSSIBLE.

type Props = {
    direction: 'row' | 'column',
    startingPosition: number,
    itemsPerView: number,
    dimensions: {
        height: string | number,
        width: string | number,
        minHeight?: string | number,
        minWidth?: string | number,
        maxHeight?: string | number,
        maxWidth?: string | number
    },
    onMount: null | ((...args: Array<any>) => any),
    onNewPosition: null | ((...args: Array<any>) => any),
    children: any,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any},
        track?: {[string]: any},
        item?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        track?: string,
        item?: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any},
        track: {[string]: any},
        item: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string,
        track: string,
        item: string
    }
};

type CallableObj = {
    (props: Props): Node,
    globalStyles: GlobalStyles,
    globalClassNames: GlobalClassNames,
    defaultProps: {[string]: any}
};

/**
 * @typedef trackSlideDimensionsType
 * @property {(string|number)} height - Slide height.
 * @property {(string|number)} width - Slide width.
 * @property {(string|number)} [minHeight=null] - Slide minimum height.
 * @property {(string|number)} [minWidth=null] - Slide minimum width.
 * @property {(string|number)} [maxHeight=null] - Slide maximum height.
 * @property {(string|number)} [maxWidth=null] - Slide maximum width.
 */

/**
 * @typedef trackSlidePropsType
 * @property {string} [direction='row'] - Slide direction.
 * @property {number} [startingPosition=0] - Slide starting position.
 * @property {number} [itemsPerView=1] - Slide items per view.
 * @property {trackSlideDimensionsType} [dimensions] - Slide dimensions.
 * @property {Function} [onMount=null] - Callback for componentDidMount event.
 * @property {Function} [onNewPosition=null] - Callback for newPosition event.
 * @property {*} [children=null] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A simple yet powerful track slide component.
 * @param {trackSlidePropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
const TrackSlide: CallableObj = function TrackSlide(props: Props) {
    const {
        direction,
        startingPosition,
        itemsPerView,
        dimensions,
        onMount,
        onNewPosition,
        children,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme
    } = props;

    const {
        height = 100,
        width = 100,
        minHeight = null,
        minWidth = null,
        maxHeight = null,
        maxWidth = null
    } = dimensions || {};

    const clampPosition = useCallback(
        (value) => {
            if (value + itemsPerView >= children.length) {
                value = children.length - itemsPerView;
            } else if (value < 0) {
                value = 0;
            }
            return value;
        },
        [children.length]
    );

    const [state, setState] = useState({
        position: clampPosition(startingPosition)
    });

    const isRow: boolean = direction === 'row';

    const goTo = useCallback(
        (newPosition) => {
            newPosition = clampPosition(newPosition);
            onNewPosition && onNewPosition(newPosition);
            setState({position: newPosition});
        },
        [clampPosition]
    );

    const next = useCallback(
        (group) =>
            setState((prevState) => {
                const delta = group ? itemsPerView : 1;
                const newPosition = clampPosition(prevState.position + delta);
                onNewPosition && onNewPosition(newPosition);
                return {
                    position: newPosition
                };
            }),
        [itemsPerView, clampPosition]
    );

    const previous = useCallback(
        (group) =>
            setState((prevState) => {
                const delta = group ? -itemsPerView : -1;
                const newPosition = clampPosition(prevState.position + delta);
                onNewPosition && onNewPosition(newPosition);
                return {
                    position: newPosition
                };
            }),
        [itemsPerView, clampPosition]
    );

    const getTransformValue = useCallback(
        (value) => {
            if (isRow) {
                return `translateX(${value}%)`;
            } else {
                return `translateY(${value}%)`;
            }
        },
        [isRow]
    );

    const globalStyles = globalTheme
        ? TrackSlide.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? TrackSlide.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style, {
            height,
            width,
            minHeight,
            minWidth,
            maxHeight,
            maxWidth
        }),
        track: mergeStyles(globalStyles.track, customStyles.track, {
            height: '100%',
            width: '100%',
            minHeight: null,
            minWidth: null,
            maxHeight: null,
            maxWidth: null,
            display: 'flex',
            flexDirection: direction
        }),
        item: mergeStyles(globalStyles.item, customStyles.item, {
            height: !isRow ? `${100 / itemsPerView}%` : '100%',
            width: isRow ? `${100 / itemsPerView}%` : '100%',
            minHeight: null,
            minWidth: null,
            maxHeight: null,
            maxWidth: null
        })
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.root,
            componentClassNames.root,
            globalClassNames.root,
            customClassNames.root,
            className
        ),
        track: mergeClassNames(
            componentClassNames.track,
            globalClassNames.track,
            customClassNames.track
        ),
        item: mergeClassNames(
            componentClassNames.item,
            globalClassNames.item,
            customClassNames.item
        )
    };

    const springProps = useSpring({
        translateValue: (-100 * state.position) / itemsPerView
    });

    useEffect(() => {
        onMount &&
            onMount({
                goTo,
                next,
                previous
            });
    }, []);

    return (
        <div style={mergedStyles.root} className={mergedClassNames.root}>
            <animated.div
                style={mergeStyles(mergedStyles.track, {
                    transform: springProps.translateValue.interpolate((val) =>
                        getTransformValue(val)
                    )
                })}
                className={mergedClassNames.track}>
                {children.map((child, index) => {
                    return (
                        <div
                            key={index}
                            style={mergedStyles.item}
                            className={mergedClassNames.item}>
                            {child}
                        </div>
                    );
                })}
            </animated.div>
        </div>
    );
};

TrackSlide.globalStyles = {
    default: {
        root: {},
        track: {},
        item: {}
    }
};

TrackSlide.globalClassNames = {
    default: {
        root: '',
        track: '',
        item: ''
    }
};

TrackSlide.defaultProps = {
    direction: 'row',
    startingPosition: 0,
    itemsPerView: 1,
    onMount: null,
    onNewPosition: null,
    children: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {TrackSlide};
