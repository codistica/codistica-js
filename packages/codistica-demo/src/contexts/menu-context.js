/** @flow */

import React, {createContext} from 'react';

type Props = {
    children: any
};

type State = {
    isOpen: boolean
};

/**
 * @typedef menuContextProps
 * @property {*} [children=null] - React prop.
 */

const MenuContext: Object = createContext({
    isOpen: false,
    openMenu: null
});

/**
 * @classdesc Menu context provider.
 */
class MenuProvider extends React.Component<Props, State> {
    static defaultProps = {
        children: null
    };

    /**
     * @description Constructor.
     * @param {menuContextProps} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false
        };

        // BIND METHODS
        (this: any).openMenu = this.openMenu.bind(this);
    }

    /**
     * @instance
     * @description Menu open/close method.
     * @param {string} value - New open/close value.
     * @returns {void} Void.
     */
    openMenu(value: string) {
        this.setState({isOpen: !!value});
    }

    /**
     * @instance
     * @description React render method.
     * @returns {Object<string,*>} React component.
     */
    render() {
        const {isOpen} = this.state;
        const {openMenu} = this;
        return (
            <MenuContext.Provider
                value={{
                    isOpen,
                    openMenu
                }}>
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}

export {MenuContext, MenuProvider};
