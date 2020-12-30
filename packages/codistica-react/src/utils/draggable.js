/** @flow */

import {elementUtils, viewportMonitor} from '@codistica/browser';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import resetClassNames from '../css/reset.module.scss';
import {withOnDrag} from '../hocs/with-on-drag.js';
import {getRefHandler} from '../modules/get-ref-handler.js';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';

// TODO: IMPLEMENT Impetus.js LIBRARY. DO IN withOnDrag HOC?
// TODO: MAKE ADJUST ON VIEWPORT change (OR SIMILAR) VIA OPTION INSTEAD OF shift WHEN ViewportMonitor IS IMPROVED.

type Props = {
    momentum: boolean,
    boundary: 'none' | 'parent' | 'viewport' | HTMLElement | null,
    grabThreshold: null | number,
    children: any,
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

const AnimatedDiv = withOnDrag({
    isolateTouch: true
})(animated.div);

const Div = withOnDrag({
    isolateTouch: true
})(animated.div);

function Draggable(props: Props) {
    const {
        momentum,
        boundary,
        grabThreshold,
        children,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme,
        ...other
    } = props;

    const componentRef = useRef(null);

    const lastTop = useRef(0);
    const lastLeft = useRef(0);

    const [isGrabbed, setIsGrabbed] = useState(false);

    const [position, setPosition] = useState({
        top: 0,
        left: 0
    });

    const [spring, setSpring] = useSpring(() => ({
        top: 0,
        left: 0,
        config: {
            mass: 0.1,
            tension: 200,
            friction: 20,
            velocity: 0
        }
    }));

    const onDragStartHandler = useCallback(() => {
        setIsGrabbed(true);
    }, []);

    const onDragEndHandler = useCallback(() => {
        setIsGrabbed(false);
    }, []);

    const onDragHandler = useCallback(
        ({deltaX, deltaY}) => {
            if (!componentRef.current) {
                return;
            }

            const {top, left} = elementUtils.getBoundPosition({
                top: lastTop.current + deltaY,
                left: lastLeft.current + deltaX,
                elem: componentRef.current,
                boundary
            });

            lastTop.current = top;
            lastLeft.current = left;

            setPosition({
                top,
                left
            });

            setSpring({
                top,
                left
            });
        },
        [boundary, setSpring]
    );

    const globalStyles = globalTheme
        ? Draggable.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? Draggable.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style, {
            position: 'absolute',
            top: momentum ? spring.top : position.top,
            left: momentum ? spring.left : position.left,
            cursor: isGrabbed ? 'grabbing' : 'grab'
        })
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.root,
            globalClassNames.root,
            customClassNames.root,
            className
        )
    };

    const Component = momentum ? AnimatedDiv : Div;

    useEffect(() => {
        const handler = function handler() {
            setSpring({
                reset: !momentum, // TODO: IS THIS NEEDED?
                immediate: !momentum
            });
            onDragHandler({deltaX: 0, deltaY: 0, velocityX: 0});
        };

        // THIS WILL ALLOW elementUtils.getBoundPosition TO ADJUST BOUNDARY WHEN VIEWPORT SHIFTS.
        viewportMonitor.on('shift', handler);

        handler();

        return () => viewportMonitor.off('shift', handler);
    }, [momentum, onDragHandler, setSpring]);

    return (
        <Component
            {...other}
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
            onDrag={onDragHandler}
            grabThreshold={grabThreshold}
            ref={getRefHandler(componentRef)}
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            {children}
        </Component>
    );
}

Draggable.defaultProps = {
    momentum: true,
    boundary: 'viewport',
    grabThreshold: null,
    children: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

Draggable.globalStyles = ({
    default: {
        root: {}
    }
}: GlobalStyles);

Draggable.globalClassNames = ({
    default: {
        root: ''
    }
}: GlobalClassNames);

export {Draggable};
