/** @flow */

import React from 'react';

type Props = {
    children: any
};

type State = {
    title: string
};

/**
 * @typedef headerContextProps
 * @property {*} [children=null] - React prop.
 */

const HeaderContext: Object = React.createContext({
    title: '',
    changeTitle: null
});

/**
 * @classdesc Header context store.
 */
class HeaderStore extends React.Component<Props, State> {
    static defaultProps = {
        children: null
    };

    /**
     * @description Constructor.
     * @param {headerContextProps} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            title: ''
        };

        // BIND METHODS
        (this: any).changeTitle = this.changeTitle.bind(this);
    }

    /**
     * @instance
     * @description Title change method.
     * @param {string} title - New title.
     * @returns {void} Void.
     */
    changeTitle(title: string) {
        this.setState({title});
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {title} = this.state;
        const {changeTitle} = this;
        return (
            <HeaderContext.Provider
                value={{
                    title,
                    changeTitle
                }}>
                {this.props.children}
            </HeaderContext.Provider>
        );
    }
}

export {HeaderContext, HeaderStore};
