/** @flow */

/** @module react/components/slide */

import classnames from 'classnames/dedupe';
import React, {useState, useEffect, useRef} from 'react';
import {useSpring, animated} from 'react-spring';
import {onDragHOC} from '../../hocs/on-drag-hoc.js';
import {viewportMonitor} from '../../modules/viewport-monitor.js';
import Styles from './index.module.scss';

type Props = {
    className: string,
    style: Object,
    masterStyle: Object,
    trackStyle: Object,
    itemStyle: Object,
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
    onAPI: Function | null,
    children: any
};

Slide.defaultProps = {
    className: '',
    style: {},
    masterStyle: {},
    trackStyle: {},
    itemStyle: {},
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
    onAPI: null,
    children: null
};

const Div = animated(viewportMonitor.HOC('div'));
const DivDraggable = onDragHOC(Div);

// TODO: FIX STYLE REPLACEMENT IN viewportMonitor. ERROR WRITING TO read-only? CREATE DEEP CLONE FUNCTION? FIX ALL ObjectUtils? AND ADJUST USAGE (IN codistica AND PROJECTS, CHECK)
// TODO: FIX UNITS CORRECTION MODEL. CORRECTION MUST BE BY A COEFFICIENT (CHECK 0 BEHAVIOUR)

/**
 * @typedef trackBehaviourType
 * @property {boolean} [inheritSize=false] - Makes slide track match master element size.
 * @property {(number|null)} [viewportSpeedRatio=null] - When present, slide track size is set using viewport units. Passed coefficient will be applied to calculated size.
 * @property {(number|null)} [minSize=null] - Track minimum size value.
 * @property {(number|null)} [maxSize=null] - Track maximum size value.
 */

/**
 * @typedef slidePropsType
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {Object<string,*>} [masterStyle={}] - Style to be applied to slide master element.
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
 * @property {Function} [onAPI=null] - Callback for API event.
 * @property {string} [children=null] - React prop.
 */

/**
 * @description A simple yet powerful slide component.
 * @param {slidePropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function Slide(props: Props) {
    const {
        gap,
        children,
        className,
        direction,
        itemsPerView,
        justifyType,
        onAPI,
        responsive,
        style,
        masterStyle,
        trackStyle,
        itemStyle,
        trackBehaviour,
        onSwitchStart,
        onSwitchEnd,
        onPositionChange,
        limitBehaviour,
        startingPosition,
        ...other
    } = props;

    const masterRef = useRef(null);
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

    const MASTER_CLASSNAME = classnames(
        {[className]: className},
        {[Styles._main]: true},
        {[Styles._scope]: true},
        {[Styles.master]: true}
    );

    const TRACK_CLASSNAME = classnames(
        {[Styles.trackRow]: isRow},
        {[Styles.trackColumn]: !isRow}
    );

    const ITEM_CLASSNAME = classnames(
        {[Styles.item]: justifyType !== 'dynamic'},
        {[Styles.itemDynamicRow]: justifyType === 'dynamic' && isRow},
        {[Styles.itemDynamicColumn]: justifyType === 'dynamic' && !isRow}
    );

    const innerStyles = {
        masterStyle: {
            ...masterStyle,
            visibility: masterRef.current ? 'visible' : 'hidden'
        },
        trackStyle: {
            ...trackStyle
        },
        itemStyle: {
            ...itemStyle
        }
    };

    let slideSize = 0;
    let viewportSize = 0;
    let referenceSize = 0;
    let referenceUnits = '';
    let relativeSize = 0;

    if (masterRef.current) {
        slideSize = masterRef.current.getBoundingClientRect()[_sizeKey];
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
            innerStyles.masterStyle[
                _sizeKey
            ] = `${relativeSize}${referenceUnits}`;
        }

        if (trackBehaviour.inheritSize) {
            innerStyles.trackStyle[_sizeKey] = '100%';
        }

        if (typeof trackBehaviour.viewportSpeedRatio === 'number') {
            innerStyles.trackStyle[_sizeKey] = `${
                trackBehaviour.viewportSpeedRatio *
                ((slideSize * 100) / viewportSize)
            }vh`; // FIXES ISSUE OF VERTICAL RELATIVE VALUES FOLLOWING HORIZONTAL SIZES (WHEN SLIDE IS COLUMN)
        }

        if (typeof trackBehaviour.minSize === 'number') {
            innerStyles.trackStyle[
                isRow ? 'minWidth' : 'minHeight'
            ] = `${trackBehaviour.minSize}px`;
        }

        if (typeof trackBehaviour.maxSize === 'number') {
            innerStyles.trackStyle[
                isRow ? 'maxWidth' : 'maxHeight'
            ] = `${trackBehaviour.maxSize}px`;
        }
    }

    // TRANSLATE TRACK
    innerStyles.trackStyle.transform = useSpring({
        translateValue: (targetTranslateValueRef.current =
            (responsive && referenceSize
                ? ((translateValue || 0) * 100) / referenceSize
                : translateValue || 0) * -1),
        immediate: noAnimationRef.current,
        onStart: onStart,
        onRest: onEnd
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

    // EXPOSE API
    useEffect(() => {
        if (typeof onAPI === 'function') {
            onAPI({
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
        <Div
            {...other}
            className={MASTER_CLASSNAME}
            style={innerStyles.masterStyle}
            ref={setRefs}>
            <DivDraggable
                className={TRACK_CLASSNAME}
                style={innerStyles.trackStyle}
                onDrag={onDrag}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}>
                {children.map((item, index) => {
                    return (
                        <Div
                            key={index}
                            className={ITEM_CLASSNAME}
                            style={innerStyles.itemStyle}>
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
     * @description Handler for drag event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    function onDrag(e: Object) {
        setTranslateValue(
            (translateValue || 0) - (isRow ? e.deltaX : e.deltaY)
        );
    }

    function onDragStart() {
        noAnimationRef.current = true;
        isDraggingRef.current = true;
    }

    function onDragEnd() {
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

    function onStart() {
        if (!isDraggingRef.current && !isSwitchingRef.current) {
            // ANIMATION STARTED
            isSwitchingRef.current = true;
            if (typeof onSwitchStart === 'function') {
                onSwitchStart(positionRef.current);
            }
        }
    }

    function onEnd() {
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
     * @description Save master element and items references.
     * @param {Object<string,*>} ref - Master element reference.
     * @returns {void} Void.
     */
    function setRefs(ref: Object) {
        masterRef.current = ref;
        itemsRef.current = masterRef.current
            ? masterRef.current.firstElementChild.children
            : [];
    }
}

// TODO: SUPPORT FOR DRAG (SET POINTER TOO)
// TODO: SUPPORT FOR SCROLL AND SWIPE (smartScroll, WITH SETTINGS)
// TODO: USE SCROLL TO DRAG? WHEN NOT TO PULL? WITH TIMER TO DETECT END? (IMPLEMENT TIMER IN onScrollAll FOR onScrollAllEnd)
// TODO: CREATE smartScroll UTILITY APART?
// TODO: CREATE tabBlocker UTILITY APART?
// TODO: SUPPORT DRAG AND smartScroll? (INCLUDE DRAG IN POSSIBLE INPUTS FOR smartScroll)
// TODO: SUPPORT FOR KEYBOARD (NAVIGATE WITH ARROWS, GOTO WITH NUMBERS (NICE))

// TODO: ADD start AND end TO ALL THIS SPECIAL EVENTS?
// TODO: IN onPull, REUSE overscroll LOGIC, CREATE AN UTILITY FUNCTION? TO DETECT SCROLL CASES
// TODO: onDrag -> onScrollAll -> onPull
// TODO: ADD DAMPING AND MOMENTUM OPTION TO ALL THIS EVENTS
// TODO: ADD FLOW ANNOTATIONS

// TODO: SUPPORT FOR OPACITY TRANSITION? AND OTHER TYPES OF TRANSITION? WITHOUT COMPLICATING COMPONENT. USE react-spring POTENTIAL!
// TODO: SUPPORT ADJUST SLIDE SIZE TO CURRENT ITEM SIZE (IMPLEMENT APART? USE API TO PASS USEFUL DATA?)
// TODO: SUPPORT FOR SLIDE AUTO SET WITH itemsPerView. CLONE children TO MODIFY ITS STYLE?
// TODO: TRY SUPPORTING ALL POSSIBLE CASES FOR SLIDE/ITEMS SIZES (EQUAL, DIFFERENT, ETC)
// TODO: TRY TO EXTRACT FRAMEWORK INDEPENDENT CODE TO A SlideEngine CLASS (AND EXTEND IT?) (IMPORT FROM elements). IMPORT NEEDED TYPES? IF NOT POSSIBLE, DELETE ALL engines IDEA
// TODO: DELETE ALL engines IDEA???
// TODO: TEST (USE ITAVEN HEADER EXAMPLE) (FOR 'anomalousSize')
// TODO: TEST FAST RESIZE WITH JS MEDIA QUERIES?
// TODO: IMPLEMENT limitBehaviour LOGIC INSIDE children.map?

export {Slide};
