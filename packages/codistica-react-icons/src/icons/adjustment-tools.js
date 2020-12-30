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

function AdjustmentTools(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M285.73 512h-59.46c-9.21-5.57-12.3-13.74-11.83-24.37.64-14.56.3-29.16.15-43.75-.11-10.7-5.52-18.2-15.11-22.6-6-2.76-12.16-5.15-18.26-7.66-12.26-5.06-21.32-3.25-30.76 6.14-11.11 11.07-22.1 22.27-33.35 33.18-8.6 8.33-17.77 8.36-26.2.17a1444.47 1444.47 0 01-30.94-30.9c-9.68-10-9.5-18.88.2-28.68q16.83-17.01 33.8-33.88c6.91-6.87 9.2-15.32 6.47-24.25a147.22 147.22 0 00-11.06-26.57c-4.14-7.7-11.6-11.53-20.56-11.57-15.4-.08-30.84-.55-46.22.11-10.2.44-17.44-3.14-22.6-11.64v-59.46c5.47-8.65 13-12.53 23.5-11.7 9.3.74 18.69.07 28.04.2 33.2.47 36.14-1.72 48.25-32.72 4.57-11.71 2.67-21.33-6.15-30.05q-17.29-17.12-34.27-34.55c-8.71-8.95-8.84-17.98-.27-26.78q15.52-15.97 31.5-31.5c8.8-8.58 17.86-8.5 26.8.13a1348.4 1348.4 0 0123.95 23.86c22.17 22.54 24.24 25.3 58.04 9.88 10.29-4.7 15.4-12.79 15.38-24.14-.03-15.13.52-30.28-.2-45.37-.5-10.48 3.03-18.05 11.7-23.53h59.46c8.59 5.08 12.11 12.32 11.68 22.53-.66 15.64-.24 31.34-.1 47.01.09 11.34 5.54 19.3 15.91 23.8 5.8 2.52 11.6 5.04 17.53 7.2 10.8 3.93 20.42 2.26 28.7-6.23 10.95-11.22 22.09-22.25 33.2-33.3 10.92-10.85 19.4-10.9 30.44-.05 9.42 9.25 18.7 18.64 28 28 10.8 10.83 10.77 19.32-.2 30.36-11.06 11.1-22.2 22.13-33.26 33.22-8.26 8.29-10.21 17.9-5.75 28.73 2.41 5.84 4.8 11.7 7.37 17.47 4.43 9.9 11.94 15.67 22.98 15.82 15.12.21 30.27.53 45.37-.06 10.58-.4 18.84 2.5 24.4 11.77v59.46c-5.24 9.08-13.15 12.13-23.46 11.75-14.84-.55-29.7-.13-44.56-.16-11.85-.02-19.64 5.92-24.24 16.5-1.78 4.1-3.34 8.3-5.59 13.9-7.9-8.14-14.36-15.26-21.34-21.82-3.51-3.29-4.34-6.19-2.83-10.78 6.02-18.37 6.9-37.51 4.23-56.3-11.53-80.86-83.52-127.65-152.79-120.23-81.8 8.76-139.41 87.1-121.82 167.35 17.56 80.08 97.15 127.6 175.95 105.16 2.33-.67 5.93-1.07 7.43.2 8.34 7 16.22 14.56 25.55 23.12-6.02 2.47-9.23 3.83-12.48 5.1-12.6 4.97-19.29 13.75-18.9 27.76.38 13.74-.22 27.52.33 41.25.42 10.3-2.64 18.24-11.75 23.47z'
                    }
                />
                <path
                    d={
                        'M235.92 159.98c22.9-5.64 45.35-5.37 67.23 5.31 48.25 23.56 70.42 74.82 53.8 125.94-3.06 9.42-1.28 16.01 5.78 22.75q53.72 51.28 106.75 103.27c6.03 5.94 11.47 13.74 14 21.7 4.53 14.26-3.2 28.62-17.54 37.35-12.38 7.55-26.7 6.7-38.05-3.88-23.12-21.57-45.7-43.72-68.41-65.74-14.42-13.98-28.98-27.84-42.83-42.37-8.25-8.66-16.55-10.65-28.02-6.88-67.5 22.22-122.54-30.03-130.55-76.48-2.26-13.06-.96-26.77-.88-40.18 0-2.04 1.82-5.14 3.55-5.79 1.36-.51 4.25 1.57 5.8 3.16 10.56 10.83 20.68 22.1 31.46 32.7 14.1 13.88 30.7 22.08 50.79 15.87 20.33-6.28 34-20.28 39.02-41.14 4.76-19.8-4.5-35.27-17.94-48.68-11.63-11.6-23.54-22.9-35.33-34.33zm226.6 284.2c.1-9.66-6.85-16.6-16.57-16.53-8.9.07-15.5 6.8-15.45 15.8a16.07 16.07 0 0016.23 16.25 15.43 15.43 0 0015.8-15.51z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

AdjustmentTools.defaultProps = ({
    title: 'AdjustmentToolsIcon',
    size: null,
    color: null
}: DefaultProps);

export {AdjustmentTools};
