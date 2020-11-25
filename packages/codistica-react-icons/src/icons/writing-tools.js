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

function WritingTools(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M359.66 15.73c4.8 1.48 8.22 2.59 11.68 3.6 17.49 5.05 35.03 9.9 52.43 15.26a28.37 28.37 0 0110.88 6.4A1327.65 1327.65 0 01470 76.24a24.95 24.95 0 015.95 9.66c5.91 19.6 11.3 39.36 17.12 58.99 1.8 6.1.9 10.81-3.74 15.45Q355.5 293.98 221.76 427.71c-2.26 2.26-5.7 4.73-8.54 4.68-3.35-.06-8.12-1.94-9.59-4.54-1.65-2.92-.87-7.67-.02-11.36.49-2.1 3.18-3.74 4.95-5.51q128.62-128.67 257.37-257.21c4.57-4.55 5.72-8.5 3.53-14.36a102.4 102.4 0 01-5.27-18.35c-3.57-20.87-14.42-36.77-29.83-51.16-10.87-10.15-21.84-17.84-36.4-20.88a234.04 234.04 0 01-28.18-8.12c-5.15-1.77-8.23-.42-11.88 3.24q-113.5 113.82-227.23 227.4c-11.45 11.45-22.8 22.98-34.4 34.28-4.81 4.68-11.03 4.53-15.26.27-4.09-4.1-3.96-10.48.38-15.35 1.2-1.36 2.56-2.59 3.85-3.88L290.78 81.3c19.82-19.83 39.59-39.73 59.56-59.42 2.72-2.68 6.48-4.3 9.32-6.14zM303.72 407.7c10.79-10.79 20.5-20.7 30.45-30.37 6.4-6.24 15.79-4.45 18.34 3.3 1.6 4.9-.23 8.83-3.78 12.3-9.76 9.55-19.43 19.19-28.83 28.5l26.9 26.48 25.66-25.74c2.74-2.74 5.37-5.6 8.25-8.19 4.9-4.41 11.1-4.37 15.3-.1 4.28 4.37 4.34 10.35-.44 15.27-10.33 10.62-20.9 21-31.36 31.5-.94.94-1.76 2-2.44 2.78l21.09 20.31 103.36-103.33c-1.31-.75-4.13-1.66-6-3.53q-45.1-44.84-89.98-89.91c-1.75-1.76-3.79-3.57-4.72-5.76-2.04-4.83-1.36-9.53 3.11-12.84 4.97-3.68 9.94-2.97 14.2 1.23 11.54 11.35 22.95 22.83 34.4 34.28q34.34 34.33 68.66 68.68c8.12 8.13 8.16 12.62.06 20.72q-56.3 56.36-112.67 112.69c-8.08 8.08-12.58 8.03-20.71-.1q-48.36-48.34-96.7-96.71c-1.6-1.61-3.3-3.17-4.73-4.93-3.89-4.74-3.7-10.95.6-14.74 4.6-4.05 9.78-4.25 14.2-.14 5.98 5.57 11.42 11.73 17.78 18.35zM96.87 201.17c6.6 6.14 12.05 10.96 17.21 16.07 5.97 5.9 6.38 11.98 1.5 16.74-4.43 4.33-10.98 3.86-16.33-1.49Q51.8 185.13 4.47 137.65c-5.89-5.9-6-11.37-.11-17.27Q62.3 62.24 120.46 4.27c5.96-5.95 11.75-5.59 17.82.5l88.45 88.6c1.12 1.14 2.3 2.23 3.37 3.4 4.86 5.35 4.96 11.34.31 15.76-4.17 3.97-10.67 3.83-15.32-.76-13.63-13.45-27.13-27.05-40.68-40.6l-41.6-41.6c-1.1-1.1-2.32-2.06-2.9-2.57L27.75 129.16l19.77 20.33 28.25-27.37c1.47-1.42 2.86-2.95 4.45-4.24 4.8-3.89 10.8-3.66 14.8.46 4.25 4.37 4.24 10.33-.6 15.23-8.66 8.76-17.54 17.29-26.42 25.83a57.74 57.74 0 01-5.53 4.27l21.8 21.35 23.68-23.79c1.77-1.77 3.49-3.6 5.34-5.3 5.37-4.87 11.34-4.95 15.74-.28 3.97 4.22 3.8 10.6-.79 15.33-7.94 8.18-16.05 16.2-24.17 24.2-1.77 1.76-3.85 3.22-7.21 5.99z'
                    }
                />
                <path
                    d={
                        'M150.95 372.3c-3.57-2.78-7.66-4.48-9.02-7.44-1.36-2.96-.47-7.3.39-10.8.47-1.94 2.84-3.45 4.45-5.06Q278.5 217.22 410.27 85.47a30.8 30.8 0 015.04-4.58c4.54-2.84 9.27-2.71 13.18 1.02 4.13 3.92 4.7 8.73 1.49 13.6a30.7 30.7 0 01-4.12 4.55q-132.21 132.27-264.5 264.47c-2.78 2.77-6.33 4.76-10.4 7.77zM41.62 495.4a23.32 23.32 0 01-22.77-29.44q16.33-62.35 32.77-124.67c1.45-5.5 2.83-11.01 4.43-16.47 2.11-7.2 6.97-10.57 12.85-9.15 6.35 1.54 9.48 6.88 7.59 14.46-4.53 18.09-9.42 36.08-14.16 54.12-3.64 13.85-7.44 27.67-10.74 41.6a9.78 9.78 0 001.92 7.65 488.01 488.01 0 0025.24 25.97 11.08 11.08 0 008.77 2.37c32.04-7.77 63.97-15.96 95.95-24 7.6-1.91 13.2.7 14.8 6.75 1.73 6.65-1.74 11.77-9.64 13.78q-71.37 18.2-142.77 36.3a40.44 40.44 0 01-4.24.73zm-2.98-20.9l19.97-5.23-15.05-13.5-4.92 18.73z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

WritingTools.defaultProps = ({
    title: 'WritingToolsIcon',
    size: null,
    color: null
}: DefaultProps);

export {WritingTools};
