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

function ArrowBack3(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M162.93 221.1L0 111.53c5.58-3.74 10.68-7.18 15.8-10.59L157.14 6.71c.54-.37 1.08-.74 1.64-1.06 1.1-.63 2.06-2.07 3.41-1.43 1.46.69.7 2.34.7 3.53.06 14.54.28 29.08-.1 43.6-.12 4.94 1.45 5.77 5.99 5.75 41-.15 82-.72 122.98.16 53.92 1.15 101.7 19.47 142.52 55 38.46 33.47 62.92 75.35 72.88 125.33 12.32 61.82 1.2 119.42-34.17 171.63-32.03 47.27-76.25 77.9-131.65 92.09a213.18 213.18 0 01-50.27 6.63c-3.5.05-4.76-.64-4.74-4.49q.25-49.97.03-99.95c0-3.26.67-4.4 4.24-4.54 54.17-1.99 99.41-39.64 110.13-92.86 12.35-61.28-24.47-122.43-87.87-136.34a136.96 136.96 0 00-29.12-2.95c-38.55-.09-77.1.05-115.63-.16-4.5-.02-5.34 1.3-5.28 5.45.25 15.96.1 31.93.1 49z'
                }
                fill={color || '#000000'}
            />
        </SvgIcon>
    );
}

ArrowBack3.defaultProps = ({
    title: 'ArrowBack3Icon',
    size: null,
    color: null
}: DefaultProps);

export {ArrowBack3};
