/** @flow */

// TODO: FIX CROSS DRAG INTERFERENCE. (EX. HORIZONTAL SLIDE SWITCHING WHEN SCROLLING VERTICALLY)

import React, {useRef, useCallback, useEffect, useState} from 'react';
import {animated, useSprings} from 'react-spring';
import {useGesture} from 'react-use-gesture';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    direction: 'row' | 'column',
    startingPosition: number,
    dimensions: {
        height: string | number,
        width: string | number,
        minHeight?: string | number,
        minWidth?: string | number,
        maxHeight?: string | number,
        maxWidth?: string | number
    },
    drift: number,
    offset: number,
    showOverflow: boolean,
    disableGestures: boolean,
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

function CarouselSlide(props: Props) {
    const {
        direction,
        startingPosition,
        dimensions,
        drift,
        offset,
        showOverflow,
        disableGestures,
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
            if (value >= children.length) {
                value = children.length - 1;
            } else if (value < 0) {
                value = 0;
            }
            return value;
        },
        [children.length]
    );

    const positionRef = useRef(clampPosition(startingPosition));
    const rootRef = useRef(null);
    const isDraggingRef = useRef(false);
    const isDraggingTimerRef = useRef(null);

    const [isGrabbing, setIsGrabbing] = useState(false);

    const isRow: boolean = direction === 'row';
    const positionKey: string = isRow ? 'left' : 'top';

    const getPositionValue = useCallback(
        (i, delta) => {
            const slot = i - positionRef.current;
            const percent = 50 + slot * 50 * (1 - drift);
            const constant = slot * offset + (delta || 0);
            return `calc(${percent}% + ${constant}px)`;
        },
        [drift, offset]
    );

    const [springs, setSprings] = useSprings(children.length, (i) => ({
        position: getPositionValue(i),
        scale: 1,
        display: 'block'
    }));

    const setPosition = useCallback(
        (newPosition) => {
            if (newPosition === positionRef.current) {
                return;
            }
            if (onNewPosition) {
                onNewPosition(newPosition);
            }
            positionRef.current = newPosition;
            setSprings((i) => {
                return {
                    position: getPositionValue(i)
                };
            });
        },
        [onNewPosition, setSprings, getPositionValue]
    );

    const goTo = useCallback(
        (targetPosition) => {
            setPosition(clampPosition(targetPosition));
        },
        [clampPosition, setPosition]
    );

    const next = useCallback(() => goTo(positionRef.current + 1), [goTo]);

    const previous = useCallback(() => goTo(positionRef.current - 1), [goTo]);

    const globalStyles = globalTheme
        ? CarouselSlide.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? CarouselSlide.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style, {
            height,
            width,
            minHeight,
            minWidth,
            maxHeight,
            maxWidth,
            overflow: showOverflow ? 'visible' : 'hidden'
        }),
        item: mergeStyles(globalStyles.item, customStyles.item, {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: disableGestures ? null : isGrabbing ? 'grabbing' : 'grab'
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

    const bind = useGesture(
        {
            onClickCapture(e) {
                if (isDraggingRef.current) {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    e.stopPropagation();
                }
            },
            onMouseDownCapture() {
                setIsGrabbing(true);
            },
            onMouseUpCapture() {
                setIsGrabbing(false);
            },
            onDrag({
                down,
                movement: [movX, movY],
                direction: [dirX, dirY],
                distance,
                cancel
            }) {
                let slideSize = isRow ? window.innerWidth : window.innerHeight;

                setIsGrabbing(down);

                if (!down) {
                    isDraggingTimerRef.current = setTimeout(() => {
                        isDraggingRef.current = false;
                    }, 500);
                } else {
                    clearTimeout(isDraggingTimerRef.current);
                    isDraggingTimerRef.current = null;
                    isDraggingRef.current = true;
                }

                if (rootRef.current) {
                    slideSize = isRow
                        ? rootRef.current.clientWidth
                        : rootRef.current.clientHeight;
                }

                const mov = isRow ? movX : movY;
                const dir = isRow ? dirX : dirY;

                const switchThreshold = (slideSize * (1 - drift)) / 4;

                if (down && distance > switchThreshold) {
                    cancel();
                    setPosition(
                        clampPosition(positionRef.current + (dir > 0 ? -1 : 1))
                    );
                }

                setSprings((i) => {
                    return {
                        position: getPositionValue(i, down ? mov : 0)
                    };
                });
            }
        },
        {
            drag: {
                filterTaps: true
            },
            enabled: !disableGestures
        }
    );

    useEffect(() => {
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
    }, [onMount, goTo, next, previous]);

    return (
        <div
            ref={rootRef}
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            {springs.map((spring, index) => {
                return (
                    <animated.div
                        key={index}
                        {...bind()}
                        style={mergeStyles(mergedStyles.item, {
                            [positionKey]: spring.position
                        })}
                        className={mergedClassNames.item}>
                        {children[index]}
                    </animated.div>
                );
            })}
        </div>
    );
}

CarouselSlide.defaultProps = {
    direction: 'row',
    startingPosition: 0,
    itemsPerView: 1,
    drift: 0,
    offset: 0,
    showOverflow: false,
    disableGestures: false,
    onMount: null,
    onNewPosition: null,
    children: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

CarouselSlide.globalStyles = ({
    default: {
        root: {},
        item: {}
    }
}: GlobalStyles);

CarouselSlide.globalClassNames = ({
    default: {
        root: '',
        item: ''
    }
}: GlobalClassNames);

export {CarouselSlide};
