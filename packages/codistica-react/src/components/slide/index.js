/** @flow */

/** @module react/components/slide */

import React, {useState, useEffect, useRef} from 'react';
import {useSpring, animated} from 'react-spring';
import resetClassName from '../../css/reset.module.scss';
import {withOnDrag} from '../../hocs/with-on-drag.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import {viewportMonitor} from '../../modules/viewport-monitor.js';
import classNames from './index.module.scss';

// TODO: RECALCULATE AND UPDATE translateValue (WITHOUT CALLING setTranslateValue?) WHEN RESIZING TO AVOID BUG WHEN DRAGGING AFTER RESIZING.
// TODO: OR! STORE RELATIVE UNITS VALUES IN translateValue! (CREATE NEEDED AUX FUNCTIONS) (ALWAYS USE RELATIVE UNITS? EVEN WHEN NOT RESPONSIVE? TO SIMPLIFY THINGS)

// TODO: SUPPORT FOR DRAG (SET POINTER TOO)
// TODO: SUPPORT FOR SCROLL AND SWIPE (smartScroll, WITH SETTINGS)
// TODO: USE SCROLL TO DRAG? WHEN NOT TO PULL? WITH TIMER TO DETECT END? (IMPLEMENT TIMER IN onScroll FOR onScrollEnd)
// TODO: CREATE smartScroll UTILITY APART?
// TODO: CREATE tabBlocker UTILITY APART?
// TODO: SUPPORT DRAG AND smartScroll? (INCLUDE DRAG IN POSSIBLE INPUTS FOR smartScroll)
// TODO: SUPPORT FOR KEYBOARD (NAVIGATE WITH ARROWS, GOTO WITH NUMBERS (NICE))

// TODO: ADD start AND end TO ALL THIS SPECIAL EVENTS?
// TODO: IN onPull, REUSE overscroll LOGIC, CREATE AN UTILITY FUNCTION? TO DETECT SCROLL CASES
// TODO: onDrag -> onScroll -> onPull
// TODO: ADD DAMPING AND MOMENTUM OPTION TO ALL THIS EVENTS
// TODO: ADD FLOW ANNOTATIONS

// TODO: SUPPORT FOR OPACITY TRANSITION? AND OTHER TYPES OF TRANSITION? WITHOUT COMPLICATING COMPONENT. USE react-spring POTENTIAL!
// TODO: SUPPORT ADJUST SLIDE SIZE TO CURRENT ITEM SIZE (IMPLEMENT APART? USE controls TO PASS USEFUL DATA?)
// TODO: SUPPORT FOR SLIDE AUTO SET WITH itemsPerView. CLONE children TO MODIFY ITS STYLE?
// TODO: TRY SUPPORTING ALL POSSIBLE CASES FOR SLIDE/ITEMS SIZES (EQUAL, DIFFERENT, ETC)
// TODO: TRY TO EXTRACT FRAMEWORK INDEPENDENT CODE TO A SlideEngine CLASS (AND EXTEND IT?) (IMPORT FROM elements). IMPORT NEEDED TYPES? IF NOT POSSIBLE, DELETE ALL engines IDEA
// TODO: DELETE ALL engines IDEA???
// TODO: TEST (USE ITAVEN HEADER EXAMPLE) (FOR 'anomalousSize')
// TODO: TEST FAST RESIZE WITH JS MEDIA QUERIES?
// TODO: IMPLEMENT limitBehaviour LOGIC INSIDE children.map?

const Div = animated(viewportMonitor.HOC('div'));
const DivDraggable = withOnDrag(Div);

type Props = {
    direction: 'row' | 'column',
    itemsPerView: number,
    startingPosition: number,
    gap: number,
    justifyType: 'weighted' | 'dynamic' | 'normal',
    limitBehaviour: 'stop' | 'restart' | 'loop',
    responsive: boolean,
    trackBehaviour: {
        inheritSize: boolean,
        viewportSpeedRatio: number | null,
        minSize: number | null,
        maxSize: number | null
    },
    onSwitchStart: Function | null,
    onSwitchEnd: Function | null,
    onPositionChange: Function | null,
    onMount: Function | null,
    children: any,
    customStyles: {
        root?: {[string]: any},
        track?: {[string]: any},
        item?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        track?: string,
        item?: string
    }
};

Slide.defaultProps = {
    direction: 'row',
    itemsPerView: 1,
    startingPosition: 0,
    gap: 0,
    justifyType: 'normal',
    limitBehaviour: 'stop',
    responsive: false,
    trackBehaviour: {
        inheritSize: false,
        viewportSpeedRatio: null,
        minSize: null,
        maxSize: null
    },
    onSwitchStart: null,
    onSwitchEnd: null,
    onPositionChange: null,
    onMount: null,
    children: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef trackBehaviourType
 * @property {boolean} [inheritSize=false] - Makes slide track match root element size.
 * @property {(number|null)} [viewportSpeedRatio=null] - When present, slide track size is set using viewport units. Passed coefficient will be applied to calculated size.
 * @property {(number|null)} [minSize=null] - Track minimum size value.
 * @property {(number|null)} [maxSize=null] - Track maximum size value.
 */

/**
 * @typedef slidePropsType
 * @property {string} [className=''] - React prop.
 * @property {Object<string,string>} [style={}] - React prop.
 * @property {Object<string,*>} [rootStyle={}] - Style to be applied to slide root element.
 * @property {Object<string,*>} [trackStyle={}] - Style to be applied to slide track.
 * @property {Object<string,*>} [itemStyle={}] - Style to be applied to slide items.
 * @property {string} [direction='row'] - Slide direction.
 * @property {number} [itemsPerView=1] - Slide items per view.
 * @property {number} [startingPosition=0] - Slide starting position index.
 * @property {number} [gap=0] - Space to be added between slide items in pixels.
 * @property {string} [justifyType='normal] - Tells Slide how spacing between items should be handled.
 * @property {string} [limitBehaviour='stop'] - Tells Slide how to act when attempting to switch before first item or after last element.
 * @property {boolean} [responsive=false] - Makes slide responsive.
 * @property {trackBehaviourType} [trackBehaviour] - Track behaviour options.
 * @property {Function} [onSwitchStart=null] - Callback for switchStart event.
 * @property {Function} [onSwitchEnd=null] - Callback for switchEnd event.
 * @property {Function} [onPositionChange=null] - Callback for positionChange event.
 * @property {Function} [onMount=null] - Callback for mount event.
 * @property {*} [children=null] - React prop.
 */

/**
 * @description A simple yet powerful slide component.
 * @param {slidePropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function Slide(props: Props) {
    const {
        // gap,
        children,
        direction,
        itemsPerView,
        justifyType,
        onMount,
        responsive,
        trackBehaviour,
        onSwitchStart,
        onSwitchEnd,
        onPositionChange,
        // limitBehaviour,
        startingPosition,
        customStyles,
        customClassNames
    } = props;

    const rootRef = useRef(null);
    const itemsRef = useRef([]);
    const noAnimationRef = useRef(false);
    const isDraggingRef = useRef(false);
    const isSwitchingRef = useRef(false);
    const oldPositionRef = useRef(0);
    const positionRef = useRef(0);
    const targetTranslateValueRef = useRef(0);
    const currentTranslateValueRef = useRef(0);
    const [translateValue, setTranslateValue] = useState(null);

    const isRow = direction === 'row';
    const useViewport =
        responsive &&
        typeof trackBehaviour.viewportSpeedRatio !== 'number' &&
        typeof trackBehaviour.minSize !== 'number' &&
        typeof trackBehaviour.maxSize !== 'number';
    const _sizeKey = isRow ? 'width' : 'height';

    const rootClassNames = mergeClassNames(
        resetClassName.root,
        classNames.root,
        customClassNames.root
    );

    const trackClassNames = mergeClassNames(
        {
            [classNames.trackRow]: isRow,
            [classNames.trackColumn]: !isRow
        },
        customClassNames.track
    );

    const itemClassNames = mergeClassNames(
        {
            [classNames.item]: justifyType !== 'dynamic',
            [classNames.itemDynamicRow]: justifyType === 'dynamic' && isRow,
            [classNames.itemDynamicColumn]: justifyType === 'dynamic' && !isRow
        },
        customClassNames.item
    );

    const rootStyles = mergeStyles(customStyles.root, {
        visibility: rootRef.current ? 'visible' : 'hidden'
    });

    const trackStyles = customStyles.track || {};

    const itemStyles = customStyles.item || {};

    let slideSize = 0;
    let viewportSize = 0;
    let referenceSize = 0;
    let referenceUnits = '';
    let relativeSize = 0;

    if (rootRef.current) {
        slideSize = rootRef.current.getBoundingClientRect()[_sizeKey];
        viewportSize = isRow
            ? viewportMonitor.getViewportWidth()
            : viewportMonitor.getViewportHeight();
        referenceSize = useViewport ? viewportSize : slideSize;
        referenceUnits = responsive
            ? useViewport
                ? isRow
                    ? 'vw'
                    : 'vh'
                : '%'
            : 'px';
        relativeSize = (slideSize * 100) / referenceSize;

        if (responsive) {
            rootStyles[_sizeKey] = `${relativeSize}${referenceUnits}`;
        }

        if (trackBehaviour.inheritSize) {
            trackStyles[_sizeKey] = '100%';
        }

        if (typeof trackBehaviour.viewportSpeedRatio === 'number') {
            trackStyles[_sizeKey] = `${
                trackBehaviour.viewportSpeedRatio *
                ((slideSize * 100) / viewportSize)
            }vh`; // FIXES ISSUE OF VERTICAL RELATIVE VALUES FOLLOWING HORIZONTAL SIZES (WHEN SLIDE IS COLUMN)
        }

        if (typeof trackBehaviour.minSize === 'number') {
            trackStyles[
                isRow ? 'minWidth' : 'minHeight'
            ] = `${trackBehaviour.minSize}px`;
        }

        if (typeof trackBehaviour.maxSize === 'number') {
            trackStyles[
                isRow ? 'maxWidth' : 'maxHeight'
            ] = `${trackBehaviour.maxSize}px`;
        }
    }

    // TRANSLATE TRACK
    trackStyles.transform = useSpring({
        translateValue: (targetTranslateValueRef.current =
            (responsive && referenceSize
                ? ((translateValue || 0) * 100) / referenceSize
                : translateValue || 0) * -1),
        immediate: noAnimationRef.current,
        onStart: onStartHandler,
        onRest: onEndHandler
    }).translateValue.interpolate(
        (val) =>
            `translate${
                isRow ? 'X' : 'Y'
            }(${(currentTranslateValueRef.current = val)}${referenceUnits})`
    );

    // DETECT POSITION CHANGE
    useEffect(() => {
        if (oldPositionRef.current !== positionRef.current) {
            // NEW POSITION SET
            oldPositionRef.current = positionRef.current;
            if (typeof onPositionChange === 'function') {
                onPositionChange(positionRef.current);
            }
        }
    }, [positionRef.current]);

    // EXPOSE CONTROLS
    useEffect(() => {
        if (typeof onMount === 'function') {
            onMount({
                switchTo,
                switchBy
            });
        }
    }, []);

    // GO TO STARTING POSITION
    useEffect(() => {
        switchTo(startingPosition);
    }, []);

    return (
        <Div ref={setRefs} style={rootStyles} className={rootClassNames}>
            <DivDraggable
                onDrag={onDragHandler}
                onDragStart={onDragStartHandler}
                onDragEnd={onDragEndHandler}
                style={trackStyles}
                className={trackClassNames}>
                {children.map((item, index) => {
                    return (
                        <Div
                            key={index}
                            style={itemStyles}
                            className={itemClassNames}>
                            {item}
                        </Div>
                    );
                })}
            </DivDraggable>
        </Div>
    );

    /**
     * @description Switch slide by the specified value.
     * @param {(string|number)} val - Switch by value. Use '{+/-}group' to switch by an entire view. Positive numbers switch ahead, negative behind.
     * @returns {void} Void.
     */
    function switchBy(val) {
        if (val === '+group') {
            switchTo(positionRef.current + itemsPerView);
        } else if (val === '-group') {
            switchTo(positionRef.current - itemsPerView);
        } else if (typeof val === 'number') {
            switchTo(positionRef.current + val);
        }
    }

    /**
     * @description Switch slide to the specified item position index.
     * @param {number} pos - Target item position index.
     * @returns {void} Void.
     */
    function switchTo(pos) {
        let newValue = 0;
        if (pos < 0) {
            newValue = calculateTranslationTo(0);
            positionRef.current = 0;
        } else if (pos > children.length - 1) {
            newValue = calculateTranslationTo(children.length - 1);
            positionRef.current = children.length - 1;
        } else {
            newValue = calculateTranslationTo(pos);
            positionRef.current = pos;
        }
        setTranslateValue(newValue);
    }

    /**
     * @description Callback for drag event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    function onDragHandler(e: {[string]: any}) {
        setTranslateValue(
            (translateValue || 0) - (isRow ? e.deltaX : e.deltaY)
        );
    }

    /**
     * @description Callback for dragStart event.
     * @returns {void} Void.
     */
    function onDragStartHandler() {
        noAnimationRef.current = true;
        isDraggingRef.current = true;
    }

    /**
     * @description Callback for dragEnd event.
     * @returns {void} Void.
     */
    function onDragEndHandler() {
        let i = 1;
        let flag = 1;
        let currentValue = Math.abs(
            (translateValue || 0) - calculateTranslationTo(0)
        );
        let newValue = 0;
        noAnimationRef.current = false;
        isDraggingRef.current = false;
        while (flag) {
            newValue = Math.abs(
                (translateValue || 0) - calculateTranslationTo(i)
            );
            if (i === children.length || newValue > currentValue) {
                flag = 0;
                i--;
            } else {
                currentValue = newValue;
                i++;
            }
        }
        switchTo(i);
    }

    /**
     * @description Callback for start event.
     * @returns {void} Void.
     */
    function onStartHandler() {
        if (!isDraggingRef.current && !isSwitchingRef.current) {
            // ANIMATION STARTED
            isSwitchingRef.current = true;
            if (typeof onSwitchStart === 'function') {
                onSwitchStart(positionRef.current);
            }
        }
    }

    /**
     * @description Callback for end event.
     * @returns {void} Void.
     */
    function onEndHandler() {
        if (
            !isDraggingRef.current &&
            isSwitchingRef.current &&
            currentTranslateValueRef.current === targetTranslateValueRef.current
        ) {
            // ANIMATION ENDED
            isSwitchingRef.current = false;
            if (typeof onSwitchEnd === 'function') {
                onSwitchEnd(positionRef.current);
            }
        }
    }

    /**
     * @description Calculates translation distance in pixels from the current position to the specified one.
     * @param {number} targetPosition - Target item position index.
     * @returns {number} Translation distance.
     */
    function calculateTranslationTo(targetPosition) {
        let i = 0;
        let output = 0;
        let computedStyle = {};
        let size = 0;
        let marginA = 0;
        let marginB = 0;
        for (i = 0; i < targetPosition; i++) {
            size = itemsRef.current[i].getBoundingClientRect()[_sizeKey];
            computedStyle = window.getComputedStyle(itemsRef.current[i]);
            marginA = parseFloat(
                computedStyle[isRow ? 'marginLeft' : 'marginTop']
            );
            marginB = parseFloat(
                computedStyle[isRow ? 'marginRight' : 'marginBottom']
            );
            if (justifyType === 'dynamic') {
                if (i === positionRef.current) {
                    // IMPORTANT. MUST BE MARGIN 'B' TO AVOID CONSIDERING EXTRA MARGIN
                    output += size + marginB * 2;
                } else {
                    // IMPORTANT. MUST BE MARGIN 'A' TO AVOID CONSIDERING EXTRA MARGIN
                    output += size + marginA * 2;
                }
            } else {
                // CONSIDER BOTH MARGINS
                output += size + marginA + marginB;
            }
        }
        return output;
    }

    /**
     * @description Save root element and items references.
     * @param {Object<string,*>} ref - Root element reference.
     * @returns {void} Void.
     */
    function setRefs(ref: any) {
        rootRef.current = ref;
        itemsRef.current = rootRef.current
            ? rootRef.current.firstElementChild.children
            : [];
    }
}

export {Slide};
