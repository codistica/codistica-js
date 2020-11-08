/** @flow */

/** @module react/utils/draggable */

import React from 'react';
import resetClassNames from '../css/reset.module.scss';
import {withOnDrag} from '../hocs/with-on-drag.js';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';

// TODO: CREATE withPositionBoundaries HOC (TO PREVENT EXITING PARENT ELEMENT VIA POSITION PROPERTIES).

const Div = withOnDrag<{}>('div');

type Props = {
    noLimit: boolean,
    isolate: boolean,
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

type State = {
    position: string | null,
    top: number,
    left: number
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

/**
 * @typedef draggablePropsType
 * @property {boolean} [noLimit=false] - Allow element to be dragged outside of parent element.
 * @property {boolean} [isolate=true] - Prevent gestures propagation.
 * @property {*} [children=null] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @classdesc A draggable component.
 */
class Draggable extends React.Component<Props, State> {
    static globalStyles: GlobalStyles = {
        default: {
            root: {}
        }
    };

    static globalClassNames: GlobalClassNames = {
        default: {
            root: ''
        }
    };

    static defaultProps = {
        noLimit: false,
        isolate: true,
        children: null,
        style: {},
        className: '',
        customStyles: {},
        customClassNames: {},
        globalTheme: 'default'
    };

    elementRef: any;
    containerHeight: number;
    containerWidth: number;

    /**
     * @description Constructor.
     * @param {draggablePropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.elementRef = null;
        this.containerHeight = 0;
        this.containerWidth = 0;

        this.state = {
            position: null,
            top: 0,
            left: 0
        };

        // BIND METHODS
        (this: any).onDrag = this.onDrag.bind(this);
        (this: any).setElementRef = this.setElementRef.bind(this);
    }

    /**
     * @instance
     * @description React lifecycle.
     * @returns {void} Void.
     */
    componentDidMount() {
        this.containerHeight = this.elementRef.offsetParent.clientHeight;
        this.containerWidth = this.elementRef.offsetParent.clientWidth;
        this.setState({
            position: 'absolute',
            top:
                this.props.noLimit ||
                (this.elementRef.offsetTop + this.elementRef.offsetHeight <=
                    this.containerHeight &&
                    this.elementRef.offsetTop >= 0)
                    ? this.elementRef.offsetTop
                    : 0,
            left:
                this.props.noLimit ||
                (this.elementRef.offsetLeft + this.elementRef.offsetWidth <=
                    this.containerWidth &&
                    this.elementRef.offsetLeft >= 0)
                    ? this.elementRef.offsetLeft
                    : 0
        });
    }

    /**
     * @instance
     * @description Callback for drag event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onDrag(e: {[string]: any}) {
        this.setState((prevState) => {
            const limitTop =
                this.containerHeight - this.elementRef.offsetHeight;
            const limitLeft = this.containerWidth - this.elementRef.offsetWidth;
            let newTop = prevState.top + e.deltaY;
            let newLeft = prevState.left + e.deltaX;
            if (!this.props.noLimit) {
                newTop = newTop > limitTop ? limitTop : newTop;
                newTop = newTop < 0 ? 0 : newTop;
                newLeft = newLeft > limitLeft ? limitLeft : newLeft;
                newLeft = newLeft < 0 ? 0 : newLeft;
            }
            return {
                top: newTop,
                left: newLeft
            };
        });
    }

    /**
     * @instance
     * @description Save component reference.
     * @param {Object<string,*>} ref - Component reference.
     * @returns {void} Void.
     */
    setElementRef(ref: any) {
        // SAVE REF
        this.elementRef = ref;
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {
            children,
            isolate,
            noLimit,
            style,
            className,
            customStyles,
            customClassNames,
            globalTheme,
            ...other
        } = this.props;
        const {position, top, left} = this.state;

        const globalStyles = globalTheme
            ? Draggable.globalStyles[globalTheme] || {}
            : {};

        const globalClassNames = globalTheme
            ? Draggable.globalClassNames[globalTheme] || {}
            : {};

        const mergedStyles = {
            root: mergeStyles(globalStyles.root, customStyles.root, style, {
                position,
                top,
                left
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

        return (
            <Div
                {...other}
                isolate={isolate}
                onDrag={this.onDrag}
                ref={this.setElementRef}
                style={mergedStyles.root}
                className={mergedClassNames.root}>
                {children}
            </Div>
        );
    }
}

export {Draggable};
