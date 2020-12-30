/** @flow */

import React, {createContext, Component} from 'react';

type Props = {
    children: any
};

type State = {
    imgSrc: string,
    movSrc: string,
    opacity: number
};

const BackgroundContext: Object = createContext({
    imgSrc: '',
    movSrc: '',
    opacity: 1,
    changeBackground: null
});

class BackgroundProvider extends Component<Props, State> {
    static defaultProps = {
        children: null
    };

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

    changeBackground(bgData: {
        imgSrc: string,
        movSrc: string,
        opacity: number
    }) {
        const {imgSrc, movSrc, opacity} = bgData;
        this.setState({imgSrc, movSrc, opacity});
    }

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
