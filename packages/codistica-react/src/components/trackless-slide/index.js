/** @flow */

// TODO: ADD OPTION TO NOT ADD INTERNAL DIMENSION STYLES?
// TODO: ADD DRAG SUPPORT VIA draggable BOOLEAN PROP (IF POSSIBLE) (USE react-use-gesture).
// TODO: ADD swipe SUPPORT IF DRAG SUPPORT IS NOT POSSIBLE.

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {animated, useTransition} from 'react-spring';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';
import {generateView} from './internals/generate-view.js';

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
    waitForSpring: boolean,
    lazyRender: boolean,
    precision: number,
    onMount: null | ((...args: Array<any>) => any),
    onNewPosition: null | ((...args: Array<any>) => any),
    children: any,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any},
        item?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        item?: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root?: {[string]: any},
        item?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string,
        item?: string
    }
};

function TracklessSlide(props: Props) {
    const {
        direction,
        startingPosition,
        itemsPerView,
        dimensions,
        waitForSpring,
        lazyRender,
        precision,
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
            if (!children.length) {
                return 0;
            }
            if (value < 0) {
                return (value % children.length) + children.length;
            }
            return value % children.length;
        },
        [children.length]
    );

    const positionRef = useRef(clampPosition(startingPosition));
    const isFirstRenderRef = useRef(true);
    const isRestingRef = useRef(true);

    const [view, setView] = useState(() =>
        generateView({
            children,
            itemsPerView,
            position: positionRef.current,
            lazyRender,
            previousView: null
        })
    );

    const goTo = useCallback(
        (targetPosition) => {
            if (waitForSpring && !isRestingRef.current) {
                return;
            }

            const newPosition = clampPosition(targetPosition);

            if (onNewPosition && newPosition !== positionRef.current) {
                onNewPosition(newPosition);
            }

            positionRef.current = newPosition;

            setView((prevView) => {
                return generateView({
                    children,
                    itemsPerView,
                    position: positionRef.current,
                    lazyRender,
                    previousView: prevView
                });
            });
        },
        [
            waitForSpring,
            clampPosition,
            onNewPosition,
            children,
            itemsPerView,
            lazyRender
        ]
    );

    const next = useCallback(
        (group) => {
            goTo(positionRef.current + (group ? itemsPerView : 1));
        },
        [goTo, itemsPerView]
    );

    const previous = useCallback(
        (group) => {
            goTo(positionRef.current + (group ? -itemsPerView : -1));
        },
        [goTo, itemsPerView]
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
        ? TracklessSlide.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? TracklessSlide.globalClassNames[globalTheme] || {}
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
        item: mergeClassNames(
            componentClassNames.item,
            globalClassNames.item,
            customClassNames.item
        )
    };

    const transition = useTransition(
        lazyRender ? view.items.filter((a) => a.isInView) : view.items,
        (item) => item.key,
        {
            config: {
                precision
            },
            unique: true,
            reset: true,
            from(item) {
                return item.from;
            },
            enter(item) {
                return item.enter;
            },
            leave(item) {
                return item.leave;
            },
            update(item) {
                return item.update;
            },
            onStart() {
                isRestingRef.current = false;
            },
            onRest() {
                isRestingRef.current = true;
            }
        }
    );

    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }
        goTo(positionRef.current);
    }, [children, children.length, goTo]);

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
            {transition.map((data) => {
                const {transform, visibility} = data.props;
                return (
                    <animated.div
                        key={data.key}
                        style={mergeStyles(mergedStyles.item, {
                            transform: transform.interpolate((val) =>
                                getTransformValue(val)
                            ),
                            visibility
                        })}
                        className={mergedClassNames.item}>
                        {data.item.child}
                    </animated.div>
                );
            })}
        </div>
    );
}

TracklessSlide.defaultProps = {
    direction: 'row',
    startingPosition: 0,
    itemsPerView: 1,
    waitForSpring: false,
    lazyRender: true,
    precision: 0.01,
    onMount: null,
    onNewPosition: null,
    children: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

TracklessSlide.globalStyles = ({
    default: {
        root: {},
        item: {}
    }
}: GlobalStyles);

TracklessSlide.globalClassNames = ({
    default: {
        root: '',
        item: ''
    }
}: GlobalClassNames);

export {TracklessSlide};
