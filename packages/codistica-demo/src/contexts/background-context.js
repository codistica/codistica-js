/** @flow */

import React, {createContext} from 'react';

type Props = {
    children: any
};

type State = {
    imgSrc: string,
    movSrc: string,
    opacity: number
};

/**
 * @typedef backgroundContextProps
 * @property {*} [children=null] - React prop.
 */

const BackgroundContext: Object = createContext({
    imgSrc: '',
    movSrc: '',
    opacity: 1,
    changeBackground: null
});

/**
 * @classdesc Background context provider.
 */
class BackgroundProvider extends React.Component<Props, State> {
    static defaultProps = {
        children: null
    };

    /**
     * @description Constructor.
     * @param {backgroundContextProps} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            imgSrc: '',
            movSrc: '',
            opacity: 1
        };

        // BIND METHODS
        (this: any).changeBackground = this.changeBackground.bind(this);
    }

    /**
     * @typedef backgroundContextChangeBackgroundType
     * @property {string} [imgSrc] - Background image source.
     * @property {string} [movSrc] - Background video source.
     * @property {number} [opacity] - Opacity to be applied to opacity layer.
     */

    /**
     * @instance
     * @description Background change method.
     * @param {backgroundContextChangeBackgroundType} bgData - New background data.
     * @returns {void} Void.
     */
    changeBackground(bgData: {
        imgSrc: string,
        movSrc: string,
        opacity: number
    }) {
        const {imgSrc, movSrc, opacity} = bgData;
        this.setState({imgSrc, movSrc, opacity});
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {imgSrc, movSrc, opacity} = this.state;
        const {changeBackground} = this;
        return (
            <BackgroundContext.Provider
                value={{
                    imgSrc,
                    movSrc,
                    opacity,
                    changeBackground
                }}>
                {this.props.children}
            </BackgroundContext.Provider>
        );
    }
}

export {BackgroundContext, BackgroundProvider};
