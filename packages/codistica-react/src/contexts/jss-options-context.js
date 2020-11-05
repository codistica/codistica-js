/** @flow */

import type {Jss} from 'jss';
import type {Context, Element} from 'react';
import React, {useState, createContext} from 'react';
import {defaultJss} from '../modules/jss.js';

type JssOptionsType = {|
    jss: Jss
|};

type JssOptionsContextType = Context<
    [JssOptionsType, (value: JssOptionsType) => void]
>;

type DefaultProps = {|
    children: any,
    value: null | JssOptionsType
|};

type Props = {
    ...DefaultProps
};

const defaultJssOptions = {
    jss: defaultJss
};

const JssOptionsContext: JssOptionsContextType = createContext([
    defaultJssOptions,
    () => {}
]);

/**
 * @description JSS context provider.
 * @param {Object<string,*>} props - Props.
 * @returns {Object<string,*>} JSS context provider.
 */
function JssOptionsProvider(
    props: Props
): Element<typeof JssOptionsContext.Provider> {
    const {children, value} = props;
    const [jssOptions, setJssOptions] = useState(value || defaultJssOptions);
    return (
        <JssOptionsContext.Provider value={[jssOptions, setJssOptions]}>
            {children}
        </JssOptionsContext.Provider>
    );
}

JssOptionsProvider.defaultProps = ({
    children: null,
    value: null
}: DefaultProps);

export {JssOptionsContext, JssOptionsProvider, defaultJssOptions};
export type {JssOptionsType, JssOptionsContextType};
