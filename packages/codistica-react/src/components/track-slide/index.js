/** @flow */

import React, {useState, useCallback, useEffect} from 'react';
import {animated, useSpring} from 'react-spring';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

// TODO: MAKE next AND previous CALL goTo? TO AVOID CONFUSIONS. (TO CHANGE STATE ONLY IN ONE PLACE)
// TODO: ADD OPTION TO NOT ADD INTERNAL DIMENSION STYLES?
// TODO: ADD DRAG SUPPORT VIA draggable BOOLEAN PROP (IF POSSIBLE) (USE react-use-gesture).
// TODO: ADD swipe SUPPORT IF DRAG SUPPORT IS NOT POSSIBLE.
// TODO: SUPPORT ADJUST SLIDE SIZE TO CURRENT ITEM/ITEMS SIZE? (TO LEAVE SCROLLING TO DOCUMENT) (MAKE A SEPARATE COMPONENT?)
// TODO: CHECK CHANGING itemsPerView WHEN POSITIONED ON HIGH NUMBERED ITEM.

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
        root?: {[string]: any},
        track?: {[string]: any},
        item?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string,
        track?: string,
        item?: string
    }
};

function TrackSlide(props: Props) {
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
            if (value < 0 || itemsPerView >= children.length) {
                value = 0;
            } else if (value + itemsPerView >= children.length) {
                value = children.length - itemsPerView;
            }
            return value;
        },
        [children.length, itemsPerView]
    );

    const [position, setPosition] = useState(clampPosition(startingPosition));

    const goTo = useCallback(
        (targetPosition) => {
            const newPosition = clampPosition(targetPosition);
            if (newPosition === position) {
                return;
            }
            if (onNewPosition) {
                onNewPosition(newPosition);
            }
            setPosition(newPosition);
        },
        [clampPosition, onNewPosition, position]
    );

    const next = useCallback(
        (group) =>
            setPosition((prevPosition) => {
                const delta = group ? itemsPerView : 1;
                const newPosition = clampPosition(prevPosition + delta);
                if (onNewPosition) {
                    onNewPosition(newPosition);
                }
                return newPosition;
            }),
        [itemsPerView, clampPosition, onNewPosition]
    );

    const previous = useCallback(
        (group) =>
            setPosition((prevPosition) => {
                const delta = group ? -itemsPerView : -1;
                const newPosition = clampPosition(prevPosition + delta);
                if (onNewPosition) {
                    onNewPosition(newPosition);
                }
                return newPosition;
            }),
        [itemsPerView, clampPosition, onNewPosition]
    );

    const getTransformValue = useCallback(
        (value) => {
            if (direction === 'row') {
                return `translateX(${value}%)`;
            } else {
                return `translateY(${value}%)`;
            }
        },
        [direction]
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
            height: direction !== 'row' ? `${100 / itemsPerView}%` : '100%',
            width: direction === 'row' ? `${100 / itemsPerView}%` : '100%',
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

    const spring = useSpring({
        translate: (-100 * position) / itemsPerView
    });

    useEffect(() => {
        goTo(position);
    }, [children, children.length, goTo, position]);

    useEffect(() => {
        if (onMount) {
            onMount({
                goTo,
                next,
                previous
            });
        }
    }, [goTo, next, onMount, previous]);

    return (
        <div style={mergedStyles.root} className={mergedClassNames.root}>
            <animated.div
                style={mergeStyles(mergedStyles.track, {
                    transform: spring.translate.interpolate((val) =>
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
}

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

TrackSlide.globalStyles = ({
    default: {
        root: {},
        track: {},
        item: {}
    }
}: GlobalStyles);

TrackSlide.globalClassNames = ({
    default: {
        root: '',
        track: '',
        item: ''
    }
}: GlobalClassNames);

export {TrackSlide};
