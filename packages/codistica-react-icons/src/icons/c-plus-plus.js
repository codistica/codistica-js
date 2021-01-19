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

function CPlusPlus(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M460.34 119.19Q362.4 63.12 264.65 6.75h-15.5c-64.48 37.56-128.88 75.26-193.5 112.57-11.81 6.83-17.19 16-17.15 29.58q.34 108.54 0 217.08c-.04 12.3 4.28 20.83 15.25 27.02q30.8 17.4 61.55 34.9v3.98h6.98q59.35 33.77 118.65 67.63c3.45 1.96 6.95 3.83 10.43 5.74h8.86c43.9-22.32 85.53-48.63 128.35-72.84l.93-.53h.17v-.1c22.67-12.84 45.07-26.17 67.75-39 10.69-6.05 15.69-14.77 15.69-27q.03-113.39.39-226.78c.03-9.86-5.24-15.28-13.16-19.81z'
                }
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M478 127.83c-2.1-5.4-6.44-9.1-12.13-12.35Q365.3 57.9 264.9 0h-15.93C182.74 38.58 116.6 77.3 50.23 115.62c-12.14 7-17.66 16.43-17.62 30.38q.35 111.48 0 222.96a34.33 34.33 0 002.7 14.45c2.44 5.37 6.62 9.72 12.97 13.3 64.2 36.26 128.18 72.9 192.24 109.4 3.54 2 7.14 3.93 10.71 5.89h9.1c45.09-22.93 87.85-49.94 131.83-74.81 23.68-13.4 47.05-27.31 70.72-40.7 10.97-6.22 16.1-15.18 16.11-27.73q.03-116.47.4-232.93a21.6 21.6 0 00-1.39-8zM393.56 346.1c-31.4 46.03-75.04 70.12-130.28 73.83-60.64 3.68-117.87-31.28-148.12-82.63a159.86 159.86 0 01-21.48-63.98c-9.44-87.74 57.09-178.3 158.69-181.06 61.56-1.67 109.04 26.36 143.5 77.07 1.39 2.04 2 3.55 1.9 4.8-.13 1.74-1.6 3-4.3 4.45-13.31 7.17-26.75 14.21-39.44 22.4-3.1 2-5.4 2.86-7.39 2.68-2.66-.24-4.76-2.37-7.47-6.23-35.56-50.81-106.36-58.91-151.09-16.8-30.24 28.47-39.97 64.02-27.76 103.76a120.86 120.86 0 008.95 21.67c15.11 28.18 40.5 45.52 74.83 50.21 39.06 5.34 71.58-9.28 94.82-41.51 5.4-7.5 8.86-7.58 15.76-3.09a537.74 537.74 0 0036.1 21.42c6.71 3.66 6.92 6.94 2.78 13.01zm13.57-85.5a3.53 3.53 0 01-3.53 3.52h-13.47v13.48a3.53 3.53 0 01-3.53 3.52h-9.95a3.53 3.53 0 01-3.52-3.52v-13.48h-13.48a3.53 3.53 0 01-3.52-3.52v-9.95a3.53 3.53 0 013.52-3.53h13.48v-13.47a3.53 3.53 0 013.52-3.53h9.95a3.53 3.53 0 013.53 3.53v13.47h13.47a3.53 3.53 0 013.53 3.53zm63.02.1a3.53 3.53 0 01-3.53 3.53h-13.47v13.47a3.53 3.53 0 01-3.53 3.53h-9.95a3.53 3.53 0 01-3.52-3.53v-13.47h-13.48a3.53 3.53 0 01-3.52-3.53v-9.95a3.53 3.53 0 013.52-3.52h13.48v-13.48a3.53 3.53 0 013.52-3.52h9.95a3.53 3.53 0 013.53 3.52v13.48h13.47a3.53 3.53 0 013.53 3.52z'
                }
                fill={color || '#6599d1'}
            />
            <path
                d={
                    'M478 127.83l-80.23 46.32c-.13 1.73-1.6 2.98-4.3 4.44-13.31 7.17-26.75 14.21-39.44 22.4-3.1 2-5.4 2.86-7.39 2.68l-177.37 102.4c15.11 28.17 40.5 45.52 74.83 50.21 39.06 5.34 71.58-9.28 94.82-41.52 5.4-7.5 8.86-7.57 15.76-3.08a537.74 537.74 0 0036.1 21.42c6.71 3.66 6.92 6.94 2.78 13.01-31.4 46.03-75.04 70.12-130.28 73.83-60.64 3.68-117.87-31.28-148.12-82.63l-79.84 46.1c2.43 5.37 6.6 9.72 12.96 13.3 64.2 36.26 128.18 72.9 192.24 109.4 3.54 2 7.14 3.93 10.71 5.89h9.1c45.09-22.93 87.85-49.94 131.83-74.81 23.68-13.4 47.05-27.31 70.72-40.7 10.97-6.22 16.1-15.18 16.11-27.73q.03-116.47.4-232.93a21.6 21.6 0 00-1.39-8zM407.13 260.6a3.53 3.53 0 01-3.53 3.52h-13.47v13.48a3.53 3.53 0 01-3.53 3.52h-9.95a3.53 3.53 0 01-3.52-3.52v-13.48h-13.48a3.53 3.53 0 01-3.52-3.52v-9.95a3.53 3.53 0 013.52-3.53h13.48v-13.47a3.53 3.53 0 013.52-3.53h9.95a3.53 3.53 0 013.53 3.53v13.47h13.47a3.53 3.53 0 013.53 3.53zm63.02.1a3.53 3.53 0 01-3.53 3.53h-13.47v13.47a3.53 3.53 0 01-3.53 3.53h-9.95a3.53 3.53 0 01-3.52-3.53v-13.47h-13.48a3.53 3.53 0 01-3.52-3.53v-9.95a3.53 3.53 0 013.52-3.52h13.48v-13.48a3.53 3.53 0 013.52-3.52h9.95a3.53 3.53 0 013.53 3.52v13.48h13.47a3.53 3.53 0 013.53 3.52z'
                }
                fill={color || '#024482'}
            />
        </SvgIcon>
    );
}

CPlusPlus.defaultProps = ({
    title: 'CPlusPlusIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {CPlusPlus};