/** @flow */

import React from 'react';
import {SvgIcon} from '../utils/svg-icon/svg-icon.js';

type DefaultProps = {|
    title: string,
    size: string | number | null,
    color: string | null,
    backgroundColor: string | null
|};

type Props = {
    ...DefaultProps
};

function ESLint(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M90.55 160.48v191.04L256 447.05l165.45-95.53V160.48L256 64.95 90.55 160.48z'
                }
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M155.93 192.26l97.14-56.09a7.86 7.86 0 017.86 0l97.14 56.09a7.86 7.86 0 013.93 6.8v112.17a7.87 7.87 0 01-3.93 6.8l-97.14 56.1a7.86 7.86 0 01-7.86 0l-97.14-56.1a7.86 7.86 0 01-3.93-6.8V199.06a7.87 7.87 0 013.93-6.8'
                }
                fill={color || '#8080f2'}
            />
            <path
                d={
                    'M508.83 245.96L392.65 43.82c-4.22-7.3-12.02-12.7-20.46-12.7H139.81c-8.44 0-16.24 5.4-20.46 12.7L3.17 245.51a24.04 24.04 0 000 23.85l116.18 200.47c4.22 7.31 12.02 11.05 20.46 11.05H372.2c8.44 0 16.24-3.63 20.45-10.94l116.2-200.8a22.8 22.8 0 000-23.18zm-96.2 97.2a8.52 8.52 0 01-4.37 7.2l-148 85.39a8.42 8.42 0 01-8.37 0l-148.11-85.39a8.54 8.54 0 01-4.38-7.2V172.37a8.5 8.5 0 014.35-7.21l148-85.39a8.4 8.4 0 018.36 0l148.12 85.39a8.54 8.54 0 014.4 7.2v170.79z'
                }
                fill={color || '#4b32c3'}
            />
        </SvgIcon>
    );
}

ESLint.defaultProps = ({
    title: 'ESLintIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {ESLint};
