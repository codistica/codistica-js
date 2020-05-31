/** @flow */

/** @module react/components/carousel-slide */

import React, {useRef, useCallback, useEffect, useState} from 'react';
import type {Node} from 'react';
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
        root: {[string]: any},
        item: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string,
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
 * @typedef carouselSlideDimensionsType
 * @property {(string|number)} height - Slide height.
 * @property {(string|number)} width - Slide width.
 * @property {(string|number)} [minHeight=null] - Slide minimum height.
 * @property {(string|number)} [minWidth=null] - Slide minimum width.
 * @property {(string|number)} [maxHeight=null] - Slide maximum height.
 * @property {(string|number)} [maxWidth=null] - Slide maximum width.
 */

/**
 * @typedef carouselSlidePropsType
 * @property {string} [direction='row'] - Slide direction.
 * @property {number} [startingPosition=0] - Slide starting position.
 * @property {carouselSlideDimensionsType} [dimensions] - Slide dimensions.
 * @property {number} [drift=0] - Drift for items separation.
 * @property {number} [offset=0] - Offset for items separation.
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
 * @description A simple yet powerful carousel slide component.
 * @param {carouselSlidePropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
const CarouselSlide: CallableObj = function CarouselSlide(props: Props) {
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

    const position = useRef(clampPosition(startingPosition));
    const rootRef = useRef(null);
    const isDragging = useRef(false);
    const isDraggingTimer = useRef(null);
    const [isGrabbing, setIsGrabbing] = useState(false);

    const isRow: boolean = direction === 'row';
    const positionKey: string = isRow ? 'left' : 'top';

    const getPositionValue = useCallback(
        (i, delta) => {
            const slot = i - position.current;
            const percent = 50 + slot * 50 * (1 - drift);
            const constant = slot * offset + (delta || 0);
            return `calc(${percent}% + ${constant}px)`;
        },
        [position.current, drift, offset]
    );

    const [springProps, setSpringProps] = useSprings(children.length, (i) => ({
        positionValue: getPositionValue(i),
        scale: 1,
        display: 'block'
    }));

    const setPosition = useCallback(
        (newPosition) => {
            onNewPosition && onNewPosition(newPosition);
            position.current = newPosition;
            setSpringProps((i) => {
                return {
                    positionValue: getPositionValue(i)
                };
            });
        },
        [getPositionValue]
    );

    const goTo = useCallback(
        (newPosition) => {
            setPosition(clampPosition(newPosition));
        },
        [clampPosition, setPosition]
    );

    const next = useCallback(() => goTo(position.current + 1), [goTo]);

    const previous = useCallback(() => goTo(position.current - 1), [goTo]);

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

    let bind = null;

    if (!disableGestures) {
        bind = useGesture(
            {
                /**
                 * @description Callback for clickCapture event.
                 * @param {Object<string,*>} e - Triggering event.
                 * @returns {void} Void.
                 */
                onClickCapture(e) {
                    if (isDragging.current) {
                        e.cancelable && e.preventDefault();
                        e.stopPropagation();
                    }
                },
                /**
                 * @description Callback for mouseDownCapture event.
                 * @returns {void} Void.
                 */
                onMouseDownCapture() {
                    setIsGrabbing(true);
                },
                /**
                 * @description Callback for mouseUpCapture event.
                 * @returns {void} Void.
                 */
                onMouseUpCapture() {
                    setIsGrabbing(false);
                },
                /**
                 * @description Callback for drag event.
                 * @param {Object} arg - Arg.
                 * @param {boolean} arg.down - Down.
                 * @param {Array<number>} arg.movement - Movement.
                 * @param {Array<number>} arg.direction - Direction.
                 * @param {number} arg.distance - Movement.
                 * @param {Function} arg.cancel - Cancel.
                 * @returns {void} Void.
                 */
                onDrag({
                    down,
                    movement: [movX, movY],
                    direction: [dirX, dirY],
                    distance,
                    cancel
                }) {
                    let slideSize = isRow
                        ? window.innerWidth
                        : window.innerHeight;

                    setIsGrabbing(down);

                    if (!down) {
                        isDraggingTimer.current = setTimeout(() => {
                            isDragging.current = false;
                        }, 500);
                    } else {
                        clearTimeout(isDraggingTimer.current);
                        isDraggingTimer.current = null;
                        isDragging.current = true;
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
                            clampPosition(position.current + (dir > 0 ? -1 : 1))
                        );
                    }

                    setSpringProps((i) => {
                        return {
                            positionValue: getPositionValue(i, down ? mov : 0)
                        };
                    });
                }
            },
            {
                drag: {
                    filterTaps: true
                }
            }
        );
    }

    useEffect(() => {
        onMount &&
            onMount({
                goTo,
                next,
                previous
            });
    }, []);

    return (
        <div
            ref={rootRef}
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            {springProps.map((springProp, index) => {
                return (
                    <animated.div
                        key={index}
                        {...((bind && bind()) || {})}
                        style={mergeStyles(mergedStyles.item, {
                            [positionKey]: springProp.positionValue
                        })}
                        className={mergedClassNames.item}>
                        {children[index]}
                    </animated.div>
                );
            })}
        </div>
    );
};

CarouselSlide.globalStyles = {
    default: {
        root: {},
        item: {}
    }
};

CarouselSlide.globalClassNames = {
    default: {
        root: '',
        item: ''
    }
};

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

export {CarouselSlide};
