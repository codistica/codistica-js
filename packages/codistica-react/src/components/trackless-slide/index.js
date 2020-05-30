/** @flow */

/** @module react/components/trackless-slide */

// TODO: ADD OPTION TO AVOID INITIAL ANIMATION.
// TODO: ADD OPTION TO NOT ADD INTERNAL DIMENSION STYLES.
// TODO: MAKE next AND previous CALL goTo? TO AVOID CONFUSIONS. (TO CHANGE STATE ONLY IN ONE PLACE)
// TODO: IMPLEMENT DEFINITIVE KEY SYSTEM (MAKE IT WORK FOR ANY NUMBER OF CHILDREN).
// TODO: ADD DRAG SUPPORT VIA draggable BOOLEAN PROP (ONLY IF POSSIBLE) (USE react-use-gesture).
// TODO: ADD swipe SUPPORT IF DRAG SUPPORT IS NOT POSSIBLE.

import {arrayUtils, SEEDS} from '@codistica/core';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import type {Node} from 'react';
import {animated, useTransition} from 'react-spring';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    direction: 'row' | 'column',
    startingPosition: number,
    itemsPerView: number,
    dimensions: {
        height: string | number,
        width: string | number,
        minHeight: string | number,
        minWidth: string | number,
        maxHeight: string | number,
        maxWidth: string | number
    },
    emulateTrack: boolean,
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
 * @typedef tracklessSlideDimensionsType
 * @property {(string|number)} [height=100] - Slide height.
 * @property {(string|number)} [width=100] - Slide width.
 * @property {(string|number)} [minHeight=null] - Slide minimum height.
 * @property {(string|number)} [minWidth=null] - Slide minimum width.
 * @property {(string|number)} [maxHeight=null] - Slide maximum height.
 * @property {(string|number)} [maxWidth=null] - Slide maximum width.
 */

/**
 * @typedef tracklessSlidePropsType
 * @property {string} [direction='row'] - Slide direction.
 * @property {number} [startingPosition=0] - Slide starting position.
 * @property {number} [itemsPerView=1] - Slide items per view.
 * @property {tracklessSlideDimensionsType} [dimensions] - Slide dimensions.
 * @property {boolean} [emulateTrack=false] - Emulate a track by rendering all children.
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
 * @description A simple yet powerful trackless slide component.
 * @param {tracklessSlidePropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
const TracklessSlide: CallableObj = function TracklessSlide(props: Props) {
    const {
        direction,
        startingPosition,
        itemsPerView,
        dimensions,
        emulateTrack,
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

    const [state, setState] = useState({
        position: startingPosition,
        delta: itemsPerView,
        previousViewArray: []
    });

    const previousViewArrayRef = useRef([]);

    const isRow: boolean = direction === 'row';

    const goTo = useCallback(
        (newPosition) =>
            setState((prevState) => {
                const delta = arrayUtils.getShortestPath(
                    children,
                    prevState.position,
                    newPosition
                );
                newPosition = (prevState.position + delta) % children.length;
                onNewPosition && onNewPosition(newPosition);
                return {
                    position: newPosition,
                    delta,
                    previousViewArray: previousViewArrayRef.current
                };
            }),
        [children.length]
    );

    const next = useCallback(
        (group) =>
            setState((prevState) => {
                const delta = group ? itemsPerView : 1;
                const newPosition =
                    (prevState.position + delta) % children.length;
                onNewPosition && onNewPosition(newPosition);
                return {
                    position: newPosition,
                    delta,
                    previousViewArray: previousViewArrayRef.current
                };
            }),
        [itemsPerView, children.length]
    );

    const previous = useCallback(
        (group) =>
            setState((prevState) => {
                const delta = group ? -itemsPerView : -1;
                let newPosition =
                    (prevState.position + delta) % children.length;
                newPosition =
                    newPosition >= 0
                        ? newPosition
                        : children.length + newPosition;
                onNewPosition && onNewPosition(newPosition);
                return {
                    position: newPosition,
                    delta,
                    previousViewArray: previousViewArrayRef.current
                };
            }),
        [itemsPerView, children.length]
    );

    const getIndexFromKey = useCallback((array, key) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].key === key || array[i].key === key + 'X') {
                return i;
            }
        }
        return null;
    }, []);

    const getStringKey = useCallback((input) => {
        return SEEDS.alphaLow.charAt(input);
    }, []);

    const generateViewArray = useCallback(
        (position) => {
            const output = [];
            let slot = -Math.floor((children.length - itemsPerView) / 2);
            let key = (position + slot) % children.length;
            let index = 0;
            if (key < 0) {
                key += children.length;
            }
            while (index < children.length) {
                if (emulateTrack || (slot >= 0 && slot < itemsPerView)) {
                    output.push({
                        elem: children[key],
                        key: getStringKey(key),
                        slot
                    });
                }
                slot++;
                key = (key + 1) % children.length;
                index++;
            }
            return output;
        },
        [children.length, itemsPerView, emulateTrack]
    );

    const getCurrentViewArray = useCallback(() => {
        const newViewArray = generateViewArray(state.position);

        if (!emulateTrack) {
            return newViewArray;
        }

        const forward = Math.sign(state.delta) !== -1;

        let probeIndex = getIndexFromKey(
            state.previousViewArray,
            newViewArray[forward ? 0 : newViewArray.length - 1].key
        );

        if (typeof probeIndex !== 'number') {
            probeIndex = forward ? 0 : newViewArray.length - 1;
        }

        let equivalentIndex = probeIndex;

        for (
            let index = forward ? 0 : newViewArray.length - 1;
            forward ? index < newViewArray.length : index >= 0;
            index += forward ? 1 : -1
        ) {
            if (state.previousViewArray[probeIndex]) {
                newViewArray[index].key =
                    state.previousViewArray[probeIndex].key;
            } else {
                if (state.previousViewArray[equivalentIndex]) {
                    newViewArray[index].key = state.previousViewArray[
                        equivalentIndex
                    ].key.endsWith('X')
                        ? state.previousViewArray[equivalentIndex].key.replace(
                              'X',
                              ''
                          )
                        : state.previousViewArray[equivalentIndex].key + 'X';
                }
            }

            probeIndex += forward ? 1 : -1;
            equivalentIndex =
                (equivalentIndex + (forward ? 1 : -1)) % children.length;

            if (equivalentIndex < 0) {
                equivalentIndex += state.previousViewArray.length;
            }
        }

        return newViewArray;
    }, [
        generateViewArray,
        state.position,
        state.delta,
        state.previousViewArray
    ]);

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
        item: mergeClassNames(
            componentClassNames.item,
            globalClassNames.item,
            customClassNames.item
        )
    };

    const transitions = useTransition(
        (previousViewArrayRef.current = getCurrentViewArray()),
        (i) => i.key,
        {
            unique: false,
            /**
             * @description From callback.
             * @param {Object} arg - Arg.
             * @param {number} arg.slot - Item slot.
             * @returns {Object<string,*>} Props.
             */
            from: function from({slot}) {
                const sign = Math.sign(state.delta);
                const multiplier = emulateTrack
                    ? Math.abs(state.delta)
                    : Math.min(Math.abs(state.delta), itemsPerView);
                return {
                    transform: getTransformValue(
                        100 * (slot + sign * multiplier)
                    )
                };
            },
            /**
             * @description Enter callback.
             * @param {Object} arg - Arg.
             * @param {number} arg.slot - Item slot.
             * @returns {Object<string,*>} Props.
             */
            enter: function enter({slot}) {
                return {
                    transform: getTransformValue(slot * 100)
                };
            },
            /**
             * @description Leave callback.
             * @param {Object} arg - Arg.
             * @param {number} arg.slot - Item slot.
             * @returns {Object<string,*>} Props.
             */
            leave: function leave({slot}) {
                const sign = Math.sign(state.delta);
                const multiplier = emulateTrack
                    ? Math.abs(state.delta)
                    : Math.min(Math.abs(state.delta), itemsPerView);
                return {
                    transform: getTransformValue(
                        100 * (slot - sign * multiplier)
                    )
                };
            },
            /**
             * @description Update callback.
             * @param {Object} arg - Arg.
             * @param {number} arg.slot - Item slot.
             * @returns {Object<string,*>} Props.
             */
            update: function update({slot}) {
                return {
                    transform: getTransformValue(slot * 100)
                };
            }
        }
    );

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
            {transitions.map((transition) => {
                return (
                    <animated.div
                        key={transition.key}
                        style={mergeStyles(mergedStyles.item, transition.props)}
                        className={mergedClassNames.item}>
                        {transition.item.elem}
                    </animated.div>
                );
            })}
        </div>
    );
};

TracklessSlide.globalStyles = {
    default: {
        root: {},
        item: {}
    }
};

TracklessSlide.globalClassNames = {
    default: {
        root: '',
        item: ''
    }
};

TracklessSlide.defaultProps = {
    direction: 'row',
    startingPosition: 0,
    itemsPerView: 1,
    emulateTrack: false,
    onMount: null,
    onNewPosition: null,
    children: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {TracklessSlide};
