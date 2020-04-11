/** @flow */

/** @module react/components/draggable */

import classnames from 'classnames/dedupe';
import React from 'react';
import {onDragHOC} from '../../hocs/on-drag-hoc.js';
import Styles from './index.module.scss';

type Props = {
    children: any,
    style: Object,
    className: string,
    noLimit: boolean,
    isolate: boolean
};

type State = {
    position: string | null,
    top: number | null,
    left: number | null
};

const Div = onDragHOC('div');

/**
 * @typedef draggablePropsType
 * @property {string} [children=null] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {boolean} [noLimit=false] - Allow element to be dragged outside of parent element.
 * @property {boolean} [isolate=true] - Prevent gestures propagation.
 */

/**
 * @classdesc A draggable component.
 */
class Draggable extends React.Component<Props, State> {
    static defaultProps = {
        children: null,
        style: {},
        className: '',
        noLimit: false,
        isolate: true
    };

    elementRef: Object;
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
            top: null,
            left: null
        };

        // BIND METHODS
        (this: Function).onDrag = this.onDrag.bind(this);
        (this: Function).setElementRef = this.setElementRef.bind(this);
    }

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
     * @description Handler for drag event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onDrag(e: Object) {
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
    setElementRef(ref: Object) {
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
            className,
            children,
            style,
            isolate,
            noLimit,
            ...others
        } = this.props;
        const {position, top, left} = this.state;
        const mainClassName = classnames(
            {[className]: className},
            {[Styles._main]: true},
            {[Styles._scope]: true}
        );
        return (
            <Div
                {...others}
                isolate={isolate}
                className={mainClassName}
                style={{...style, position, top, left}}
                onDrag={this.onDrag}
                ref={this.setElementRef}>
                {children}
            </Div>
        );
    }
}

export {Draggable};
