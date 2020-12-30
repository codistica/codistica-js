/** @flow */

import React from 'react';
import {SvgIcon} from '../utils/svg-icon/svg-icon.js';

type DefaultProps = {|
    title: string,
    size: string | number | null,
    color: string | null
|};

type Props = {
    ...DefaultProps
};

function Python(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M349.3 79.86A79.86 79.86 0 00269.45 0h-47.92a79.85 79.85 0 00-79.86 79.86v28.05h103.02v22.59l-151 .06a79.86 79.86 0 00-79.86 79.87v47.92a79.86 79.86 0 0079.86 79.86h45.85V246h209.81zm-166.16 3.98a11.63 11.63 0 1111.62-11.62 11.63 11.63 0 01-11.62 11.62z'
                }
                fill={color || '#436785'}
            />
            <path
                d={
                    'M418.32 173.8h-45.85v92.19H162.66l.03 166.15A79.86 79.86 0 00242.56 512h47.92a79.85 79.85 0 0079.86-79.86V404.1H267.32V381.5l151-.06a79.86 79.86 0 0079.86-79.87v-47.92a79.86 79.86 0 00-79.86-79.86zm-89.46 254.36a11.63 11.63 0 11-11.62 11.62 11.63 11.63 0 0111.62-11.62z'
                }
                fill={color || '#d6ad43'}
            />
        </SvgIcon>
    );
}

Python.defaultProps = ({
    title: 'PythonIcon',
    size: null,
    color: null
}: DefaultProps);

export {Python};
